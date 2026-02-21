import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Coverimg from '../images/help center.png'
import MetaDecorator from '../components/metaDecorator'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const HelpCenter = () => {
    const sections = [
  {
    title: "ORDERING GUIDE",
    link:'/ordering-guide',
    description:
      "Get all the info you need to place an order; be it frame size, prescription details or just the order process, this guide has them all.",
  },
//   {
//     title: "EYEGLASSES SIZING INFO",
//     description:
//       "Wondering about the size that of the frame you need? Visit this section for all the info you want to know about the frame size.",
//   },
  {
    title: "HOW TO MEASURE PD",
    link:"/pupil-distance",
    description:
      "Don't have the PD listed on your prescription? Not to worry about it. You can measure it yourself following this simple process.",
  },
//   {
//     title: "FRIENDLY RETURN POLICY",
//     description:
//       "Not satified with the received glasses? View our complete customer friendly return policy here.",
//   },
  {
    title: "SHIPPING POLICY",
    link:"/shipping-policy",
    description:
      "Here is all the information about our Shipping procedure that you wanted to know.",
  },
  {
    title: "FREQUENTLY ASKED QUESTIONS",
    link:"/faqs",
    description:
      "You can find answers to the most frequently asked questions here.",
  },
  {
    title: "TERMS AND CONDITIONS",
    link: "/terms",
    description:
      "Read all the Terms & Conditions here and data security details, which ensures that your data is secure with us.",
  },
];
  return (
     <>
      <Header />
      <MetaDecorator title="Help Center | Glasses 4U" description="Guides for ordering, measuring PD, shipping policy, FAQs, and terms." />

      {/* Hero */}
      

      <section className="position-relative">
        <div className="w-100" style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}>
          <img
            src={Coverimg}
            alt="About Glasses 4U"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
        <div style={{zIndex:30}} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-4 fw-bold">Help Center</h1>
          {/* <p className="lead">Crafting prescription eyewear designed for comfort, clarity, and modern style.
 At Glasses 4U, we believe great vision should be easy, affordable, and effortless. That’s why we create high-quality prescription eyewear that helps you see clearly and feel confident every single day.
</p> */}
        </div>
      </section>

<>
      <style>{`
        body {
          background-color: #f5f6f7;
        }
        .section-title {
          color: #29b8cc;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          cursor: pointer;
        }
        .section-title:hover {
          color: #1d9ab0;
          text-decoration: underline;
        }
        .section-desc {
          color: #4a5568;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .guide-section {
          border-bottom: 1px solid #e2e8f0;
        }
        .guide-section:last-child {
          border-bottom: none;
        }
      `}</style>

      <div className=" py-5" style={{ backgroundColor: "#f5f6f7" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9 col-12">
              {sections.map((section, index) => (
                <div key={index} className="guide-section py-4">
                  <Link to={section.link} className="section-title d-block mb-2">
                    {section.title}
                  </Link>
                  <p className="section-desc mb-0">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>





      

      {/* Story */}
      {/* <div className="container py-5">
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
        </div> */}

        {/* Values */}
        {/* <div className="row g-4 mt-4">
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
      </div> */}
      <Footer />
    </>
  )
}

export default HelpCenter
