import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AppContext from '../components/context/appContext';
import ProductCard from '../components/ui/productCard';
import CategoryCarousel from '../components/ui/CategoryCarousel';

const Category = () => {
  const { slug } = useParams()
  const location = useLocation()
  const history = useHistory()
  const { fetchCategoryBySlug, fetchProductsByCategorySlug, setGlobalLoader } = useContext(AppContext)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [catProducts, setCatProducts] = useState([])
  const [selected, setSelected] = useState({}) // { key: Set<string> }
  const [openGroups, setOpenGroups] = useState({}) // { key: boolean }

  const FILTER_FIELDS = useMemo(() => ([
    { key: 'lensWidth', label: 'Lens Width' },
    { key: 'noseBridge', label: 'Nose Bridge' },
    { key: 'templeArm', label: 'Temple Arm' },
    { key: 'size', label: 'Size' },
    { key: 'color', label: 'Color' },
    { key: 'shape', label: 'Shape' },
    { key: 'material', label: 'Material' },
    { key: 'gender', label: 'Gender' },
  ]), [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setGlobalLoader(true)
        const cat = await fetchCategoryBySlug(slug)
        const prods = await fetchProductsByCategorySlug(slug)
        if (!mounted) return
        setCategory(cat)
        setCatProducts(prods || [])
      } finally {
        if (mounted) setLoading(false)
        setGlobalLoader(false)
      }
    })()
    return () => { mounted = false }
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize filters from query params (e.g., ?shape=Round&color=Black)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const next = {}
    FILTER_FIELDS.forEach(({ key }) => {
      const val = params.get(key)
      if (!val) return
      const values = val.split(',').map(v => String(v))
      next[key] = new Set(values)
      // auto-open groups with preselected filters
      setOpenGroups(prev => ({ ...prev, [key]: true }))
    })
    if (Object.keys(next).length) setSelected(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const syncUrl = (sel) => {
    const params = new URLSearchParams()
    Object.entries(sel).forEach(([k, set]) => {
      const arr = Array.from(set || [])
      if (arr.length) params.set(k, arr.join(','))
    })
    const search = params.toString()
    history.replace({ pathname: location.pathname, search: search ? `?${search}` : '' })
  }

  // Build facet counts from products in this category
  const facets = useMemo(() => {
    const bucketByKey = {}
    FILTER_FIELDS.forEach(f => { bucketByKey[f.key] = new Map() })
    for (const p of catProducts) {
      const specs = p?.frameSpecs || {}
      for (const { key } of FILTER_FIELDS) {
        const raw = specs?.[key]
        if (raw === undefined || raw === null || raw === '') continue
        const val = String(raw)
        const map = bucketByKey[key]
        map.set(val, (map.get(val) || 0) + 1)
      }
    }
    const result = {}
    for (const { key } of FILTER_FIELDS) {
      const entries = Array.from(bucketByKey[key].entries())
      const sorted = entries.sort((a, b) => {
        const na = Number(a[0]); const nb = Number(b[0])
        const aNum = !Number.isNaN(na); const bNum = !Number.isNaN(nb)
        if (aNum && bNum) return na - nb
        if (aNum && !bNum) return -1
        if (!aNum && bNum) return 1
        return String(a[0]).localeCompare(String(b[0]))
      }).map(([value, count]) => ({ value, count }))
      result[key] = sorted
    }
    return result
  }, [catProducts, FILTER_FIELDS])

  // Toggle selection for a given filter value
  const toggleOption = (key, value) => {
    setSelected(prev => {
      const current = new Set(prev[key] || [])
      if (current.has(value)) current.delete(value); else current.add(value)
      const nextAll = { ...prev, [key]: current }
      const cleaned = Object.fromEntries(Object.entries(nextAll).filter(([, s]) => s && s.size))
      syncUrl(cleaned)
      return cleaned
    })
  }

  const clearKey = (key) => setSelected(prev => {
    const next = { ...prev }
    delete next[key]
    syncUrl(next)
    return next
  })

  const clearAll = () => {
    setSelected({})
    syncUrl({})
  }

  // Filter products using AND across groups and OR within a group
  const filteredProducts = useMemo(() => {
    const activeKeys = Object.keys(selected)
    if (activeKeys.length === 0) return catProducts
    return catProducts.filter(p => {
      const specs = p?.frameSpecs || {}
      for (const key of activeKeys) {
        const val = specs?.[key]
        if (val === undefined || val === null) return false
        if (!selected[key].has(String(val))) return false
      }
      return true
    })
  }, [catProducts, selected])

  const toggleGroup = (key) => setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <>
      <Header />
      <main>
        {/* Hero / Carousel */}
        <section className="top-bg">{category?.coverImage ? <CategoryCarousel imageUrl={category.coverImage} heading={category?.mainHeading} /> : null}</section>

        {/* Filters + Products */}
        <section className="container my-4">
          <div className="row">
            {/* Sidebar Filters */}
            <aside className="col-12 col-lg-3 mb-4 mb-lg-0">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="mb-0 fw-bold">Filters</h5>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={clearAll}
                      disabled={loading || Object.keys(selected).length === 0}
                    >
                      Clear all
                    </button>
                  </div>
                  {FILTER_FIELDS.map(({ key, label }) => {
                    const options = facets[key] || []
                    if (!options.length) return null
                    const sel = selected[key] || new Set()
                    const isOpen = !!openGroups[key]
                    return (
                      <div className="mb-3" key={key}>
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            className="btn btn-sm p-0 text-start fw-semibold"
                            aria-expanded={isOpen}
                            aria-controls={`filter-${key}`}
                            onClick={() => toggleGroup(key)}
                          >
                            <i className={`fa fa-chevron-${isOpen ? 'up' : 'down'} me-2`} aria-hidden="true" />
                            {label}
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-link text-decoration-none"
                            onClick={() => clearKey(key)}
                            disabled={loading || sel.size === 0}
                          >
                            Clear
                          </button>
                        </div>
                        <div id={`filter-${key}`} className={`mt-2 ${isOpen ? '' : 'd-none'}`}>
                          <div className="list-group list-group-flush">
                          {options.map(({ value, count }) => {
                            const id = `${key}-${value}`
                            const checked = sel.has(String(value))
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="list-group-item d-flex align-items-center justify-content-between px-0"
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                              >
                                <div className="form-check">
                                  <input
                                    id={id}
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={checked}
                                    disabled={loading}
                                    onChange={() => toggleOption(key, String(value))}
                                  />
                                  <span className="form-check-label ms-2">{String(value)}</span>
                                </div>
                                <span className="text-muted">({count})</span>
                              </label>
                            )
                          })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <div className="col-12 col-lg-9">
              <div className="row justify-content-center">
                {filteredProducts.map((p) => (
                  <div className="col-12 col-md-4 mb-4" key={p._id}>
                    <ProductCard product={p} to={`/product/${p._id}`} />
                  </div>
                ))}
                {!filteredProducts.length && (
                  <div className="col-12 text-center py-5 text-muted">No products found in this category.</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Jodit Description */}
        {category?.categoryDescription ? (
          <section className="container my-5">
            <div className="card border-0 p-3">
              <div dangerouslySetInnerHTML={{ __html: category.categoryDescription }} />
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}

export default Category;
