import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/appContext';

const Footer = () => {
  const { categories = [] } = useContext(AppContext)
  return (
    <footer className="bg-light border-top mt-5 py-5">
      <div className="container">
        <div className="row g-4 px-4">
          <div className="col-12 col-md">
            <div className="fw-bold">Glasses 4U</div>
            <small className="text-muted">Eyewear for everyone®</small>
          </div>
          <div className="col-6 col-md">
            <div className="fw-semibold mb-2">Shop</div>
            <ul className="list-unstyled small m-0">
              {(categories || []).slice(0, 8).map((c) => (
                <li key={c._id}><Link className="text-decoration-none" to={`/category/${(c.mainHeading || '').toLowerCase().replace(/[\s\-_\/]+/g,'-').replace(/[^a-z0-9-]/g,'')}`}>{c.mainHeading}</Link></li>
              ))}
              {(!categories || categories.length === 0) && (
                <li className="text-muted">No categories</li>
              )}
            </ul>
          </div>
          <div className="col-6 col-md">
            <div className="fw-semibold mb-2">Support</div>
            <ul className="list-unstyled small m-0">
              <li><Link className="text-decoration-none" to="/contact">Contact Us</Link></li>
              <li><Link className="text-decoration-none" to="/about">About Us</Link></li>
              <li><Link className="text-decoration-none" to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="small text-muted mt-4 px-4">© 2025 Glasses 4U</div>
      </div>
    </footer>
  )
};

export default Footer;
