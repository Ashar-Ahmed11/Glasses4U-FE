import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Link, Redirect, useRouteMatch, useLocation } from 'react-router-dom'
import AppContext from '../context/appContext'
import ProductCard from '../ui/productCard'
import CheckoutItem from '../checkoutItem'

const price = (n) => Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

// --- Pages ---
export function GeneralInfoPage() {
  const { getUser, updateUser } = useContext(AppContext)
  const [form, setForm] = useState({ country: '', city: '', phone: '', address: '', postalCode: '', email: '' })
  useEffect(() => { (async () => { const u = await getUser(); if (u) setForm({ country: u.country || '', city: u.city || '', phone: u.phone || '', address: u.address || '', postalCode: u.postalCode || '', email: u.email || '' }) })() }, [])
  const onSave = async (e) => { e.preventDefault(); await updateUser({ country: form.country, city: form.city, phone: form.phone, address: form.address, postalCode: form.postalCode }) }
  const color = "#000"
  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 className="display-4" style={{ fontWeight: 900 }}>General Information</h1>
        <div className="py-2">
          <form className="col-lg-6 col-md-8 col-12" onSubmit={onSave}>
            <input disabled value={form.email} className="form-control my-2" placeholder="Email" />
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="form-control my-2" placeholder="Country" style={{ color: color, backgroundColor: 'white' }} />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="form-control my-2" placeholder="City" style={{ color: color, backgroundColor: 'white' }} />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-control my-2" placeholder="Phone" style={{ color: color, backgroundColor: 'white' }} />
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="form-control my-2" placeholder="Address" style={{ color: color, backgroundColor: 'white' }} />
            <input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className="form-control my-2" placeholder="Postal Code" style={{ color: color, backgroundColor: 'white' }} />
            <button className="btn my-2 border-1 shadow-sm border" style={{ color: color }}>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export function WishlistPage() {
  const { getUser, removeFromWishlist } = useContext(AppContext)
  const [query, setQuery] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setLoading(true); const u = await getUser(); setList(u?.wishlistProducts || []); setLoading(false) })() }, [])
  const filtered = (list || []).filter((p) => p?.name?.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 className="display-4" style={{ fontWeight: 900 }}>Wishlist</h1>
        <div className="py-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="form-control w-50" placeholder="Search" />
          </div>
          {loading ? (
            <div className="py-5 text-center"><div style={{ width: 60, height: 60 }} className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
          ) : (
          <div className="row g-3">
            {filtered.map((p) => (
              <div key={p._id} className="col-6 col-md-3 position-relative">
                <button
                  onClick={async (e) => {
                    e.preventDefault(); e.stopPropagation();
                    setLoading(true);
                    await removeFromWishlist(p._id);
                    const u = await getUser();
                    setList(u?.wishlistProducts || []);
                    setLoading(false);
                  }}
                  className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
                  style={{ zIndex: 3 }}
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
                <ProductCard product={{ ...p, localePrice: price(p.price) }} to={`/product/${p._id}`} />
              </div>
            ))}
            {!filtered.length && <div className="text-muted">No items.</div>}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function OrdersPage() {
  const { getUser, getUserOrders } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const [rxItem, setRxItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const RX_LABEL = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
  const LT_LABEL = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun' }
  useEffect(() => { (async () => { setLoading(true); const u = await getUser(); if (u?._id) { const o = await getUserOrders(u._id); setOrders(Array.isArray(o) ? o : []) } setLoading(false) })() }, [])
  const openDetails = (order) => {
    setSelected(order)
    const el = document.getElementById('detailsModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
  }
  const openRx = (item) => {
    setRxItem(item)
    const el = document.getElementById('orderRxModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
  }
  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 className="display-4" style={{ fontWeight: 900 }}>Orders</h1>
        <div className="py-2">
          {loading ? (
            <div className="py-5 text-center"><div style={{ width: 60, height: 60 }} className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
          ) : (
          <div className="row g-3">
            {(orders || []).map((o) => (
              <div key={o._id} className="col-12">
                <div className="card border-0 shadow-sm p-2">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-center gap-3">
                      <div className="flex-grow-1">
                        <div className="fw-bold">{o.name || '—'}</div>
                        <div className="text-muted small">Status: {String(o.status || '—')}</div>
                        <div className="text-muted small">Total: {price(o.total)}</div>
                        <div className="text-muted small" style={{ opacity: 0.6 }}>Tracking: {String(o.trackingId || '—')}</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-outline-dark btn-sm" onClick={() => openDetails(o)}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
      {/* Order Details Modal (User) */}
      <div className="modal fade" id="detailsModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg equal-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!selected ? <div className="text-muted">No order selected.</div> : (
                <>
                  <div className="mb-3">
                    <div className="fw-bold">{selected.name}</div>
                    <div className="text-muted small">Email: {selected.email}</div>
                    <div className="text-muted small">Phone: {selected.phone}</div>
                    <div className="text-muted small">Address: {selected.address}, {selected.city}, {selected.country}</div>
                    <div className="text-muted small">Tracking: {selected.trackingId}</div>
                    <div className="text-muted small">Status: {selected.status}</div>
                  </div>
                  <h6>Items</h6>
                  <div className="mb-3">
                    {(selected.products || []).map((p, idx) => {
                      const base = Number(p?.product?.price || 0)
                      const lensPrice = Number(p?.prescription?.lens?.price || 0)
                      const coatingPrice = Number(p?.coating?.price || 0)
                      const unitPrice = base + lensPrice + coatingPrice
                      const element = {
                        name: p?.product?.name || `Item ${idx + 1}`,
                        image: p?.product?.assets?.[0]?.url || '/logo192.png',
                        quantity: p?.quantity || 1,
                        localePrice: price(unitPrice),
                        variant: null,
                        prescription: p?.prescription || null,
                      }
                      return <CheckoutItem key={idx} element={element} onViewPrescription={openRx} />
                    })}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Subtotal: {price(selected.subtotal)}</div>
                    <div>Delivery: {price(selected.deliveryCharges)}</div>
                    <div>Total: <strong>{price(selected.total)}</strong></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Rx Modal (User Orders) */}
      <div className="modal fade" id="orderRxModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg equal-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Prescription</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!rxItem?.prescription ? (
                <div className="text-muted">No prescription available.</div>
              ) : (
                <>
                  <div className="table-responsive mb-4">
                    <table className="table align-middle">
                      <thead>
                        <tr className="text-muted">
                          <th style={{ width: '20%' }}></th>
                          <th>SPH</th>
                          <th>CYL</th>
                          <th>Axis</th>
                          <th>Add</th>
                          <th>PD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const p = rxItem.prescription
                          const singlePD = !p?.prescription?.hasTwoPD
                          const pdRight = singlePD ? (p?.prescription?.pd ?? '') : (p?.prescription?.pd?.right ?? '')
                          const pdLeft = singlePD ? '' : (p?.prescription?.pd?.left ?? '')
                          const od = p?.prescription?.od || {}
                          const os = p?.prescription?.os || {}
                          const fmtNum = (v, sign = true) => typeof v === 'number' ? `${v >= 0 && sign ? '+' : ''}${v.toFixed(2)}` : 'None'
                          const fmtAxis = (v) => typeof v === 'number' ? `${v}` : 'None'
                          return (
                            <>
                              <tr>
                                <th className="text-muted">OD-Right</th>
                                <td>{fmtNum(od.sph)}</td>
                                <td>{fmtNum(od.cyl)}</td>
                                <td>{fmtAxis(od.axis)}</td>
                                <td>{fmtNum(od.add)}</td>
                                {singlePD ? (
                                  <td rowSpan="2" className="align-middle text-center">{pdRight}</td>
                                ) : (
                                  <td>{pdRight}</td>
                                )}
                              </tr>
                              <tr>
                                <th className="text-muted">OS-Left</th>
                                <td>{fmtNum(os.sph)}</td>
                                <td>{fmtNum(os.cyl)}</td>
                                <td>{fmtAxis(os.axis)}</td>
                                <td>{fmtNum(os.add)}</td>
                                {!singlePD && <td>{pdLeft}</td>}
                              </tr>
                            </>
                          )
                        })()}
                      </tbody>
                    </table>
                  </div>
                  <div className="list-group">
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Rx Type</span>
                      <span>{RX_LABEL[rxItem?.prescription?.rxType] || '—'}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Lens Type</span>
                      <span>{LT_LABEL[rxItem?.prescription?.lensType] || '—'}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Lenses</span>
                      <span>
                        {rxItem?.prescription?.lens
                          ? `${rxItem.prescription.lens.thickness ?? ''} ${String(rxItem.prescription.lens.title || '').toUpperCase()}${rxItem.prescription.lens.price ? ` + $${Number(rxItem.prescription.lens.price).toFixed(2)}` : ''}`.trim()
                          : 'None'}
                      </span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Coating</span>
                      <span>{rxItem?.prescription?.coating?.title?.toUpperCase?.() || 'None'}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Shell (admin-like with sidebar) ---
export default function Dashboard() {
  const { path, url } = useRouteMatch()
  const location = useLocation()
  const { userToken, userLogout } = useContext(AppContext)
  if (!userToken) return <Redirect to="/login" />
  const isActive = (pathToCheck, exact = false) => {
    if (exact) return location.pathname === pathToCheck
    return location.pathname === pathToCheck || location.pathname.startsWith(pathToCheck + '/')
  }
  return (
    <div>
      {/* Mobile navbar (matches admin behavior) */}
      <nav className="navbar navbar-dark top-bg d-md-none">
        <div className="container-fluid">
          <button
            className="btn btn-outline-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#userMobileSidebar"
            aria-controls="userMobileSidebar"
          >
            ☰ Menu
          </button>
          <div className="dropdown">
            <button
              type="button"
              className="btn bg-transparent border-0 d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="userDropdownMobile"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-user me-2" />
              <span className="d-sm-inline">Account</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end text-small shadow" aria-labelledby="userDropdownMobile">
              <li><button className="dropdown-item" onClick={userLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div style={{ position: "sticky", height: "100vh", top: 0 }} className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 top-bg d-none d-md-block">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/account" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Account</span>
              </a>
              <ul className="nav w-100 nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item w-100 py-2">
                  <Link to={`${url}`} className={`py-3 customlinks nav-link ${isActive(url, true) ? 'active' : ''}`}><i className="fa fa-user me-2"></i><span className="ms-1 text-light">General Info</span></Link>
                </li>
                <li className="nav-item w-100 py-2">
                  <Link to={`${url}/wishlist`} className={`py-3 customlinks nav-link ${isActive(`${url}/wishlist`) ? 'active' : ''}`}><i className="fa fa-heart me-2"></i><span className="ms-1 text-light">Wishlist</span></Link>
                </li>
                <li className="nav-item w-100 py-2">
                  <Link to={`${url}/orders`} className={`py-3 customlinks nav-link ${isActive(`${url}/orders`) ? 'active' : ''}`}><i className="fa fa-shopping-bag me-2"></i><span className="ms-1 text-light">Orders</span></Link>
                </li>
              </ul>
              <hr />
              <div className="pb-4">
                <button onClick={userLogout} className="btn btn-light btn-sm">Logout</button>
              </div>
            </div>
          </div>
          {/* Offcanvas Sidebar for Mobile */}
          <div
            className="offcanvas offcanvas-start bg-secondary text-white"
            id="userMobileSidebar"
            aria-labelledby="userMobileSidebarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="userMobileSidebarLabel">
                Account
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{ filter: "invert(1)", opacity: 1 }}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item w-100 py-1" data-bs-dismiss="offcanvas">
                  <Link to={`${url}`} className={`py-2 customlinks nav-link ${isActive(url, true) ? 'active' : ''}`}><i className="fa fa-user me-2"></i><span className="ms-1 text-light">General Info</span></Link>
                </li>
                <li className="nav-item w-100 py-1" data-bs-dismiss="offcanvas">
                  <Link to={`${url}/wishlist`} className={`py-2 customlinks nav-link ${isActive(`${url}/wishlist`) ? 'active' : ''}`}><i className="fa fa-heart me-2"></i><span className="ms-1 text-light">Wishlist</span></Link>
                </li>
                <li className="nav-item w-100 py-1" data-bs-dismiss="offcanvas">
                  <Link to={`${url}/orders`} className={`py-2 customlinks nav-link ${isActive(`${url}/orders`) ? 'active' : ''}`}><i className="fa fa-shopping-bag me-2"></i><span className="ms-1 text-light">Orders</span></Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col py-3">
            <Switch>
              <Route exact path={path}><GeneralInfoPage /></Route>
              <Route path={`${path}/wishlist`}><WishlistPage /></Route>
              <Route path={`${path}/orders`}><OrdersPage /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
