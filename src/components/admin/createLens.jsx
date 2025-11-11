import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AppContext from '../context/appContext'

const RX_TYPES = ['Distance','Reading','Bifocal with line','Progressive (no line)']
const LENS_TYPES = ['Clear Lenses','Photochromic - Dark in Sun']

export default function CreateLens() {
  const { lensid } = useParams()
  const history = useHistory()
  const { createLens, editLens, fetchLensById, deleteLens } = useContext(AppContext)
  const [form, setForm] = useState({ title: '', description: '', price: '', thickness: '', rxType: RX_TYPES[0], lensType: LENS_TYPES[0] })
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
    ;(async () => {
      if (lensid) {
        const d = await fetchLensById(lensid)
        if (d) setForm({ title: d.title||'', description: d.description||'', price: d.price||'', thickness: d.thickness||'', rxType: d.rxType||RX_TYPES[0], lensType: d.lensType||LENS_TYPES[0] })
      }
    })()
  }, [lensid])
  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price||0), thickness: Number(form.thickness||0) }
    if (lensid) await editLens(lensid, payload)
    else await createLens(payload)
    history.push('/dashboard/eyewear')
  }
  return (
    <div className="container py-3">
      <h1 className="display-6" style={{ fontWeight: 800 }}>{lensid ? 'Edit Lens' : 'Create Lens'}</h1>
      <form className="mt-3" onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} />
        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} />
        <div className="row g-2">
          <div className="col-md-6"><input type="number" className="form-control mb-2" placeholder="Price" value={form.price} onChange={(e)=>setForm({ ...form, price: e.target.value })} /></div>
          <div className="col-md-6"><input type="number" className="form-control mb-2" placeholder="Thickness" value={form.thickness} onChange={(e)=>setForm({ ...form, thickness: e.target.value })} /></div>
        </div>
        <div className="row g-2">
          <div className="col-md-6">
            <select className="form-select mb-2" value={form.rxType} onChange={(e)=>setForm({ ...form, rxType: e.target.value })}>
              {RX_TYPES.map((o)=>(<option key={o} value={o}>{o}</option>))}
            </select>
          </div>
          <div className="col-md-6">
            <select className="form-select mb-2" value={form.lensType} onChange={(e)=>setForm({ ...form, lensType: e.target.value })}>
              {LENS_TYPES.map((o)=>(<option key={o} value={o}>{o}</option>))}
            </select>
          </div>
        </div>
        <div className={`d-flex ${lensid ? 'justify-content-between' : 'justify-content-end'} align-items-center`}>
          {lensid && (
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#lensDeleteModal">Delete</button>
          )}
          <button type="submit" className="btn btn-dark">Save</button>
        </div>
      </form>

      {/* Delete Lens Modal */}
      <div className="modal fade" id="lensDeleteModal" tabIndex="-1" aria-labelledby="lensDeleteLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="lensDeleteLabel">Lens Deletion Warning</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <p>Are you sure you want to completely delete this lens?</p>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                onClick={async () => { await deleteLens(lensid); history.push('/dashboard/eyewear') }}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


