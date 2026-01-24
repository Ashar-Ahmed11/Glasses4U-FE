import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function UserRegister() {
  const { userRegister, adminLoading } = useContext(AppContext)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) return alert('Passwords do not match')
    const ok = await userRegister({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password })
    if (ok) history.push('/account')
  }
  const color = "#f49da9"
  return (
    <div className='my-5'>
      <div className="pt-5">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column pt-5">
            <div className="card  shadow" style={{ width: '400px', backgroundColor: "#fff" }}>
              <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center p-3" style={{ fontWeight: 900 }}>Register</h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3 mx-3">
                  <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="text" className="form-control my-2" placeholder="First Name" />
                  <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="text" className="form-control my-2" placeholder="Last Name" />
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="email" className="form-control my-2" placeholder="Email" />
                  <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="password" className="form-control my-2" placeholder="Password" />
                  <input value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="password" className="form-control my-2" placeholder="Confirm Password" />
                </div>
                <div className="d-flex flex-column align-items-center gap-2 mt-2 mb-3">
                  <button type='submit' className="btn d-flex align-items-center gap-2" disabled={adminLoading} style={{ color: color, borderColor: color, backgroundColor: '#fff' }}>
                    {adminLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    {adminLoading ? 'Registering...' : 'Register'}
                  </button>
                  <div className="text-center px-3 pb-3">
                    <span className="text-muted">Already have an account? <Link to="/login">Login</Link>.</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
