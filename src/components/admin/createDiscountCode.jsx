import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function CreateDiscountCode() {
  const history = useHistory()
  const { id } = useParams()
  const { fetchDiscountCodeById, createDiscountCode, editDiscountCode } = useContext(AppContext)
  const [form, setForm] = useState({ discountCodeName: '', discountPercentage: '' })
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) return history.push('/admin')
    ;(async () => {
      if (id) {
        const d = await fetchDiscountCodeById(id)
        if (d) setForm({ discountCodeName: d.discountCodeName || '', discountPercentage: d.discountPercentage ?? '' })
      }
    })()
  }, [id])
  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { discountCodeName: String(form.discountCodeName || '').trim(), discountPercentage: Number(form.discountPercentage || 0) }
    if (id) await editDiscountCode(id, payload)
    else await createDiscountCode(payload)
    history.push('/dashboard/discount-codes')
  }
  return (
    <div className="container py-3">
      <h1 className="display-6" style={{ fontWeight: 800 }}>{id ? 'Edit Discount Code' : 'Create Discount Code'}</h1>
      <form className="mt-3" onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Code (e.g. SAVE10)" value={form.discountCodeName} onChange={(e)=>setForm({ ...form, discountCodeName: e.target.value })} />
        <input type="number" className="form-control mb-2" placeholder="Discount Percentage (e.g. 10)" value={form.discountPercentage} onChange={(e)=>setForm({ ...form, discountPercentage: e.target.value })} />
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-dark">Save</button>
        </div>
      </form>
    </div>
  )
}

