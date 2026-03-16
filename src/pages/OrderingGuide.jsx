import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MetaDecorator from '../components/metaDecorator'
import Coverimg from '../images/odering guide.png'
import SS1 from '../images/1stSS.png'
import SS2 from '../images/2ndSS.png'
import SS3 from '../images/3rdSS.png'
import SS4 from '../images/4thSS.png'
import SS5 from '../images/5thSS.png'
import SS6 from '../images/6thSS.png'

const OrderingGuide = () => {
  return (
    <>
    <Header />
    <MetaDecorator title="Ordering Guide | Glasses 4U" description="Step-by-step guide to order prescription eyewear online with confidence." />
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
              <h1 className="display-4 fw-bold">Ordering Guide</h1>
              {/* <p className="lead">Crafting prescription eyewear designed for comfort, clarity, and modern style.
     At Glasses 4U, we believe great vision should be easy, affordable, and effortless. That’s why we create high-quality prescription eyewear that helps you see clearly and feel confident every single day.
    </p> */}
            </div>
          </section>


           <div className="container py-5">
  <div className="row justify-content-center">
    <div className="col-12 col-lg-8 col-md-10">

      <h2 className="fw-bold mb-2 text-center text-md-start">
        How to Order Your Eye Glasses from Glasses 4U
      </h2>

      <p className="text-muted mb-2" style={{ lineHeight: '1.8' }}>
        At Glasses For You, buying stylish and affordable eye glasses online is quick, simple, and stress-free. No long waits at an eye glass store near me or overpriced frames at an eye glass world outlet. Just smart shopping, better prices, and frames you’ll love — delivered to your door.
      </p>

      <p className="text-muted mb-4">
        Ordering your cheap eye glasses takes just 4 easy steps.
      </p>

      <h2 className="mt-4">1 Use Smart Filters to Find Your Perfect Frame</h2>

      <img
        src={SS1}
        alt=""
        className="img-fluid w-100 rounded my-3"
        style={{ maxWidth: "100%", height: "auto", border: "2px solid #b5b5b5" }}
      />

      <p className="text-muted my-2">
        Skip endless scrolling. Our advanced web filters help you quickly narrow down the best eye glasses frames cheap and premium styles in seconds.
      </p>

      <p className="text-muted my-2">Filter by:</p>
      <p className="text-muted my-2"><strong>Frame Style:</strong> Browline, Square, Pilot, Round, and trendy cat eye glasses</p>
      <p className="text-muted my-2"><strong>Material:</strong> Plastic, Metal, or Combination</p>
      <p className="text-muted my-2"><strong>Type:</strong> Full Rim, Half Rim, or Rimless</p>
      <p className="text-muted my-2"><strong>Shape:</strong> Oval, Rectangular, Round, Square</p>
      <p className="text-muted my-2"><strong>Color:</strong> Black, Red, Green, White & more</p>

      <p className="text-muted mb-4">
        Whether you’re searching for bold fashion frames or classic everyday eye glasses, we make it easy to find the right match — without leaving home.
      </p>

      <h2 className="fw-bold mb-2 mt-4">📏 Find the Right Size for a Perfect Fit</h2>

      <img
        src={SS2}
        alt=""
        className="img-fluid w-100 rounded my-3"
        style={{ maxWidth: "100%", height: "auto", border: "2px solid #b5b5b5" }}
      />

      <p className="text-muted my-2">
        Unlike most accessories, eye glasses are easy to size and customize. The perfect fit comes from choosing a frame that complements your face shape and measurements.
      </p>

      <p className="text-muted my-2">You can:</p>
      <p className="text-muted">Check the measurements printed inside your current glasses</p>
      <p className="text-muted">Measure lens width, bridge width, and arm length with a ruler</p>
      <p className="text-muted">Use our sizing guide to compare options</p>
      <p className="text-muted">
        Our lenses are custom-crafted to fit your selected frame and your prescription — ensuring comfort and clarity every time.
      </p>

      <h2 className="fw-bold my-3 mt-4">2 Select Your Frame</h2>

      <img
        src={SS3}
        alt=""
        className="img-fluid w-100 rounded my-3"
        style={{ maxWidth: "100%", height: "auto", border: "2px solid #b5b5b5" }}
      />

      <p className="text-muted my-2">
        Browse through our stylish collection and pick one — or more — frames that suit your look.
      </p>

      <p className="text-muted my-2">
        Each product page provides detailed information about:
      </p>

      <p className="text-muted">Frame size</p>
      <p className="text-muted">Color</p>
      <p className="text-muted">Material</p>
      <p className="text-muted">Shape</p>

      <p className="text-muted my-2">
        Want to see how they’ll look? Use our virtual try-on feature to preview your favorite frames before you buy. From bold fashion looks to minimalist designs, we help you choose confidently — no need to search <strong>“eye glasses near me”</strong> again.
      </p>

      <h2 className="fw-bold my-3 mt-4">3 Enter Your Prescription</h2>

      <img
        src={SS4}
        alt=""
        className="img-fluid w-100 rounded my-3"
        style={{ maxWidth: "100%", height: "auto", border: "2px solid #b5b5b5" }}
      />

      <img
        src={SS5}
        alt=""
        className="img-fluid w-100 rounded my-3"
        style={{ maxWidth: "100%", height: "auto", border: "2px solid #b5b5b5" }}
      />

      <p className="text-muted my-2">
        Simply upload or manually enter your prescription details during checkout.
      </p>

      <p className="text-muted my-2">Not sure about lens types? We offer options including:</p>
      <p className="text-muted">1. Single Vision</p>
      <p className="text-muted">2. Bifocal</p>
      <p className="text-muted">3. Progressive</p>
      <p className="text-muted">4. Blue Light Protection</p>

      <p className="text-muted my-2">
        Our support team is always ready to help if you have questions about lenses or prescription details.
      </p>

      <h2 className="fw-bold my-3 mt-4">4 Secure Checkout & Fast Delivery</h2>

      <img
        src={SS6}
        alt=""
        className="img-fluid w-100 rounded my-3"
        style={{ maxWidth: "100%", height: "auto", border: "2px solid #b5b5b5" }}
      />

      <p className="text-muted my-2">
        Go to our Check out system to complete your purchase and get ready to wear your new eye glasses with confidence.
      </p>

      <p className="text-muted">Standard turnaround: 2–3 weeks</p>
      <p className="text-muted">Express shipping available for faster delivery</p>

      <p className="text-muted my-2">
        Why overpay at a physical store when you can buy high-quality cheap eye glasses online with better convenience?
      </p>

      <h2 className="fw-bold my-3 mt-4 text-center text-md-start">
        Shop Smart. See Clearly.
      </h2>

      <p className="text-muted">
        From trendy cat eye glasses to everyday essentials, Glasses For You makes it easy to shop premium eye glasses online at unbeatable prices.
      </p>

      <p className="text-muted">
        Skip the trip to the eye glass store near me — your perfect pair is just a few clicks away.
      </p>

    </div>
  </div>
</div>
    
          
    <Footer/>
    </>
  )
}

export default OrderingGuide
