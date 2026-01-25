import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function About() {
  return (
    <>
      <Header />
      {/* Hero */}
      <section className="position-relative">
        <div className="w-100" style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}>
          <img
            src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1600&auto=format&fit=crop"
            alt="About Glasses 4U"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
        <div style={{zIndex:30}} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-4 fw-bold">See Better. Live Brighter.</h1>
          <p className="lead">Crafting prescription eyewear with comfort, clarity, and style.</p>
        </div>
      </section>

      {/* Story */}
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Our Story</h2>
            <p>
              We started Glasses 4U to make premium eyewear accessible. Our in‑house lab
              and curated frames let us deliver exceptional lenses without the markup.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2"><i className="fa fa-check text-success me-2" /> Precision‑cut lenses</li>
              <li className="mb-2"><i className="fa fa-check text-success me-2" /> Comfortable, durable frames</li>
              <li className="mb-2"><i className="fa fa-check text-success me-2" /> Friendly support by opticians</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1400&auto=format&fit=crop"
              alt="Lab"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        {/* Values */}
        <div className="row g-4 mt-4">
          {[
            { title: 'Quality Lenses', img: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=1200', text: 'Clear optics with scratch‑resistant coatings.' },
            { title: 'Fair Prices', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop', text: 'Direct‑to‑you pricing with no middlemen.' },
            { title: 'Happy Eyes', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop', text: 'Comfortable fits and friendly support.' },
          ].map((c, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 h-100 shadow-sm">
                <img src={c.img} alt={c.title} className="card-img-top" style={{ height: 220, objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">{c.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

