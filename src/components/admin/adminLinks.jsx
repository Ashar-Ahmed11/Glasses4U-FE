import React from 'react'
import { Link, useLocation } from "react-router-dom";

const AdminLinks = ({ mobile }) => {
  const location = useLocation();
  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard" className={`py-3   customlinks nav-link ${isActive("/dashboard", true) ? "active" : ""}`}>
          <i className="fa fa-home me-2"></i> <span className="ms-1 text-light">Home</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard/eyewear" className={`py-3 customlinks nav-link ${isActive("/dashboard/eyewear") ? "active" : ""}`}>
          <i className="fa fa-eye me-2"></i> <span className="ms-1 text-light">Eyewear</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard/create-product" className={`py-3 customlinks nav-link ${isActive("/dashboard/create-product") ? "active" : ""}`}>
          <i className="fa fa-plus-circle me-2"></i> <span className="ms-1 text-light">Create Product</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard/products" className={`py-3 customlinks nav-link ${isActive("/dashboard/products") ? "active" : ""}`}>
          <i className="fa fa-list me-2"></i> <span className="ms-1 text-light">View Products</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard/create-category" className={`py-3 customlinks nav-link ${isActive("/dashboard/create-category") ? "active" : ""}`}>
          <i className="fa fa-folder-open me-2"></i> <span className="ms-1 text-light">Create Category</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard/categories" className={`py-3 customlinks nav-link ${isActive("/dashboard/categories") ? "active" : ""}`}>
          <i className="fa fa-clone me-2"></i> <span className="ms-1 text-light">View Categories</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-2">
        <Link to="/dashboard/basic-info" className={`py-3 customlinks nav-link ${isActive("/dashboard/basic-info") ? "active" : ""}`}>
          <i className="fa fa-gear me-2"></i> <span className="ms-1 text-light">Basic Info</span>
        </Link>
      </li>
    </>
  )
}

export default AdminLinks