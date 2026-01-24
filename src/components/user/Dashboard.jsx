import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import AppContext from '../context/appContext'
import ProductCard from '../ui/productCard'

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
  useEffect(() => { (async () => { const u = await getUser(); setList(u?.wishlistProducts || []) })() }, [])
  const filtered = (list || []).filter((p) => p?.name?.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 className="display-4" style={{ fontWeight: 900 }}>Wishlist</h1>
        <div className="py-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="form-control w-50" placeholder="Search" />
          </div>
          <div className="row g-3">
            {filtered.map((p) => (
              <div key={p._id} className="col-6 col-md-3 position-relative">
                <button onClick={() => removeFromWishlist(p._id)} className="btn btn-sm btn-light position-absolute top-0 end-0 m-2">✕</button>
                <ProductCard product={{ ...p, localePrice: price(p.price) }} to={`/product/${p._id}`} />
              </div>
            ))}
            {!filtered.length && <div className="text-muted">No items.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function OrdersPage() {
  const { getUser, getUserOrders } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  useEffect(() => { (async () => { const u = await getUser(); if (u?._id) { const o = await getUserOrders(u._id); setOrders(Array.isArray(o) ? o : []) } })() }, [])
  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 className="display-4" style={{ fontWeight: 900 }}>Orders</h1>
        <div className="py-2">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Shell (admin-like with sidebar) ---
export default function Dashboard() {
  const { path, url } = useRouteMatch()
  const { userToken, userLogout } = useContext(AppContext)
  if (!userToken) return <Redirect to="/login" />
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div style={{ position: "sticky", height: "100vh", top: 0 }} className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 top-bg d-none d-md-block">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/account" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Account</span>
              </a>
              <ul className="nav w-100 nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item w-100 py-2">
                  <Link to={`${url}`} className="py-3 customlinks nav-link"><i className="fa fa-user me-2"></i><span className="ms-1 text-light">General Info</span></Link>
                </li>
                <li className="nav-item w-100 py-2">
                  <Link to={`${url}/wishlist`} className="py-3 customlinks nav-link"><i className="fa fa-heart me-2"></i><span className="ms-1 text-light">Wishlist</span></Link>
                </li>
                <li className="nav-item w-100 py-2">
                  <Link to={`${url}/orders`} className="py-3 customlinks nav-link"><i className="fa fa-shopping-bag me-2"></i><span className="ms-1 text-light">Orders</span></Link>
                </li>
              </ul>
              <hr />
              <div className="pb-4">
                <button onClick={userLogout} className="btn btn-light btn-sm">Logout</button>
              </div>
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
