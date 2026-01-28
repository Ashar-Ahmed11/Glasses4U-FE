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
            src="http://res.cloudinary.com/dyytzksdp/image/upload/v1769627281/dpms4eeso2prubovpxpd.png?q=80&w=1600&auto=format&fit=crop"
            alt="About Glasses 4U"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
        <div style={{zIndex:30}} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-4 fw-bold">Clear Vision. Confident Style. </h1>
          <p className="lead">Crafting prescription eyewear designed for comfort, clarity, and modern style.
 At Glasses 4U, we believe great vision should be easy, affordable, and effortless. That’s why we create high-quality prescription eyewear that helps you see clearly and feel confident every single day.
</p>
        </div>
      </section>

      {/* Story */}
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Our Story</h2>
            <p>
              Glasses 4U was created with one simple goal: make premium eyewear accessible to everyone.
Traditional optical stores add layers of markup that drive prices up. We decided to do things differently. By working with our in-house lab and carefully curated frame collections, we’re able to deliver expertly crafted lenses and stylish frames without the inflated costs.
From your prescription to your doorstep, every step is handled with care and transparency.

            </p>

            <h3 className="fw-bold mb-3">What Sets Us Apart</h3>
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
            { title: 'Fair Prices', img: 'http://res.cloudinary.com/dyytzksdp/image/upload/v1769627669/uajwvhro6ytx1e5shtei.png?q=80&w=1200&auto=format&fit=crop', text: 'Direct‑to‑you pricing with no middlemen.' },
            { title: 'Happy Eyes', img: 'http://res.cloudinary.com/dyytzksdp/image/upload/v1769627672/s9kslfq60zpfvdrk8tyt.png?q=80&w=1200&auto=format&fit=crop', text: 'Comfortable fits and friendly support.' },
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

