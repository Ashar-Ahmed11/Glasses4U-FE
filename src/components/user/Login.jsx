import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function UserLogin() {
  const { userLogin, adminLoading } = useContext(AppContext)
  const [form, setForm] = useState({ email: '', password: '' })
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    const ok = await userLogin(form)
    if (ok) history.push('/account')
  }
  const color = "#f49da9"
  return (
    <div className='my-5'>
      <div className="pt-5">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column pt-5">
            <div className="card  shadow" style={{ width: '400px', backgroundColor: "#fff" }}>
              <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center p-3" style={{ fontWeight: 900 }}>User Login</h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3 mx-3">
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="email" className="form-control my-2" placeholder="Email" />
                  <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="d-flex flex-column align-items-center gap-2 mt-2 mb-3">
                  <button type='submit' className="btn d-flex align-items-center gap-2" disabled={adminLoading} style={{ color: color, borderColor: color, backgroundColor: '#fff' }}>
                    {adminLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    {adminLoading ? 'Logging in...' : 'Login'}
                  </button>
                  <div className="text-center px-3 pb-3">
                    <span className="text-muted">If you don't have account so <Link to="/register">click here for registeration</Link>.</span>
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
