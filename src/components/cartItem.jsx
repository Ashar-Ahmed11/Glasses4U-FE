import React, { useContext } from 'react'
import AppContext from './context/appContext'

export default function CartItem({ data }) {
  const { updateProduct, removeProduct } = useContext(AppContext)
  const { image, name, quantity, localePrice } = data
  const color = '#212427'

  return (
    <div className="card mb-3" style={{ backgroundColor: '#ffffff', maxWidth: '540px', borderColor: color }}>
      <div className="container">
        <div className="row">
          <div className="col-4 d-flex justify-content-center align-items-center">
            <img src={image} alt={name} className="img-fluid" />
          </div>
          <div className="col-8">
            <div className="px-2">
              <h5 style={{ color }} className="card-title my-3">{name}</h5>
              {data.variant && <p style={{ color }} className="card-text py-1">{data.variant.variant}</p>}
              <div className="d-flex align-items-center">
                <button style={{ borderColor: color, color }} onClick={() => updateProduct(data, quantity - 1)} className="btn">-</button>
                <p style={{ color }} className="card-text mx-2 mb-0">{quantity}</p>
                <button style={{ borderColor: color, color }} onClick={() => updateProduct(data, quantity + 1)} className="btn">+</button>
              </div>
              <p style={{ color }} className="card-text py-2">{localePrice}</p>
            </div>
          </div>
        </div>
      </div>
      <h5 onClick={() => removeProduct(data)} style={{ position: 'absolute', right: '3px', top: '2px', cursor: 'pointer', color }}>
        <i className="fa fa-times-circle" aria-hidden="true"></i>
      </h5>
    </div>
  )
}