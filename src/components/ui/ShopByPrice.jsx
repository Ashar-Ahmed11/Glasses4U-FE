import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/appContext';

const items = [
  { label: '$6.95', max: 6.95 },
  { label: 'Under $20', max: 20 },
  { label: 'Under $30', max: 30 },
];

const slugify = (s) => String(s || '')
  .toLowerCase()
  .replace(/[\s\-_\/]+/g, '-')
  .replace(/[^a-z0-9-]/g, '');

const ShopByPrice = () => {
  const { categories } = useContext(AppContext);
  const catSlug = useMemo(() => {
    const list = (categories || []).map(c => ({ name: c?.mainHeading || '', slug: slugify(c?.mainHeading || '') }));
    const pref = list.find(c => /eye\s*glasses|eyeglasses|eyewear/i.test(c.name)) || list[0];
    return pref?.slug || 'eyewear';
  }, [categories]);

  return (
    <section className="container py-5">
      <h2 className="fw-bold text-center mb-4" style={{ fontSize: 64, letterSpacing: 1 }}>SHOP BY PRICE</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {items.map((it, i) => (
          <Link
            key={i}
            to={`/category/${catSlug}?priceMax=${encodeURIComponent(it.max)}`}
            className="btn btn-dark rounded-pill px-5 py-3 fs-5 fw-bold"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByPrice;
