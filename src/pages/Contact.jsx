import React, { useContext, useEffect } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AppContext from '../components/context/appContext'

export default function Contact() {
  const { basicInfo, getBasicInfo } = useContext(AppContext)
  useEffect(() => { if (!basicInfo) getBasicInfo() }, [basicInfo, getBasicInfo])
  const ensureProtocol = (u) => u && /^https?:\/\//i.test(u) ? u : (u ? `https://${String(u).replace(/^\/+/, '')}` : '')
  const email = basicInfo?.email || 'support@glasses4u.example'
  const phone = basicInfo?.phoneNumber || '+1 (555) 123‑4567'
  const fb = ensureProtocol(basicInfo?.facebookProfileLink) || 'https://www.facebook.com/'
  const ig = ensureProtocol(basicInfo?.instagramProfileLink) || 'https://www.instagram.com/'
  return (
    <>
      <Header />
      {/* Hero */}
      <section className="position-relative">
        <div className="w-100" style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}>
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop"
            alt="Contact Glasses 4U"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
        <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
        <div style={{zIndex:30}} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3" style={{ zIndex: 20 }}>
          <h1 className="display-5 fw-bold">We’re Here to Help You See Clearly 👓</h1>
          <p className="lead">Have a question about eyeglasses, prescriptions, orders, or delivery? Need help choosing frames or uploading your prescription? Our support team is always happy to assist.
At Glasses-4U, your satisfaction matters for us and real help is just a message away.
</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 bg-light h-100 p-3">
              <img className="rounded mb-3" alt="support" src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop" style={{ height: 180, width: '100%', objectFit: 'cover' }} />
              <h5>Customer Support</h5>
              <p className="mb-1">Email: {email}</p>
              <p className="mb-1">Phone: {phone}</p>
              <div className="d-flex align-items-center gap-3 mt-2">
                <a className="text-dark" href={ig} target="_blank" rel="noreferrer"><i className="fa fa-instagram" style={{ fontSize: 22 }}></i></a>
                <a className="text-dark" href={fb} target="_blank" rel="noreferrer"><i className="fa fa-facebook-official" style={{ fontSize: 22 }}></i></a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 bg-light h-100 p-3">
              <img className="rounded mb-3" alt="optician" src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200" style={{ height: 180, width: '100%', objectFit: 'cover' }} />
              <h5>Ask an Optician</h5>
              <p>Have prescription questions or need help choosing the right lenses? Our optician guidance makes buying prescription eye glasses online simple and stress-free.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 bg-light h-100 p-3">
              <img className="rounded mb-3" alt="store" src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1200&auto=format&fit=crop" style={{ height: 180, width: '100%', objectFit: 'cover' }} />
              <h5>Our Lab</h5>
              <p>Every pair of eye glasses is crafted and inspected in our lab to ensure accuracy, clarity, and quality you can trust.</p>
            </div>
          </div>
        </div>

        {/* Contact form (dummy) */}
        {/* <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h5 className="card-title">Send us a message</h5>
            <div className="row g-2">
              <div className="col-md-6"><input className="form-control" placeholder="Your name" /></div>
              <div className="col-md-6"><input className="form-control" placeholder="Email" /></div>
              <div className="col-12"><textarea className="form-control" rows="4" placeholder="How can we help?" /></div>
              <div className="col-12"><button className="btn btn-dark">Submit</button></div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  )
}

