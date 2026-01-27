import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/appContext'
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function Home() {
    const { fetchOrders, fetchAllProductsBE } = React.useContext(AppContext)
    const [revenue, setRevenue] = React.useState(0)
    const [ordersCount, setOrdersCount] = React.useState(0)
    const [productCount, setProductCount] = React.useState(0)
    const [soldCount, setSoldCount] = React.useState(0)
    const [ordersList, setOrdersList] = React.useState([])
    const [interval, setInterval] = React.useState('7') // '7' | '14' | '30' | 'all'
    const numbers = React.useMemo(() => ({
        revenue,
        totalProducts: productCount,
        totalSold: soldCount,
        totalOrders: ordersCount,
    }), [revenue, productCount, soldCount, ordersCount])
    const revenueSeries = React.useMemo(() => {
        const getDayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
        const end = getDayStart(new Date())
        const isAll = interval === 'all'
        let start
        if (isAll) {
            let min = end
            ;(ordersList || []).forEach((o) => {
                const d = getDayStart(new Date(o?.date || o?.createdAt || Date.now()))
                if (d < min) min = d
            })
            start = min || end
        } else {
            const days = parseInt(interval, 10) || 7
            start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - (days - 1))
        }
        const totals = new Map()
        ;(ordersList || []).forEach((o) => {
            const d = getDayStart(new Date(o?.date || o?.createdAt || Date.now()))
            if (d < start || d > end) return
            const key = d.toISOString().slice(0, 10)
            totals.set(key, (totals.get(key) || 0) + Number(o?.total || 0))
        })
        const series = []
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const key = d.toISOString().slice(0, 10)
            series.push({ date: key, total: Math.round(totals.get(key) || 0) })
        }
        return series
    }, [ordersList, interval])
    const periodTotal = React.useMemo(() => revenueSeries.reduce((a, b) => a + Number(b.total || 0), 0), [revenueSeries])
    const dateTick = React.useCallback((s) => (typeof s === 'string' ? s.slice(5) : s), [])
    const currencyTick = React.useCallback((n) => `${n}`, [])

    React.useEffect(() => {
        (async () => {
            try {
                // Orders based KPIs
                const orders = await fetchOrders()
                setOrdersList(Array.isArray(orders) ? orders : [])
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

            {/* Revenue line chart */}
            <div className="card shadow-sm border-0 my-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0">Revenue Over Time</h5>
                        <div className="d-flex align-items-center gap-2">
                            <select className="form-select form-select-sm" style={{ width: 180 }} value={interval} onChange={(e) => setInterval(e.target.value)}>
                                <option value="7">Last 7 Days</option>
                                <option value="14">Last 14 Days</option>
                                <option value="30">Last 30 Days</option>
                                <option value="all">All Time</option>
                            </select>
                            <small className="text-muted">Total (${periodTotal})</small>
                        </div>
                    </div>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={revenueSeries}>
                                <defs>
                                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="rgba(214,51,108,0.35)" />
                                        <stop offset="100%" stopColor="rgba(214,51,108,0.05)" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(0,0,0,.08)" vertical={false} />
                                <XAxis dataKey="date" tickFormatter={dateTick} tick={{ fill: '#333' }} axisLine={{ stroke: '#333' }} />
                                <YAxis tickFormatter={currencyTick} tick={{ fill: '#333' }} axisLine={{ stroke: '#333' }} />
                                <Tooltip
                                    formatter={(v) => [`$${Number(v).toFixed(0)}`, 'Revenue']}
                                    labelFormatter={(l) => `Date: ${l}`}
                                />
                                <Legend verticalAlign="top" height={24} wrapperStyle={{ fontSize: 12 }} />
                                <Area type="monotone" dataKey="total" fill="url(#revGradient)" stroke="none" />
                                <Line type="monotone" name="Revenue" dataKey="total" stroke="#d6336c" strokeWidth={2} dot={{ r: 3, fill: '#d6336c' }} activeDot={{ r: 6, fill: '#d6336c' }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

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

