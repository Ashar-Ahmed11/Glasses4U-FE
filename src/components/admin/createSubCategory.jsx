import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import JoditEditor from 'jodit-react'
import ImageAdjuster from './imageAdjuster'
import AppContext from '../context/appContext'

export default function CreateSubCategory() {
  const { subcatid } = useParams()
  const history = useHistory()
  const openCoverModal = useRef(null)
  const { categories, fetchCategories, createSubCategory, fetchSubCategoryById, editSubCategory, deleteSubCategory } = useContext(AppContext)
  const [form, setForm] = useState({ categoryId: '', mainHeading: '', metaTitle: '', metaDescription: '' })
  const [coverImage, setCoverImage] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => { fetchCategories() }, []) // for dropdown
  useEffect(() => {
    if (subcatid) (async () => {
      const sc = await fetchSubCategoryById(subcatid)
      if (sc) {
        setForm({
          categoryId: sc.categoryId?._id || sc.categoryId || '',
          mainHeading: sc.mainHeading || '',
          metaTitle: sc.metaTitle || '',
          metaDescription: sc.metaDescription || '',
        })
        setCoverImage(sc.coverImage || '')
        setDescription(sc.categoryDescription || '')
      }
    })()
  }, [subcatid, fetchSubCategoryById])

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, coverImage, categoryDescription: description }
    if (subcatid) await editSubCategory(subcatid, payload)
    else await createSubCategory(payload)
    history.push('/dashboard/subcategories')
  }

  const token = localStorage.getItem('auth-token')
  if (!token) history.push('/admin')

  return (
    <div>
      <div className="p-3">
        <h1 className="display-4" style={{ fontWeight: 900 }}>{subcatid ? 'Edit Subcategory' : 'Create Subcategory'}</h1>
      </div>
      <div className="container">
        <form>
          <div className="row g-2">
            <div className="col-md-6">
              <label className="form-label">Parent Category</label>
              <select
                className="form-select"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                disabled={!!subcatid}
              >
                <option value="">Select Category</option>
                {(categories || []).map((c) => (
                  <option key={c._id} value={c._id}>{c.mainHeading}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Subcategory Name</label>
              <input value={form.mainHeading} onChange={(e) => setForm({ ...form, mainHeading: e.target.value })} type="text" placeholder="Subcategory Name" className="form-control" disabled={!!subcatid} />
            </div>
          </div>
          <div className="my-2">
            <label className="form-label">Cover Image</label><br />
            {coverImage ? (
              <div className="position-relative d-inline-block">
                <img src={coverImage} alt="cover" className="img-fluid border rounded-3" style={{ maxHeight: 180 }} />
                <button type="button" className="btn btn-sm btn-danger position-absolute" style={{ top: 5, right: 5 }} onClick={() => setCoverImage('')}>Remove</button>
              </div>
            ) : (
              <button onClick={(e) => { e.preventDefault(); openCoverModal.current.click() }} className="btn btn-outline-secondary">Upload Cover</button>
            )}
          </div>
          <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} type="text" placeholder="Meta Title" className="form-control my-2" />
          <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} placeholder="Meta Description" className="form-control my-2" />
          <div className="my-2">
            <label className="form-label">Subcategory Description</label>
            <JoditEditor value={description} onBlur={(val) => setDescription(val)} />
          </div>
          <div className={`d-flex ${subcatid ? 'justify-content-between' : 'justify-content-end'} align-items-center my-3`}>
            {subcatid && (
              <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#subcatDeleteModal">Delete</button>
            )}
            <button disabled={!form.categoryId || !form.mainHeading} onClick={submit} className="btn my-2 border border-1 shadow-sm">{subcatid ? 'Edit Subcategory' : 'Create Subcategory'}</button>
          </div>
        </form>
      </div>
      <button ref={openCoverModal} hidden={true} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subcatCoverModal">Launch</button>
      <div className="modal fade" id="subcatCoverModal" tabIndex="-1" aria-labelledby="subcatCoverLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="subcatCoverLabel">Upload Cover</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ImageAdjuster modalId="subcatCoverModal" onUploaded={(url) => setCoverImage(url)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade " id="subcatDeleteModal" tabIndex="-1" aria-labelledby="subcatDeleteLabel" aria-hidden="true">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="subcatDeleteLabel">Subcategory Deletion Warning</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <p>Are you sure you want to completely delete this subcategory?</p>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button onClick={() => { deleteSubCategory(subcatid); history.push('/dashboard/subcategories') }} data-bs-dismiss="modal" type="button" className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

