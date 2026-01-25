import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Terms() {
  return (
    <>
      <Header />
      {/* Hero */}
      <section className="position-relative">
        <div className="w-100" style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}>
          <img
            src="https://images.pexels.com/photos/3183181/pexels-photo-3183181.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Terms"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
        <div style={{zIndex:30}} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-5 fw-bold">Terms & Conditions</h1>
          <p className="lead">Plain‑English policies for a smooth shopping experience.</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Orders & Prescriptions</h5>
              <p>Custom lenses are made to the prescription you provide. Please double‑check SPH, CYL, Axis, and PD measurements before submitting.</p>
              <img className="rounded" alt="prescription" src="https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=1200&auto=format&fit=crop" style={{ height: 200, width: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Returns & Exchanges</h5>
              <p>Frames can be returned within 14 days in original condition. Custom lenses are non‑returnable, but we’ll work with you to make things right.</p>
              <img className="rounded" alt="returns" src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" style={{ height: 200, width: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Warranty</h5>
              <p>Your frames are covered by a 1‑year manufacturing warranty. Coatings are warrantied against defects.</p>
              <img className="rounded" alt="warranty" src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Privacy</h5>
              <p>We respect your privacy and protect your data. We do not sell personal information to third parties.</p>
              <img className="rounded" alt="privacy" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

