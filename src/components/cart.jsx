import React, { useContext } from 'react'
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

  return (
    <div>
      <div style={{ backgroundColor: '#ffffff', height: '100%' }} className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header" style={{ borderBottom: `1px solid ${color}` }}>
          <h5 style={{ color }} className="offcanvas-title" id="staticBackdropLabel">CART</h5>
          <button style={{ color, backgroundColor: '#ffffff' }} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div style={{ overflowX: 'hidden' }} className="offcanvas-body">
          <div style={{ transition: 'all 0.7s ease' }}>
            {cart.map((e) => (<CartItem key={e.id} data={e} />))}
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
    </div>
  )
}