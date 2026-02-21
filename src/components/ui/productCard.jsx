import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, to, onClick }) => {
  const onErr = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/logo192.png" }
  const fmt = (n) => Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
  const hasSale = Number(product?.salePrice) > 0
  const basePrice = Number(product?.price || 0)
  const salePrice = Number(product?.salePrice || 0)
  return (
    <Link to={to} onClick={onClick} className="text-decoration-none text-dark d-flex justify-content-center">
      <div className="product-card card border-0">
        <span className="badge-top">Top rated</span>
        <button className="btn-like" type="button" aria-label="save">❤</button>
        <div className="img-wrap d-flex align-items-center justify-content-center my-5">
          <img src={product.assets?.[0]?.url || "/logo512.png"} alt={product.name} className="img-fluid" onError={onErr} />
        </div>
        <div className="card-body pt-2">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h5 className="mb-0 price">
              {hasSale ? (
                <>
                  <span className="text-muted me-2" style={{ textDecoration: 'line-through' }}>{fmt(basePrice)}</span>
                  <span className="text-danger">{fmt(salePrice)}</span>
                </>
              ) : (
                fmt(basePrice)
              )}
            </h5>
            <div className="d-flex align-items-center gap-1 rating">
              <span className="star" aria-hidden>★</span>
              <span className="star" aria-hidden>★</span>
              <span className="star" aria-hidden>★</span>
              {/* <span className="fw-semibold text-dark"></span> */}
              <small className="text-muted">Top Rated</small>
            </div>
          </div>
          <p className="mb-1 fw-semibold text-dark">{product.name}</p>
          <p className="mb-2 delivery">In Stock</p>
          {/* <div className="d-flex gap-2 align-items-center swatches">
            <button className="swatch swatch-red" aria-label="Red" />
            <button className="swatch swatch-black selected" aria-label="Black" />
            <button className="swatch swatch-white" aria-label="White" />
            <button className="swatch-add" aria-label="More colors">+</button>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
