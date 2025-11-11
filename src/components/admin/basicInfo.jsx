import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function BasicInfo() {
  const history = useHistory()
  const { basicInfo, setBasicInfo, getBasicInfo, editBasicInfo } = useContext(AppContext)

  useEffect(() => { getBasicInfo() }, [])

  const token = localStorage.getItem('auth-token')
  if (!token) history.push('/admin')

  const color = "black"
  return (
    <div>
      <div >
        <div className="d-flex  p-3">
        <h1 data-aos="fade-up" data-aos-duration="1000" className="display-4" style={{ fontWeight: 900 }}>Basic Information</h1>
        </div>
        <div className="container">
          <form>
            <input value={basicInfo?.metaTitle || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, metaTitle: value })} style={{ color: color}} type="text" placeholder='Meta Title' className="form-control my-2" />
            <textarea value={basicInfo?.metaDescription || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, metaDescription: value })} style={{ color: color}} placeholder='Meta Description' className="form-control my-2" />
            <input value={basicInfo?.phoneNumber || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, phoneNumber: value })} style={{ color: color}} type="text" placeholder='Phone Number' className="form-control my-2" />
            <input value={basicInfo?.deliveryCharges ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, deliveryCharges: Number(value) })} style={{ color: color}} type="number" placeholder='Delivery Charges' className="form-control my-2" />
            <input value={basicInfo?.email || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, email: value })} style={{ color: color}} type="email" placeholder='Email' className="form-control my-2" />
            <input value={basicInfo?.officeAddress || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, officeAddress: value })} style={{ color: color}} type="text" placeholder='Office Address' className="form-control my-2" />
            <textarea value={basicInfo?.footerDescription || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, footerDescription: value })} style={{ color: color}} placeholder='Footer Description' className="form-control my-2" />
            <input value={basicInfo?.facebookProfileLink || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, facebookProfileLink: value })} style={{ color: color}} type="url" placeholder='Facebook Profile Link' className="form-control my-2" />
            <input value={basicInfo?.instagramProfileLink || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, instagramProfileLink: value })} style={{ color: color}} type="url" placeholder='Instagram Profile Link' className="form-control my-2" />
            <input value={basicInfo?.twitterProfileLink || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, twitterProfileLink: value })} style={{ color: color}} type="url" placeholder='Twitter Profile Link' className="form-control my-2" />
            <div className="d-flex justify-content-end my-3">
              <button onClick={(e) => { e.preventDefault(); editBasicInfo() }} style={ {color: color }} className="btn my-2 border border-1 shadow-sm">Edit Information</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}