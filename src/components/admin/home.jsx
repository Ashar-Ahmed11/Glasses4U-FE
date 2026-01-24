import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function Home() {
    const { fetchOrders, fetchAllProductsBE } = React.useContext(AppContext)
    const [revenue, setRevenue] = React.useState(0)
    const [ordersCount, setOrdersCount] = React.useState(0)
    const [productCount, setProductCount] = React.useState(0)
    const [soldCount, setSoldCount] = React.useState(0)
    const numbers = React.useMemo(() => ({
        revenue,
        totalProducts: productCount,
        totalSold: soldCount,
        totalOrders: ordersCount,
    }), [revenue, productCount, soldCount, ordersCount])

    React.useEffect(() => {
        (async () => {
            try {
                // Orders based KPIs
                const orders = await fetchOrders()
                const revenueSum = (orders || []).reduce((acc, o) => acc + Number(o?.total || 0), 0)
                setRevenue(Math.round(revenueSum))
                setOrdersCount(Array.isArray(orders) ? orders.length : 0)

                // Products KPIs
                const products = await fetchAllProductsBE()
                setProductCount(Array.isArray(products) ? products.length : 0)

                // Total sold = sum of all line quantities across orders
                const sold = (orders || []).reduce((acc, o) => {
                    const qty = (o?.products || []).reduce((q, line) => q + Number(line?.quantity || 0), 0)
                    return acc + qty
                }, 0)
                setSoldCount(sold)
            } catch (e) {
                // keep previous numbers on error
            }
        })()
    }, [fetchOrders, fetchAllProductsBE])
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

