import React from 'react';

const items = [
  { label: '$6.95', href: '/' },
  { label: 'Under $20', href: '/' },
  { label: 'Under $30', href: '/' },
  { label: 'Sale', href: '/' }
];

const ShopByPrice = () => (
  <section className="container py-5">
    <h2 className="fw-bold text-center mb-4" style={{ fontSize: 64, letterSpacing: 1 }}>SHOP BY PRICE</h2>
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {items.map((it, i) => (
        <a key={i} href={it.href} className="btn btn-dark rounded-pill px-5 py-3 fs-5 fw-bold">
          {it.label}
        </a>
      ))}
    </div>
  </section>
);

export default ShopByPrice;
