import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/appContext'
import { useHistory } from 'react-router-dom'
import CheckoutItem from '../checkoutItem'

const STATUSES = ['Pending Approval', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function Orders() {
  const history = useHistory()
  const { fetchOrders, updateOrderStatus } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [rxItem, setRxItem] = useState(null)
  const RX_LABEL = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
  const LT_LABEL = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun' }
  const priceConverter = (n) => Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
    ;(async () => {
      setLoading(true)
      try {
        const list = await fetchOrders()
        const arr = Array.isArray(list) ? list : []
        setOrders(arr)
        setFiltered(arr)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const openStatus = (order) => {
    setSelected(order); setNewStatus(order.status || 'Pending Approval')
    const el = document.getElementById('statusModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
  }
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
  const saveStatus = async () => {
    if (!selected) return
    const updated = await updateOrderStatus(selected._id, newStatus)
    const updatedList = orders.map((o) => (o._id === updated._id ? updated : o))
    setOrders(updatedList)
    // maintain current filter
    if (searchQuery.trim()) {
      setFiltered(updatedList.filter((o) => String(o.trackingId || '').includes(searchQuery.trim())))
    } else {
      setFiltered(updatedList)
    }
    const el = document.getElementById('statusModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).hide()
  }

  const filterBySearch = (e) => {
    e && e.preventDefault && e.preventDefault()
    if (!searchQuery.trim()) return setFiltered(orders)
    const q = searchQuery.trim()
    setFiltered(orders.filter((o) => String(o.trackingId || '').includes(q)))
  }

  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4" style={{ fontWeight: 900 }}>Orders</h1>
        <div className="py-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <form onSubmit={filterBySearch} className="w-100">
              <div className="d-flex align-items-center">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderColor: "black", color: 'black', backgroundColor: "#ffffff" }}
                  type="text"
                  className="form-control"
                  placeholder="Search by Tracking ID"
                />
                <div className="px-2">
                  <button style={{ cursor: 'pointer', border: 'none', backgroundColor: "#fafafa" }} className='fas fa-search fa-lg' onClick={filterBySearch}></button>
                </div>
              </div>
            </form>
          </div>
          {loading ? (
            <div className="py-5 text-center"><div style={{ width: 60, height: 60 }} className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
          ) : (
            <div className="row g-3">
              {(filtered || []).map((o) => (
                <div key={o._id} className="col-12">
                  <div className="card border-0 shadow-sm p-2">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <div className="d-flex align-items-center gap-3">
                        <div className="flex-grow-1">
                          <div className="fw-bold">{o.name || '—'}</div>
                          <div className="text-muted small">Status: {String(o.status || '—')}</div>
                          <div className="text-muted small">Total: {Number(o.total || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                          <div className="text-muted small" style={{ opacity: 0.6 }}>Tracking: {String(o.trackingId || '—')}</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button className="btn btn-outline-dark btn-sm me-2" onClick={() => openStatus(o)}>Change Status</button>
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

      {/* Change Status Modal */}
      <div className="modal fade" id="statusModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <select className="form-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-dark" onClick={saveStatus}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
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
                        localePrice: priceConverter(unitPrice),
                        variant: null,
                        prescription: p?.prescription || null,
                      }
                      return <CheckoutItem key={idx} element={element} onViewPrescription={openRx} />
                    })}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Subtotal: {Number(selected.subtotal || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    <div>Delivery: {Number(selected.deliveryCharges || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    <div>Total: <strong>{Number(selected.total || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rx Modal (Admin Orders) */}
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
