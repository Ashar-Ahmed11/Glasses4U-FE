import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

export default function BasicInfo() {
  const history = useHistory()
  const { basicInfo, setBasicInfo, getBasicInfo, editBasicInfo, uploadImage } = useContext(AppContext)

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
            <label htmlFor="metaTitle" className="form-label">Meta Title</label>
            <input id="metaTitle" value={basicInfo?.metaTitle || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, metaTitle: value })} style={{ color: color }} type="text" placeholder='Meta Title' className="form-control my-2" />
            <label htmlFor="metaDescription" className="form-label">Meta Description</label>
            <textarea id="metaDescription" value={basicInfo?.metaDescription || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, metaDescription: value })} style={{ color: color }} placeholder='Meta Description' className="form-control my-2" />
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input id="phoneNumber" value={basicInfo?.phoneNumber || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, phoneNumber: value })} style={{ color: color }} type="text" placeholder='Phone Number' className="form-control my-2" />
            <label htmlFor="deliveryCharges" className="form-label">Delivery Charges</label>
            <input id="deliveryCharges" value={basicInfo?.deliveryCharges ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, deliveryCharges: Number(value) })} style={{ color: color }} type="number" placeholder='Delivery Charges' className="form-control my-2" />

            <label htmlFor="standardCoatingPrice" className="form-label">Standard Coating Price</label>
            <input id="standardCoatingPrice" value={basicInfo?.standardCoatingPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, standardCoatingPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Standard Coating Price' className="form-control my-2" />
            <label htmlFor="standardCoatingSalePrice" className="form-label">Standard Coating Sale Price (optional)</label>
            <input id="standardCoatingSalePrice" value={basicInfo?.standardCoatingSalePrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, standardCoatingSalePrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Standard Coating Sale Price' className="form-control my-2" />
            <label className="form-label">Standard Coating Image</label>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.standardCoatingImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, standardCoatingImage: value })} />
              <label className="btn btn-outline-dark mb-0">
                Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, standardCoatingImage: url }) }} />
              </label>
            </div>
            {basicInfo?.standardCoatingImage ? <img src={basicInfo.standardCoatingImage} alt="standard" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
            <label htmlFor="premiumCoatingPrice" className="form-label">Premium Coating Price</label>
            <input id="premiumCoatingPrice" value={basicInfo?.premiumCoatingPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, premiumCoatingPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Premium Coating Price' className="form-control my-2" />
            <label htmlFor="premiumCoatingSalePrice" className="form-label">Premium Coating Sale Price (optional)</label>
            <input id="premiumCoatingSalePrice" value={basicInfo?.premiumCoatingSalePrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, premiumCoatingSalePrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Premium Coating Sale Price' className="form-control my-2" />
            <label className="form-label">Premium Coating Image</label>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.premiumCoatingImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, premiumCoatingImage: value })} />
              <label className="btn btn-outline-dark mb-0">
                Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, premiumCoatingImage: url }) }} />
              </label>
            </div>
            {basicInfo?.premiumCoatingImage ? <img src={basicInfo.premiumCoatingImage} alt="premium" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
            <label htmlFor="bluecutCoatingPrice" className="form-label">Blue Cut Coating Price</label>
            <input id="bluecutCoatingPrice" value={basicInfo?.bluecutCoatingPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, bluecutCoatingPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Blue Cut Coating Price' className="form-control my-2" />
            <label htmlFor="bluecutCoatingSalePrice" className="form-label">Blue Cut Sale Price (optional)</label>
            <input id="bluecutCoatingSalePrice" value={basicInfo?.bluecutCoatingSalePrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, bluecutCoatingSalePrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Blue Cut Sale Price' className="form-control my-2" />
            <label className="form-label">Blue Cut Image</label>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.bluecutCoatingImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, bluecutCoatingImage: value })} />
              <label className="btn btn-outline-dark mb-0">
                Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, bluecutCoatingImage: url }) }} />
              </label>
            </div>
            {basicInfo?.bluecutCoatingImage ? <img src={basicInfo.bluecutCoatingImage} alt="bluecut" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="solidTintPrice" className="form-label">Solid Tint Price</label>
                <input id="solidTintPrice" value={basicInfo?.solidTintPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, solidTintPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Solid Tint Price' className="form-control my-2" />
              </div>
              <div className="col-md-6">
                <label htmlFor="gradientTintPrice" className="form-label">Gradient Tint Price</label>
                <input id="gradientTintPrice" value={basicInfo?.gradientTintPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, gradientTintPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Gradient Tint Price' className="form-control my-2" />
              </div>
              <div className="col-md-6">
                <label htmlFor="mirrorTintPrice" className="form-label">Mirror Tint Price</label>
                <input id="mirrorTintPrice" value={basicInfo?.mirrorTintPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, mirrorTintPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Mirror Tint Price' className="form-control my-2" />
              </div>
              <div className="col-md-6">
                <label htmlFor="dualTintPrice" className="form-label">Dual Tint Price</label>
                <input id="dualTintPrice" value={basicInfo?.dualTintPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, dualTintPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Dual Tint Price' className="form-control my-2" />
              </div>
              <div className="col-md-6">
                <label htmlFor="polarizedMirrorTintPrice" className="form-label">Polarized Mirror Tint Price</label>
                <input id="polarizedMirrorTintPrice" value={basicInfo?.polarizedMirrorTintPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, polarizedMirrorTintPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Polarized Mirror Tint Price' className="form-control my-2" />
              </div>
              <div className="col-md-6">
                <label htmlFor="polarizedTintPrice" className="form-label">Polarized Tint Price</label>
                <input id="polarizedTintPrice" value={basicInfo?.polarizedTintPrice ?? ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, polarizedTintPrice: Number(value) })} style={{ color: color }} type="number" step="0.01" placeholder='Polarized Tint Price' className="form-control my-2" />
              </div>

            </div>
            
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" value={basicInfo?.email || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, email: value })} style={{ color: color }} type="email" placeholder='Email' className="form-control my-2" />
            <label htmlFor="officeAddress" className="form-label">Office Address</label>
            <input id="officeAddress" value={basicInfo?.officeAddress || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, officeAddress: value })} style={{ color: color }} type="text" placeholder='Office Address' className="form-control my-2" />
            <label htmlFor="footerDescription" className="form-label">Footer Description</label>
            <textarea id="footerDescription" value={basicInfo?.footerDescription || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, footerDescription: value })} style={{ color: color }} placeholder='Footer Description' className="form-control my-2" />

            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Clear Lenses Image</label>
                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.clearLensesImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, clearLensesImage: value })} />
                  <label className="btn btn-outline-dark mb-0">
                    Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, clearLensesImage: url }) }} />
                  </label>
                </div>
                {basicInfo?.clearLensesImage ? <img src={basicInfo.clearLensesImage} alt="clear" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
              </div>
              <div className="col-md-4">
                <label className="form-label">Photochromic Lenses Image</label>
                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.photochromicLensesImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, photochromicLensesImage: value })} />
                  <label className="btn btn-outline-dark mb-0">
                    Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, photochromicLensesImage: url }) }} />
                  </label>
                </div>
                {basicInfo?.photochromicLensesImage ? <img src={basicInfo.photochromicLensesImage} alt="photochromic" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
              </div>
              <div className="col-md-4">
                <label className="form-label">Sunglasses Image</label>
                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.sunglassesImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, sunglassesImage: value })} />
                  <label className="btn btn-outline-dark mb-0">
                    Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, sunglassesImage: url }) }} />
                  </label>
                </div>
                {basicInfo?.sunglassesImage ? <img src={basicInfo.sunglassesImage} alt="sunglasses" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
              </div>
            </div>

            <label className="form-label">No Coatings Image</label>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Image URL (optional)" value={basicInfo?.noCoatingsImage || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, noCoatingsImage: value })} />
              <label className="btn btn-outline-dark mb-0">
                Upload <input type="file" accept="image/*" className="d-none" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=await uploadImage(f); setBasicInfo({ ...basicInfo, noCoatingsImage: url }) }} />
              </label>
            </div>
            {basicInfo?.noCoatingsImage ? <img src={basicInfo.noCoatingsImage} alt="no-coatings" className="img-fluid rounded mb-2 d-block" style={{ maxHeight: 120, objectFit: 'cover' }} /> : null}
            <label htmlFor="facebookProfileLink" className="form-label">Facebook Profile Link</label>
            <input id="facebookProfileLink" value={basicInfo?.facebookProfileLink || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, facebookProfileLink: value })} style={{ color: color }} type="url" placeholder='Facebook Profile Link' className="form-control my-2" />
            <label htmlFor="instagramProfileLink" className="form-label">Instagram Profile Link</label>
            <input id="instagramProfileLink" value={basicInfo?.instagramProfileLink || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, instagramProfileLink: value })} style={{ color: color }} type="url" placeholder='Instagram Profile Link' className="form-control my-2" />
            <label htmlFor="twitterProfileLink" className="form-label">Twitter Profile Link</label>
            <input id="twitterProfileLink" value={basicInfo?.twitterProfileLink || ''} onChange={({ target: { value } }) => setBasicInfo({ ...basicInfo, twitterProfileLink: value })} style={{ color: color }} type="url" placeholder='Twitter Profile Link' className="form-control my-2" />
            <div className="d-flex justify-content-end my-3">
              <button onClick={(e) => { e.preventDefault(); editBasicInfo() }} style={{ color: color }} className="btn my-2 border border-1 shadow-sm">Edit Information</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}