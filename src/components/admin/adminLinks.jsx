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
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard" className={`py-2   customlinks nav-link ${isActive("/dashboard", true) ? "active" : ""}`}>
          <i className="fa fa-home me-2"></i> <span className="ms-1 text-light small">Home</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/create-post" className={`py-2 customlinks nav-link ${isActive("/dashboard/create-post") ? "active" : ""}`}>
          <i className="fa fa-plus-square me-2"></i> <span className="ms-1 text-light small">Create Post</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/blogs" className={`py-2 customlinks nav-link ${isActive("/dashboard/blogs") ? "active" : ""}`}>
          <i className="fa fa-newspaper me-2"></i> <span className="ms-1 text-light small">View Blogs</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/eyewear" className={`py-2 customlinks nav-link ${isActive("/dashboard/eyewear") ? "active" : ""}`}>
          <i className="fa fa-eye me-2"></i> <span className="ms-1 text-light small">Eyewear</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/discount-codes" className={`py-2 customlinks nav-link ${isActive("/dashboard/discount-codes") ? "active" : ""}`}>
          <i className="fa fa-ticket me-2"></i> <span className="ms-1 text-light small">Discount Codes</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/create-product" className={`py-2 customlinks nav-link ${isActive("/dashboard/create-product") ? "active" : ""}`}>
          <i className="fa fa-plus-circle me-2"></i> <span className="ms-1 text-light small">Create Product</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/products" className={`py-2 customlinks nav-link ${isActive("/dashboard/products") ? "active" : ""}`}>
          <i className="fa fa-list me-2"></i> <span className="ms-1 text-light small">View Products</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/create-category" className={`py-2 customlinks nav-link ${isActive("/dashboard/create-category") ? "active" : ""}`}>
          <i className="fa fa-folder-open me-2"></i> <span className="ms-1 text-light small">Create Category</span>
                </Link>
            </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/create-subcategory" className={`py-2 customlinks nav-link ${isActive("/dashboard/create-subcategory") ? "active" : ""}`}>
          <i className="fa fa-folder-open me-2"></i> <span className="ms-1 text-light small">Create Subcategory</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/categories" className={`py-2 customlinks nav-link ${isActive("/dashboard/categories") ? "active" : ""}`}>
          <i className="fa fa-clone me-2"></i> <span className="ms-1 text-light small">View Categories</span>
                </Link>
            </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/subcategories" className={`py-2 customlinks nav-link ${isActive("/dashboard/subcategories") ? "active" : ""}`}>
          <i className="fa fa-clone me-2"></i> <span className="ms-1 text-light small">View Subcategories</span>
        </Link>
      </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/basic-info" className={`py-2 customlinks nav-link ${isActive("/dashboard/basic-info") ? "active" : ""}`}>
          <i className="fa fa-gear me-2"></i> <span className="ms-1 text-light small">Basic Info</span>
                </Link>
            </li>
      <li data-bs-dismiss={mobile && "offcanvas"} className="nav-item w-100 py-1">
        <Link to="/dashboard/orders" className={`py-2 customlinks nav-link ${isActive("/dashboard/orders") ? "active" : ""}`}>
          <i className="fa fa-shopping-bag me-2"></i> <span className="ms-1 text-light small">Orders</span>
        </Link>
      </li>
        </>
    )
}

export default AdminLinks