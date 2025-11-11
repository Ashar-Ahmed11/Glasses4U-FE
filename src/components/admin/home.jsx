import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const numbers = React.useMemo(() => ({
        revenue: Math.floor(Math.random() * 90000) + 10000,
        totalProducts: Math.floor(Math.random() * 900) + 100,
        totalSold: Math.floor(Math.random() * 5000) + 500,
        totalOrders: Math.floor(Math.random() * 2000) + 200,
    }), [])
    return (
        <div className="container py-4">
            
            <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4" style={{ fontWeight: 900 }}>Admin Dashboard</h1>

            <div className="row g-3 py-4">
                <div className="col-12 col-sm-6 col-lg-3">
                    <Link to="/dashboard/create-product" className="text-decoration-none">
                        <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                            <i className="fa fa-plus-circle fa-2x mb-2 text-dark"></i>
                            <div className="h5 text-dark">Create Product</div>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <Link to="/dashboard/products" className="text-decoration-none">
                        <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                            <i className="fa fa-list fa-2x mb-2 text-dark"></i>
                            <div className="h5 text-dark">View Products</div>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <Link to="/dashboard/create-category" className="text-decoration-none">
                        <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                            <i className="fa fa-folder-open fa-2x mb-2 text-dark"></i>
                            <div className="h5 text-dark">Create Category</div>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <Link to="/dashboard/basic-info" className="text-decoration-none">
                        <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                            <i className="fa fa-gear fa-2x mb-2 text-dark"></i>
                            <div className="h5 text-dark">Basic Info</div>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                        <div className="display-6 mb-2 fw-bold text-dark">${numbers.revenue}</div>
                        <div className="h5 text-dark">Total Revenue</div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                        <div className="display-6 mb-2 fw-bold text-dark">{numbers.totalProducts}</div>
                        <div className="h5 text-dark">Total Products</div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                        <div className="display-6 mb-2 fw-bold text-dark">{numbers.totalSold}</div>
                        <div className="h5 text-dark">Total Sold Products</div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm h-100 text-center p-4 border-0 top-bg">
                        <div className="display-6 mb-2 fw-bold text-dark">{numbers.totalOrders}</div>
                        <div className="h5 text-dark">Total Orders</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

