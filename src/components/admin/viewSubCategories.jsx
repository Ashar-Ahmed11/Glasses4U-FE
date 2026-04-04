import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function ViewSubCategories() {
  const history = useHistory()
  const { fetchSubCategories } = useContext(AppContext)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchSubCategories()
        setList(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    })()
    // Intentionally run once on mount (fetch function identity is unstable via context)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="my-2">
      <div className="container-fluid ">
        <div className="d-flex  p-3">
          <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4" style={{ fontWeight: 900 }}>Subcategories</h1>
        </div>
        {loading ? (
          <div className="py-5 text-center"><div style={{ width: '60px', height: '60px' }} className="spinner-border " role="status"><span className="visually-hidden">Loading...</span></div></div>
        ) : (
          <div className="row g-3">
            {(list || []).map((s) => (
              <div key={s._id} className="col-12">
                <div className="card border-0 shadow-sm p-2">
                  <div className="d-flex align-items-center gap-3 flex-nowrap">
                    <div className="flex-shrink-0">
                      <img src={s.coverImage} alt={s.mainHeading} className="rounded" style={{ width: '72px', height: '72px', objectFit: 'cover' }} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="mb-1">{s.mainHeading}</h6>
                      </div>
                      <div className="text-muted small">{s.metaTitle}</div>
                      <div className="text-muted small">Category: {s.categoryId?.mainHeading || '-'}</div>
                    </div>
                    <div className="text-end" style={{ minWidth: '110px' }}>
                      <Link to={`/dashboard/edit-subcategory/${s._id}`} className="btn btn-outline-dark btn-sm">Edit</Link>
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

