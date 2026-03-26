import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/appContext';

const Footer = () => {
  const { categories = [], basicInfo, getBasicInfo } = useContext(AppContext)
  useEffect(() => { if (!basicInfo) getBasicInfo() }, [basicInfo, getBasicInfo])
  return (
    <footer className="bg-light border-top mt-5 py-5">
      <div className="container">
        <div className="row g-4 px-4">
          <div className="col-12 col-md">
            <div className="fw-bold">Glasses 4U</div>
            {basicInfo?.footerDescription
              ? <small className="text-muted d-block" style={{ whiteSpace: 'pre-wrap' }}>{basicInfo.footerDescription}</small>
              : <small className="text-muted">Eyewear for everyone®</small>}
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
          <div className="col-6 col-md">
            <div className="fw-semibold mb-2">Other Links</div>
            <ul className="list-unstyled small m-0">
              <li><Link className="text-decoration-none" to="/blogs">Blogs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-4 px-4">
          <div className="fw-semibold mb-2">Cards Accepted</div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            {(() => {
              const size = { width: 56, height: 32, borderRadius: 6, border: '1px solid #e5e5e5', background: '#fff' }
              const Logo = ({ children, title }) => (
                <span title={title} aria-label={title} className="d-inline-flex align-items-center justify-content-center" style={size}>
                  {children}
                </span>
              )
              return (
                <>
                  {/* Visa */}
                  <Logo title="Visa">
                    <svg width="44" height="18" viewBox="0 0 64 24" role="img" aria-hidden="true">
                      <rect width="64" height="24" rx="3" fill="#1a1f71" />
                      <text x="8" y="17" fontSize="12" fontFamily="Arial, Helvetica, sans-serif" fill="#fff">VISA</text>
                    </svg>
                  </Logo>
                  {/* Mastercard */}
                  <Logo title="Mastercard">
                    <svg width="44" height="18" viewBox="0 0 64 24" role="img" aria-hidden="true">
                      <rect width="64" height="24" rx="3" fill="#fff" />
                      <circle cx="28" cy="12" r="7.5" fill="#eb001b" />
                      <circle cx="36" cy="12" r="7.5" fill="#f79e1b" />
                    </svg>
                  </Logo>
                  {/* American Express */}
                  <Logo title="American Express">
                    <svg width="44" height="18" viewBox="0 0 64 24" role="img" aria-hidden="true">
                      <rect width="64" height="24" rx="3" fill="#0077c8" />
                      <text x="6" y="16" fontSize="10" fontFamily="Arial, Helvetica, sans-serif" fill="#fff">AMEX</text>
                    </svg>
                  </Logo>
                  {/* Discover */}
                  <Logo title="Discover">
                    <svg width="44" height="18" viewBox="0 0 64 24" role="img" aria-hidden="true">
                      <rect width="64" height="24" rx="3" fill="#fff" />
                      <rect x="36" y="0" width="28" height="24" fill="#ff6000" />
                      <text x="6" y="16" fontSize="10" fontFamily="Arial, Helvetica, sans-serif" fill="#000">DISCOVER</text>
                    </svg>
                  </Logo>
                  {/* JCB */}
                  <Logo title="JCB">
                    <svg width="44" height="18" viewBox="0 0 64 24" role="img" aria-hidden="true">
                      <rect width="64" height="24" rx="3" fill="#fff" />
                      <rect x="10" y="4" width="12" height="16" rx="2" fill="#0061a8" />
                      <rect x="22" y="4" width="12" height="16" rx="2" fill="#e6002d" />
                      <rect x="34" y="4" width="12" height="16" rx="2" fill="#00a651" />
                      <text x="14" y="16" fontSize="8" fontFamily="Arial, Helvetica, sans-serif" fill="#fff">J</text>
                      <text x="26" y="16" fontSize="8" fontFamily="Arial, Helvetica, sans-serif" fill="#fff">C</text>
                      <text x="38" y="16" fontSize="8" fontFamily="Arial, Helvetica, sans-serif" fill="#fff">B</text>
                    </svg>
                  </Logo>
                  {/* Diners Club */}
                  <Logo title="Diners Club">
                    <svg width="44" height="18" viewBox="0 0 64 24" role="img" aria-hidden="true">
                      <rect width="64" height="24" rx="3" fill="#fff" />
                      <circle cx="20" cy="12" r="8" fill="#0a4a8a" />
                      <circle cx="20" cy="12" r="4.5" fill="#fff" />
                      <text x="32" y="16" fontSize="9" fontFamily="Arial, Helvetica, sans-serif" fill="#0a4a8a">DC</text>
                    </svg>
                  </Logo>
                </>
              )         
            })()}
          </div>
        </div>
        <div className="small text-muted mt-3 px-4">© 2026 Glasses 4U</div>
        <div className="small text-muted mt-3 px-4">Website Developed by <a target='_blank' href="https://metatech-official.com">Website Development Company</a></div>
      </div>
    </footer>
  )
};

export default Footer;
