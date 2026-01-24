import React, { useContext, useState } from 'react'
import CartItem from './cartItem'
import { Link } from 'react-router-dom'
import AppContext from './context/appContext'
import { useHistory } from 'react-router-dom'
export default function Cart() {
  const { cart } = useContext(AppContext)
  const color = '#212427'
  const history = useHistory()
  const subtotal = cart.reduce((sum, i) => sum + i.quantity * i.price, 0)
  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  console.log(cart)
  const [rxItem, setRxItem] = useState(null)
  const openRx = (item) => {
    setRxItem(item)
    const el = document.getElementById('rxModal')
    const bs = window?.bootstrap
    if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
  }
  const RX_LABEL = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
  const LT_LABEL = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun' }
  const toLabel = (v, sign = true) => (typeof v === 'number' ? `${v >= 0 && sign ? '+' : ''}${v.toFixed(2)}` : 'None')
  return (
    <div>
      <div style={{ backgroundColor: '#ffffff', height: '100%' }} className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header" style={{ borderBottom: `1px solid ${color}` }}>
          <h5 style={{ color }} className="offcanvas-title" id="staticBackdropLabel">CART</h5>
          <button style={{ color, backgroundColor: '#ffffff' }} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div style={{ overflowX: 'hidden' }} className="offcanvas-body">
          <div style={{ transition: 'all 0.7s ease' }}>
            {cart.map((e) => (<CartItem key={e.id} data={e} onViewPrescription={openRx} />))}
          </div>
        </div>
        <div className="offcanvas-footer p-3" style={{ borderTop: `1px solid ${color}` }}>
          <div className="row mx-2">
            <div style={{ color }} className="col-6"><p>SUBTOTAL</p></div>
            <div style={{ color, textAlign: 'end' }} className="col-6"><p>{fmt(subtotal)}</p></div>
          </div>
          {subtotal > 0 && (
            <div className="d-flex">
              <button onClick={() => history.push('/checkout')} className="btn top-bg text-white" data-bs-dismiss="offcanvas" style={{  width: '100%' }}>Check Out</button>
            </div>
          )}
        </div>
      </div>

      {/* Prescription summary modal */}
      <div className="modal fade" id="rxModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">PRESCRIPTION</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!rxItem?.prescription ? (
                <div className="text-muted">No prescription on this item.</div>
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