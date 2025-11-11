import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function ViewCategories() {
    const history = useHistory()
    const { categories, fetchCategories } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (!token) return history.push('/admin')
            ; (async () => { setLoading(true); await fetchCategories(); setLoading(false) })()
    }, [])

    return (
        <div className="my-2">
            <div className="container-fluid ">
                <div className="d-flex  p-3">
                    <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4" style={{ fontWeight: 900 }}>Categories</h1>
                </div>
                {loading ? (
                    <div className="py-5 text-center"><div style={{ width: '60px', height: '60px' }} className="spinner-border " role="status"><span className="visually-hidden">Loading...</span></div></div>
                ) : (
                    <div className="row g-3">
                        {(categories || []).map((c) => (
                            <div key={c._id} className="col-12">
                                <div className="card border-0 shadow-sm p-2">
                                    <div className="d-flex align-items-center gap-3 flex-nowrap">
                                        <div className="flex-shrink-0">
                                            <img src={c.coverImage} alt={c.mainHeading} className="rounded" style={{ width: '72px', height: '72px', objectFit: 'cover' }} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <h6 className="mb-1">{c.mainHeading}</h6>
                                            </div>
                                            <div className="text-muted small">{c.metaTitle}</div>
                                        </div>
                                        <div className="text-end" style={{ minWidth: '110px' }}>
                                            <Link to={`/dashboard/edit-category/${c._id}`} className="btn btn-outline-dark btn-sm">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}


