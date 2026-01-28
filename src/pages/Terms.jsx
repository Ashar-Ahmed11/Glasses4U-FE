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
          <p className="lead">Custom lenses are made according to the prescription you provide. Please double‑check your SPH, CYL, Axis, and PD measurements before submitting to avoid errors.</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Orders & Prescriptions</h5>
              <p>It’s your responsibility to ensure your prescription is current and accurate. We cannot be held liable for issues caused by incorrect prescriptions.
</p>
              <img className="rounded" alt="prescription" src="http://res.cloudinary.com/dyytzksdp/image/upload/v1769628032/txsqp22cu41zegjox0ld.png?q=80&w=1200&auto=format&fit=crop" style={{ height: 200, width: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Returns & Exchanges</h5>
              <p>Frames can be returned within 14 days in their original condition. Custom lenses are non‑returnable, but we’ll work with you to resolve any issues.</p>
              <img className="rounded" alt="returns" src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" style={{ height: 200, width: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Warranty</h5>
              <p>All frames come with a 1‑year manufacturing warranty. Coatings are covered against defects for the same period.</p>
              <img className="rounded" alt="warranty" src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100 p-3">
              <h5>Privacy</h5>
              <p>We respect your privacy and safeguard your personal information. We never sell or share your data with third parties.</p>
              <img className="rounded" alt="privacy" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

