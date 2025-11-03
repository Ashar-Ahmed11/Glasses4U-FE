import React from "react";

import "./ProductCard.css"; // create this file with the CSS below

const ProductCard = () => {
  return (
    <div className="product-card card border-0">
      {/* badge */}
      <span className="badge-top">Top rated</span>

      {/* heart */}
      <button className="btn-like" type="button" aria-label="save">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000"
          strokeWidth="1.4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-1.79-1.46-3.25-3.25-3.25-.99 0-1.87.45-2.46 1.16L12 9.06 8.71 6.16A3.24 3.24 0 0 0 6.25 5C4.46 5 3 6.46 3 8.25c0 .93.38 1.77 1 2.38l7.46 7.36 7.45-7.36c.63-.61 1.09-1.45 1.09-2.38Z"
          />
        </svg>
      </button>

      {/* image */}
      <div className="img-wrap d-flex align-items-center justify-content-center my-5">
        <img
          src="//static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*"
          alt="Bravo Browline"
          className="img-fluid"
        />
      </div>

      {/* body */}
      <div className="card-body pt-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="mb-0 price">$15.95</h5>
          <div className="d-flex align-items-center gap-1 rating">
            <span className="star" aria-hidden>
              ★
            </span>
            <span className="fw-semibold text-dark">4.5</span>
            <small className="text-muted">(4K+)</small>
          </div>
        </div>

        <p className="mb-1 fw-semibold text-dark">Bravo Browline</p>

        <p className="mb-2 delivery">Get it as early as Wed, Nov 5</p>

        <div className="d-flex gap-2 align-items-center swatches">
          <button className="swatch swatch-red" aria-label="Red" />
          <button className="swatch swatch-black selected" aria-label="Black" />
          <button className="swatch swatch-white" aria-label="White" />
          <button className="swatch-add" aria-label="More colors">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
