import React, { useContext, useState } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import AppContext from './context/appContext'
import CheckoutItem from './checkoutItem'

const RX_LABEL = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
const LT_LABEL = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun' }

export default function TrackOrder() {
  const { fetchOrderByTracking } = useContext(AppContext)
  const [trackingId, setTrackingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [rxItem, setRxItem] = useState(null)
  const priceConverter = (n) => Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  const openDetails = (ord) => {
    setOrder(ord)
    const el = document.getElementById('publicOrderDetails')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
  }
  const openRx = (item) => {
    setRxItem(item)
    const el = document.getElementById('publicRxModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
  }

  const onCheck = async (e) => {
    e.preventDefault()
    if (!trackingId) return
    try {
      setLoading(true)
      const ord = await fetchOrderByTracking(trackingId)
      openDetails(ord)
    } catch (e) {
      alert('Order not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* <Header /> */}
      <div className="container my-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <img className="img-fluid rounded" alt="Track your order" src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop" />
          </div>
          <div className="col-lg-6">
            <h2 className="mb-3">Track Your Order</h2>
            <p className="text-muted">Enter your 5-digit tracking ID to view your order details.</p>
            <form onSubmit={onCheck}>
              <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} className="form-control form-control-lg mb-3" placeholder="Enter Tracking ID" />
              <button disabled={loading || !trackingId} className="btn btn-dark btn-lg w-100">{loading ? 'Checking...' : 'Check Status'}</button>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}

      {/* Details Modal (Public) */}
      <div className="modal fade" id="publicOrderDetails" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg equal-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!order ? <div className="text-muted">No order found.</div> : (
                <>
                  <div className="mb-3">
                    <div className="fw-bold">{order.name}</div>
                    <div className="text-muted small">Email: {order.email}</div>
                    <div className="text-muted small">Phone: {order.phone}</div>
                    <div className="text-muted small">Address: {order.address}, {order.city}, {order.country}</div>
                    <div className="text-muted small">Tracking: {order.trackingId}</div>
                    <div className="text-muted small">Status: {order.status}</div>
                  </div>
                  <h6>Items</h6>
                  <div className="mb-3">
                    {(order.products || []).map((p, idx) => {
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
                    <div>Subtotal: {priceConverter(order.subtotal)}</div>
                    <div>Delivery: {priceConverter(order.deliveryCharges)}</div>
                    <div>Total: <strong>{priceConverter(order.total)}</strong></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rx Modal (Public) */}
      <div className="modal fade" id="publicRxModal" tabIndex="-1" aria-hidden="true">
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
    </>
  )
}
