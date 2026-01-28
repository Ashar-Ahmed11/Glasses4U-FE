import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import AppContext from '../context/appContext';

const Header = () => {
  const { categories, fetchCategories, userToken, basicInfo, getBasicInfo } = useContext(AppContext)
  useEffect(() => { fetchCategories(); getBasicInfo() }, [])
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
          <ul className="navbar-nav">
            {(categories || []).map((c, idx) => (
              <li className="nav-item" key={idx}>
                <Link className="nav-link fs-4 text-dark" to={`/category/${(c.mainHeading || '').toLowerCase().replace(/[\s\-_\/]+/g,'-').replace(/[^a-z0-9-]/g,'')}`} onClick={closeMobileOffcanvas}>
                  {c.mainHeading}
                </Link>
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
              <li className="nav-item mx-3" key={idx}>
                <Link className="nav-link fw-semibold text-dark" to={`/category/${(c.mainHeading || '').toLowerCase().replace(/[\s\-_\/]+/g,'-').replace(/[^a-z0-9-]/g,'')}`}>
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
    </header>
  );
};

export default Header;
