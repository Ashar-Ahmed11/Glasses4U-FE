import React from 'react';

const Footer = () => (
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
            <li><a className="text-decoration-none" href="/">Eyeglasses</a></li>
            <li><a className="text-decoration-none" href="/">Sunglasses</a></li>
            <li><a className="text-decoration-none" href="/">Lenses</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <div className="fw-semibold mb-2">Support</div>
          <ul className="list-unstyled small m-0">
            <li><a className="text-decoration-none" href="/">Help Center</a></li>
            <li><a className="text-decoration-none" href="/">Returns</a></li>
            <li><a className="text-decoration-none" href="/">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="small text-muted mt-4 px-4">© 2025 Glasses 4U</div>
    </div>
  </footer>
);

export default Footer;
