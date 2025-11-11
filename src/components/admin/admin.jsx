import React from 'react'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function Admin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const { adminLogin, adminLoading, adminToken } = useContext(AppContext)
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    const ok = await adminLogin(credentials)
    if (ok) history.push('/dashboard')
  }

  if (adminToken) {
    history.push('/dashboard')
  }

  const color = "#f49da9"
  return (
    <div className='my-5'>
      <div className="pt-5">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column pt-5">
            <div className="card  shadow" style={{ width: '400px', backgroundColor: "#fff" }}>
              <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center p-3" style={{ fontWeight: 900 }}>Admin Panel</h1>

              <form onSubmit={onSubmit}>
                <div className="mb-3 mx-3">
                  <input value={credentials.username} onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="text" className="form-control my-2" placeholder="Username" />
                  <input value={credentials.password} onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} style={{ color: color, backgroundColor: '#fff', borderColor: color }} type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="d-flex justify-content-center mt-2 mb-4">
                  <button type='submit' className="btn d-flex align-items-center gap-2" disabled={adminLoading} style={{ color: color, borderColor: color, backgroundColor: '#fff' }}>
                    {adminLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    {adminLoading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}