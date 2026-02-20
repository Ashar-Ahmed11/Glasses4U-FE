import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AppContext from '../context/appContext'
import JoditEditor from 'jodit-react'

const CreatePost = () => {
  const history = useHistory()
  const { postid } = useParams()
  const { uploadImage, createPost, editPost, fetchPostById } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    metaTitle: '',
    metaDescription: '',
    title: '',
    category: '',
    image: '',
    description: '',
    date: new Date().toISOString(),
  })
  const editorRef = useRef(null)
  const config = useMemo(() => ({ readonly: false, height: 350, theme: 'default' }), [])

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
  }, [])

  useEffect(() => {
    if (!postid) return
    ;(async () => {
      setLoading(true)
      const data = await fetchPostById(postid)
      if (data) {
        setForm({
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          title: data.title || '',
          category: data.category || '',
          image: data.image || '',
          description: data.description || '',
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        })
      }
      setLoading(false)
    })()
  }, [postid, fetchPostById])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, image: url }))
    } finally {
      setLoading(false)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (postid) await editPost(postid, form)
      else await createPost(form)
      history.push('/dashboard/blogs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">{postid ? 'Edit Post' : 'Create Post'}</h1>
      </div>
      <form onSubmit={onSubmit} className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Meta Title</label>
              <input name="metaTitle" value={form.metaTitle} onChange={onChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Meta Description</label>
              <input name="metaDescription" value={form.metaDescription} onChange={onChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input name="title" value={form.title} onChange={onChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <input name="category" value={form.category} onChange={onChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image</label>
              <div className="input-group">
                <input name="image" value={form.image} onChange={onChange} className="form-control" placeholder="https://..." />
                <label className="btn btn-outline-dark mb-0">
                  Upload <input type="file" accept="image/*" className="d-none" onChange={onUpload} />
                </label>
              </div>
              {form.image && <img src={form.image} alt="cover" className="img-fluid mt-2 rounded" style={{ maxHeight: 160, objectFit: 'cover' }} />}
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="datetime-local" name="date" value={form.date.slice(0, 16)} onChange={(e) => setForm({ ...form, date: new Date(e.target.value).toISOString() })} className="form-control" />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <JoditEditor ref={editorRef} value={form.description} config={config} onBlur={(newContent) => setForm({ ...form, description: newContent })} />
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end gap-2">
          <button type="button" onClick={() => history.push('/dashboard/blogs')} className="btn btn-outline-secondary">Cancel</button>
          <button type="submit" className="btn btn-dark" disabled={loading}>{loading ? 'Saving...' : (postid ? 'Update' : 'Create')}</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost

