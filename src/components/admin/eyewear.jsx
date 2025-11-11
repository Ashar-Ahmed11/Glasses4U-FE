import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function Eyewear() {
  const history = useHistory()
  const { lenses, fetchLenses } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
    ;(async () => { setLoading(true); await fetchLenses(); setLoading(false) })()
  }, [])
  return (
    <div className="my-2">
      <div className="container-fluid ">
        <div className="d-flex p-3 align-items-center justify-content-between">
          <h1 className="display-6 m-0" style={{ fontWeight: 800 }}>Eyewear</h1>
          <button onClick={() => history.push('/dashboard/create-lens')} className="btn btn-dark">
            <i className="fa fa-plus me-2"></i> New Lens
          </button>
        </div>
        {loading ? (
          <div className="py-5 text-center"><div style={{ width: 60, height: 60 }} className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
        ) : (
          <div className="row g-3">
            {(lenses || []).map((l) => (
              <div key={l._id} className="col-12">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="mb-1">{l.title}</h6>
                      <div className="text-muted small">{l.rxType} • {l.lensType} • ${Number(l.price || 0).toFixed(2)}</div>
                    </div>
                    <div className="d-flex gap-2">
                      <Link to={`/dashboard/create-lens/${l._id}`} className="btn btn-outline-dark btn-sm">Edit</Link>
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


