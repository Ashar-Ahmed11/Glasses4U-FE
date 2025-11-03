import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const STATIC_CATEGORIES = [
  { label: 'Eyeglasses', href: '/' },
  { label: 'Sunglasses', href: '/' },
  { label: 'Lenses', href: '/' },
  { label: 'Accessories', href: '/' },
];

const Header = () => {
  return (
    <header className="sticky-top  shadow-sm top-bg">
      {/* Mobile navbar */}
      <nav className="navbar navbar-expand-lg d-lg-none top-bg">
        <div className="container-fluid">
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Toggle navigation">
            <i className="fa fa-bars fa-2x" style={{ color: '#000' }}></i>
          </button>
          <Link className="navbar-brand text-dark" to="/" style={{ transform: 'scale(1.2)' }}>
            <img src={logo} alt="Logo" width="36" height="36" className="d-inline-block align-text-top" />
          </Link>
          <ul className="navbar-nav flex-row">
            <li className="nav-item"><a className="nav-link text-dark px-2" href="/" aria-label="Cart"><i className="fa fa-2x fa-shopping-cart" style={{  color: '#000' }}></i></a></li>
          </ul>
        </div>
      </nav>

      {/* Mobile offcanvas menu */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-dark" id="mobileMenuLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            {STATIC_CATEGORIES.map((c, idx) => (
              <li className="nav-item" key={idx}>
                <Link className="nav-link fs-4 text-dark" to={c.href} data-bs-dismiss="offcanvas">{c.label}</Link>
              </li>
            ))}
          </ul>
          <hr />
          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item"><a className="nav-link text-dark" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa fa-instagram" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            <li className="nav-item"><a className="nav-link text-dark" href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fa fa-facebook-official" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            <li className="nav-item"><a className="nav-link text-dark" href="/"><i className="fa fa-map-marker" style={{ fontSize: 22, color: '#000' }}></i></a></li>
          </ul>
        </div>
      </div>

      {/* Desktop navbar */}
      <nav className="navbar d-none d-lg-flex top-bg">
        <div className="container-fluid align-items-center justify-content-between">
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3"><a className="nav-link text-dark" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa fa-instagram" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            <li className="nav-item me-3"><a className="nav-link text-dark" href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fa fa-facebook-official" style={{ fontSize: 22, color: '#000' }}></i></a></li>
          </ul>
          <Link className="navbar-brand text-dark" to="/" style={{ transform: 'scale(1.2)' }}>
            <img src={logo} style={{scale:1.5}} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          </Link>
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3"><a className="nav-link text-dark" href="/"><i className="fa fa-map-marker" style={{ fontSize: 22, color: '#000' }}></i></a></li>
            <li className="nav-item"><a className="nav-link text-dark" href="/"><i className="fa fa-shopping-cart" style={{ fontSize: 22, color: '#000' }}></i></a></li>
          </ul>
        </div>
      </nav>

      {/* Desktop categories row */}
      <div className="d-none d-lg-block border-top border-dark">
        <div className="container-fluid">
          <ul className="nav justify-content-center py-2">
            {STATIC_CATEGORIES.map((c, idx) => (
              <li className="nav-item mx-3" key={idx}>
                <Link className="nav-link fw-semibold text-dark" to={c.href}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
