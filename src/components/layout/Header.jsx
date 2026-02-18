import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import AppContext from '../context/appContext';
import ProductCard from '../ui/productCard';
import { createPortal } from 'react-dom';

const Header = () => {
  const { categories, fetchCategories, userToken, basicInfo, getBasicInfo, products, fetchAllProductsBE, fetchProductsByCategorySlug } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => { fetchCategories(); getBasicInfo() }, [])
  useEffect(() => { fetchAllProductsBE?.().catch(() => {}) }, []) // preload for search
  const ensureProtocol = (u) => u && /^https?:\/\//i.test(u) ? u : (u ? `https://${String(u).replace(/^\/+/, '')}` : '')
  const fb = ensureProtocol(basicInfo?.facebookProfileLink) || 'https://www.facebook.com/'
  const ig = ensureProtocol(basicInfo?.instagramProfileLink) || 'https://www.instagram.com/'

  const closeMobileOffcanvas = () => {
    const el = document.getElementById('mobileMenu')
    if (!el) return
    try {
      const api = window.bootstrap?.Offcanvas?.getOrCreateInstance
        ? window.bootstrap.Offcanvas.getOrCreateInstance(el)
        : null
      if (api) api.hide()
      else el.classList.remove('show')
    } catch (e) {}
  }

  const onSearchChange = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    const term = q.trim().toLowerCase()
    if (!term) { setSearchResults([]); return }
    const list = (products || []).filter(p => (p?.name || '').toLowerCase().includes(term)).slice(0, 3)
    setSearchResults(list)
  }
  const closeSearchModal = () => {
    const el = document.getElementById('searchModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) {
      bs.Modal.getOrCreateInstance(el).hide()
    }
  }

  // Mega menu state
  const [megaOpen, setMegaOpen] = useState(false)
  const [megaSlug, setMegaSlug] = useState('')
  const [megaFacets, setMegaFacets] = useState(null) // {shape:[{v,c}], ...}
  const [megaLoading, setMegaLoading] = useState(false)
  const facetFields = useMemo(() => ['shape', 'color', 'material', 'size', 'gender'], [])
  const toSlug = (s) => (s || '').toString().toLowerCase().replace(/[\s\-_\/]+/g, '-').replace(/[^a-z0-9-]/g, '')
  // Mobile offcanvas mega
  const [mMegaOpen, setMMegaOpen] = useState(false)
  const [mMegaSlug, setMMegaSlug] = useState('')
  const [mMegaTitle, setMMegaTitle] = useState('')
  const [mMegaFacets, setMMegaFacets] = useState(null)
  const [mMegaLoading, setMMegaLoading] = useState(false)
  const openMegaFor = async (cat) => {
    const slug = toSlug(cat.mainHeading)
    setMegaSlug(slug)
    setMegaOpen(true)
    try {
      setMegaLoading(true)
      const prods = await fetchProductsByCategorySlug(slug)
      const buckets = {}
      facetFields.forEach(k => buckets[k] = new Map())
      for (const p of prods) {
        const fs = p?.frameSpecs || {}
        for (const k of facetFields) {
          const val = fs?.[k]
          if (!val) continue
          const key = String(val)
          const m = buckets[k]
          m.set(key, (m.get(key) || 0) + 1)
        }
      }
      const result = {}
      for (const k of facetFields) {
        result[k] = Array.from(buckets[k].entries())
          .sort((a, b) => String(a[0]).localeCompare(String(b[0])))
          .map(([value, count]) => ({ value, count }))
      }
      setMegaFacets(result)
    } catch (_) {
      setMegaFacets(null)
    } finally {
      setMegaLoading(false)
    }
  }
  const closeMega = () => { setMegaOpen(false); setMegaSlug(''); setMegaFacets(null) }
  const onFacetClick = () => { closeMega() }
  // Build facets for a slug (helper for mobile)
  const buildFacetsForSlug = async (slug) => {
    const prods = await fetchProductsByCategorySlug(slug)
    const buckets = {}
    facetFields.forEach(k => buckets[k] = new Map())
    for (const p of prods) {
      const fs = p?.frameSpecs || {}
      for (const k of facetFields) {
        const val = fs?.[k]
        if (!val) continue
        const key = String(val)
        const m = buckets[k]
        m.set(key, (m.get(key) || 0) + 1)
      }
    }
    const result = {}
    for (const k of facetFields) {
      result[k] = Array.from(buckets[k].entries())
        .sort((a, b) => String(a[0]).localeCompare(String(b[0])))
        .map(([value, count]) => ({ value, count }))
    }
    return result
  }
  const openMobileMega = async (cat) => {
    const slug = toSlug(cat.mainHeading)
    setMMegaTitle(cat.mainHeading || '')
    setMMegaSlug(slug)
    setMMegaOpen(true)
    try {
      setMMegaLoading(true)
      const result = await buildFacetsForSlug(slug)
      setMMegaFacets(result)
    } catch {
      setMMegaFacets(null)
    } finally {
      setMMegaLoading(false)
    }
  }
  const closeMobileMega = () => {
    setMMegaOpen(false); setMMegaSlug(''); setMMegaTitle(''); setMMegaFacets(null)
  }
  const onMobileFacetClick = () => { closeMobileMega(); closeMobileOffcanvas() }

  return (
    <header className="sticky-top  shadow-sm top-bg">
      {/* Mobile navbar */}
      <nav className="navbar d-lg-none top-bg">
        <div className="container-fluid d-grid mobile-nav" style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
          <button
            className="btn btn-icon border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>

          <Link className="navbar-brand text-dark justify-self-center" to="/">
            <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
          </Link>

          <div className="nav-actions">
            <button className="btn btn-icon" aria-label="Cart" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop">
              <i className="fa fa-shopping-cart"></i>
            </button>
            <button className="btn btn-icon" aria-label="Search" data-bs-toggle="modal" data-bs-target="#searchModal">
              <i className="fa fa-search"></i>
            </button>
            <div className="dropdown">
              <button className="btn btn-icon dropdown-toggle" id="userMenuMobile" data-bs-toggle="dropdown" aria-expanded="false" aria-label="User menu">
                <i className="fa fa-user"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuMobile">
                {userToken ? (
                  <>
                    <li><Link className="dropdown-item" to="/account">Account</Link></li>
                    <li><Link className="dropdown-item" to="/account/wishlist">Wishlist</Link></li>
                  </>
                ) : (
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile offcanvas menu */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-dark" id="mobileMenuLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {!mMegaOpen ? (
            <ul className="navbar-nav">
              {(categories || []).map((c, idx) => (
                <li className="nav-item d-flex align-items-center justify-content-between" key={idx}>
                  <button className="btn btn-link nav-link fs-4 text-dark text-start p-0" onClick={() => openMobileMega(c)}>
                    {c.mainHeading}
                  </button>
                  <button className="btn btn-link text-dark p-0" onClick={() => openMobileMega(c)} aria-label="Open">
                    <i className="fa fa-angle-right fs-4" />
                  </button>
                </li>
              ))}
              <li className="nav-item">
                <Link className="nav-link fs-4 text-dark" to="/contact" onClick={closeMobileOffcanvas}>Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4 text-dark" to="/about" onClick={closeMobileOffcanvas}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4 text-dark" to="/terms" onClick={closeMobileOffcanvas}>Terms &amp; Conditions</Link>
              </li>
            </ul>
          ) : (
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <button className="btn btn-link text-dark p-0 d-flex align-items-center" onClick={closeMobileMega}>
                  <i className="fa fa-angle-left fs-4 me-2" /> Back
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">{mMegaTitle}</h5>
                <Link className="btn btn-sm btn-outline-secondary" to={`/category/${mMegaSlug}`} onClick={onMobileFacetClick}>
                  Shop all
                </Link>
              </div>
              {mMegaLoading ? (
                <div className="d-flex justify-content-center py-3">
                  <div className="spinner-border" role="status" aria-label="Loading facets" />
                </div>
              ) : (
              <div className="row">
                {facetFields.map((field) => {
                  const items = mMegaFacets?.[field] || []
                  if (!items.length) return null
                  return (
                    <div key={`m-${field}`} className="col-12 mb-3">
                      <div className="fw-bold text-uppercase small mb-2">{field}</div>
                      <ul className="list-unstyled mb-0">
                        {items.slice(0, 8).map(({ value, count }) => (
                          <li key={`${field}-${value}`} className="d-flex align-items-center justify-content-between">
                            <Link
                              className="text-decoration-none py-1 text-dark flex-grow-1"
                              to={`/category/${mMegaSlug}?${field}=${encodeURIComponent(value)}`}
                              onClick={onMobileFacetClick}
                            >
                              {value}
                            </Link>
                            <small className="text-muted ms-2">({count})</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
              )}
            </div>
          )}
          <hr />
          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item"><a className="nav-link text-dark" href={ig} target="_blank" rel="noreferrer"><i className="fa fa-instagram" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            <li className="nav-item"><a className="nav-link text-dark" href={fb} target="_blank" rel="noreferrer"><i className="fa fa-facebook-official" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            {/* <li className="nav-item"><a className="nav-link text-dark" href="/"><i className="fa fa-map-marker" style={{ fontSize: 22, color: '#000' }}></i></a></li> */}
          </ul>
        </div>
      </div>

      {/* Desktop navbar */}
      <nav className="navbar d-none d-lg-flex top-bg">
        <div className="container-fluid align-items-center justify-content-between">
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3"><a className="nav-link text-dark" href={ig} target="_blank" rel="noreferrer"><i className="fa fa-instagram" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            <li className="nav-item me-3"><a className="nav-link text-dark" href={fb} target="_blank" rel="noreferrer"><i className="fa fa-facebook-official" style={{ fontSize: 22, color: '#000' }}></i></a></li>
          </ul>
          <Link className="navbar-brand text-dark" to="/" style={{ transform: 'scale(1.2)' }}>
            <img src={logo} style={{ scale: 1.5 }} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          </Link>
          <ul className="navbar-nav flex-row">
            {/* <li className="nav-item me-3"><a className="nav-link text-dark" href="/"><i className="fa fa-map-marker" style={{ fontSize: 22, color: '#000' }}></i></a></li> */}
            <li className="nav-item">
              <a className="nav-link text-dark" href="#" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop">
                <i className="fa fa-shopping-cart" style={{ fontSize: 22, color: '#000' }}></i>
              </a>
            </li>
            <li className="nav-item ms-2 d-flex">
              <button type="button" className="btn bg-transparent border-0 nav-link text-dark p-0" data-bs-toggle="modal" data-bs-target="#searchModal" aria-label="Search">
                <i className="fa fa-search" style={{ fontSize: 22, color: '#000' }}></i>
              </button>
            </li>
            <li className="nav-item dropdown ms-2 position-relative">
              <button
                type="button"
                className="btn bg-transparent border-0 d-flex align-items-center text-dark dropdown-toggle"
                id="userMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="position-relative">
                <i className="fa fa-user" style={{ fontSize: 22, color: '#000' }}></i>

                </div>
                {/* <span className="d-none d-sm-inline mx-1">Account</span> */}
              </button>
              <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="userMenu">
                {userToken ? (
                  <>
                    <li><Link className="dropdown-item" to="/account">Account</Link></li>
                    <li><Link className="dropdown-item" to="/account/wishlist">Wishlist</Link></li>
                  </>
                ) : (
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Desktop categories row */}
      <div className="d-none d-lg-block border-top border-dark">
        <div className="container-fluid">
          <ul className="nav justify-content-center py-2">
            {(categories || []).map((c, idx) => (
              <li
                className="nav-item mx-3"
                key={idx}
                onMouseEnter={() => openMegaFor(c)}
              >
                <Link className="nav-link fw-semibold text-dark" to={`/category/${toSlug(c.mainHeading)}`}>
                  {c.mainHeading}
                </Link>
              </li>
            ))}
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold text-dark" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold text-dark" to="/about">About Us</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold text-dark" to="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Mega menu panel */}
      {megaOpen && megaSlug && (
        <div
          className="d-none d-lg-block w-100 border-top border-dark"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={closeMega}
          style={{ position: 'absolute', left: 0, right: 0, zIndex: 1055, background: '#fff' }}
        >
          <div className="container py-3">
            {megaLoading ? (
              <div className="d-flex justify-content-center py-4">
                <div className="spinner-border" role="status" aria-label="Loading facets" />
              </div>
            ) : (
            <div className="row">
              {facetFields.map((field) => {
                const items = megaFacets?.[field] || []
                if (!items.length) return null
                return (
                  <div key={field} className="col-6 col-md-4 col-lg-2 mb-3">
                    <div className="fw-bold text-uppercase small mb-2">{field}</div>
                    <ul className="list-unstyled mb-0">
                      {items.slice(0, 8).map(({ value, count }) => (
                        <li key={`${field}-${value}`}>
                          <Link
                            className="text-decoration-none d-flex justify-content-between align-items-center py-1 text-dark"
                            to={`/category/${megaSlug}?${field}=${encodeURIComponent(value)}`}
                            onClick={onFacetClick}
                          >
                            <span>{value}</span>
                            <small className="text-muted">({count})</small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
            )}
          </div>
        </div>
      )}
      {/* Search Modal (rendered to body via portal to avoid stacking issues) */}
      {createPortal(
        <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="searchModalLabel">Search Products</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search by product name..."
                  value={searchQuery}
                  onChange={onSearchChange}
                  autoFocus
                />
                <div className="row">
                  {searchResults.map(p => (
                    <div key={p._id} className="col-12 col-md-4 mb-3">
                      <ProductCard product={p} to={`/product/${p._id}`} onClick={closeSearchModal} />
                    </div>
                  ))}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="col-12 text-muted">No matching products.</div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
