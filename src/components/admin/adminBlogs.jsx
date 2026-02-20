import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

const AdminBlogs = () => {
  const history = useHistory()
  const { fetchPosts, posts, deletePost } = useContext(AppContext)
  const [filtered, setFiltered] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
    ;(async () => { setLoading(true); await fetchPosts(); setLoading(false) })()
  }, [])

  useEffect(() => { setFiltered(posts || []) }, [posts])

  const onSearch = (e) => {
    e.preventDefault()
    if (!q) return setFiltered(posts)
    setFiltered((posts || []).filter(p =>
      (p.title || '').toLowerCase().includes(q.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(q.toLowerCase())
    ))
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return
    await deletePost(id)
    await fetchPosts()
  }

  return (
    <div className="my-2">
      <div className="container-fluid">
        <h1 className="display-4" style={{ fontWeight: 900 }}>Blogs</h1>
        <div className="py-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <form onSubmit={onSearch}>
              <div className="d-flex align-items-center">
                <input value={q} onChange={(e) => setQ(e.target.value)} style={{ borderColor: "black", color: 'black', backgroundColor: "#ffffff" }} type="text" className="form-control" placeholder="Search by title or category" />
                <div className="px-2">
                  <button style={{ cursor: 'pointer', border: 'none', backgroundColor: "#fafafa" }} className='fas fa-search fa-lg'></button>
                </div>
              </div>
            </form>
            <div>
              <Link to='/dashboard/create-post'>
                <button style={{ borderColor: "#F4B92D", color: '#F4B92D' }} className="btn rounded-circle"><i className="fas fa-plus "></i></button>
              </Link>
            </div>
          </div>
          <div>
            {loading ? (
              <div className="py-5 text-center"><div style={{ width: '60px', height: '60px' }} className="spinner-border " role="status"><span className="visually-hidden">Loading...</span></div></div>
            ) : (
              <div className="row g-3">
                {(filtered || []).map((p) => (
                  <div key={p._id} className="col-12">
                    <div className="card border-0 shadow-sm p-2">
                      <div className="d-flex align-items-center gap-3 flex-nowrap">
                        <div className="flex-shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="rounded" style={{ width: '72px', height: '72px', objectFit: 'cover' }} />
                          ) : (
                            <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '72px', height: '72px', background: '#f2f2f2' }}>
                              <i className="fa fa-image text-muted"></i>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1">{p.title || 'Untitled Post'}</h6>
                            <span className="badge" style={{ backgroundColor: '#F4B92D', color: '#fff' }}>{p.category || 'General'}</span>
                          </div>
                          <div className="text-muted small">{new Date(p.date || Date.now()).toLocaleString()}</div>
                        </div>
                        <div className="text-end" style={{ minWidth: '160px' }}>
                          <Link to={`/dashboard/create-post/${p._id}`} className="btn btn-outline-dark btn-sm me-2">Edit</Link>
                          <button onClick={() => onDelete(p._id)} className="btn btn-outline-danger btn-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBlogs

