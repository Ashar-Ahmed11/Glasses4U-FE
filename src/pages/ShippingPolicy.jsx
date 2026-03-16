import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MetaDecorator from '../components/metaDecorator'
import Coverimg from '../images/shipping policy.png'

const ShippingPolicy = () => {
  return (
    <>
      <Header />
      <MetaDecorator title="Shipping Policy | Glasses 4U" description="Learn about our shipping timelines, methods, charges, and return policies." />

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
        <div style={{ zIndex: 30 }} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-4 fw-bold">Shipping Policy</h1>
          {/* <p className="lead">Crafting prescription eyewear designed for comfort, clarity, and modern style.
 At Glasses 4U, we believe great vision should be easy, affordable, and effortless. That’s why we create high-quality prescription eyewear that helps you see clearly and feel confident every single day.
</p> */}
        </div>
      </section>


      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-11 col-12" style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>

            {/* Main Title */}
            <h6 className="fw-bold text-center mb-3" style={{ letterSpacing: '0.04em' }}>THE SHIPPING POLICY</h6>

            <p className="mb-4">
              At Glasses 4 U, we aim to deliver high-quality eye glasses online with complete transparency
              about timelines and costs.
            </p>

            {/* Order Processing */}
            <h6 className="fw-bold text-center mb-2">ORDER PROCESS</h6>
            <p className="mb-1">
              - Once your order is placed, the standard turnaround time is 14 to 21 working days (excluding weekends).
            </p>
            <p className="mb-1">- This timeframe includes:</p>
            <p className="mb-1 ps-3">- Production of your prescription eye glasses</p>
            <p className="mb-1 ps-3">- Quality checks</p>
            <p className="mb-1 ps-3">- International transit</p>
            <p className="mb-3 ps-3">- Final delivery</p>
            <p className="mb-3">
              Because our production facility is overseas, this timeframe ensures careful customization
              and inspection of every pair — whether you order everyday frames or stylish cat eye glasses.
            </p>

            {/* Shipping Charges */}
            <div className="text-center mb-3">
              <p className="mb-1 fw-semibold">
                Get "Standard Shipping" For The Following Countries At The Checkout:
              </p>
              <p className="mb-1">United States of America <strong><em>(Standard)</em></strong></p>
              <p className="mb-1">Canada <strong><em>(Standard)</em></strong></p>
              <p className="mb-1">France <strong><em>(Standard)</em></strong></p>
              <p className="mb-3">Ireland <strong><em>(Standard)</em></strong></p>

              <p className="mb-1">Standard Shipping to the US, UK, Canada and Ireland is 14–21 Working Days and for other countries, it is 3–4 Weeks.</p>
              <p className="mb-1">$5.95 per single pair. If you order two or more pairs, the shipping cost for the current order is removed.</p>
              <p className="mb-1">Orders above $80 qualify for a promotional offer (same frame in two quantities).</p>
              {/* <p className="mb-3">We also offer <strong>USPS Priority Shipping</strong> within the United States with a turnaround time of 10–12 business days.</p> */}
            </div>

            <p className="mb-4">
              Shopping for cheap eye glasses online allows you to save more compared to visiting an eye glass store near me.
              For order-related inquiries, contact us at: <strong>team@glasses-4u.com</strong>
            </p>

            {/* Our Shipping Methods */}
            {/* <h6 className="fw-bold text-center mb-2">OUR SHIPPING METHODS</h6>
            <p className="mb-1">- For Standard Shipping to the US &amp; Puerto Rico, we use USPS (United States Postal Services)</p>
            <p className="mb-1">- For Standard Shipping to UK, Ireland, and France, we use Royal Mail.</p>
            <p className="mb-4">- For Standard Shipping to Canada, we use Canada Post.</p> */}

            {/* Return Policy */}
            <h6 className="fw-bold text-center mb-2">RETURN, EXCHANGE &amp; REPLACEMENT POLICY</h6>
            <p className="fw-semibold mb-1">Hassle-Free Satisfaction Guarantee</p>
            <p className="mb-2">
              Your satisfaction is our priority. If you experience any issue with your eye glasses, you may
              contact us via email or live chat for assistance.
            </p>
            <p className="mb-1">Issues such as:</p>
            <p className="mb-1 ps-3">- Frame sizing problems</p>
            <p className="mb-1 ps-3">- Vision clarity concerns</p>
            <p className="mb-3 ps-3">- Dissatisfaction with frame shape, style, or color</p>
            <p className="mb-4">must be reported within 30 days of receiving your order.</p>

            {/* 150 Day Warranty */}
            <p className="fw-semibold mb-1">150-Day Warranty Coverage</p>
            <p className="mb-2">Glasses 4 U offers a 150-day warranty period for additional peace of mind. This warranty covers:</p>
            <p className="mb-1 ps-3">- Incorrect prescription entered accidentally by the customer – One-time free replacement</p>
            <p className="mb-1 ps-3">- Wrong frame size selected – One-time frame exchange at no extra cost</p>
            <p className="mb-1 ps-3">- Dissatisfaction with frame quality or color – One-time free replacement</p>
            <p className="mb-3 ps-3">- Vision issues – If there is a problem with lens accuracy, we will remake your glasses at no cost</p>
            <p className="mb-4">
              We use premium CR-39 lens material to ensure your prescription is produced accurately according to your optometrist's details.
            </p>

            {/* Production Facility */}
            <p className="fw-semibold mb-1">Production Facility Information</p>
            <p className="mb-4">
              Our production facilities are located overseas in Pakistan and Japan, which is why the processing
              time is 14–21 working days. Despite the international production, ordering eye glasses online
              from Glasses 4 U remains more affordable than many traditional eye glass world retailers.
            </p>

            {/* Order Tracking */}
            <p className="fw-semibold mb-1">Order Tracking</p>
            <p className="mb-4">You can track your order anytime by logging into your account on our website.</p>

            {/* Cancellation */}
            <p className="fw-semibold mb-1">Order Cancellation or Changes</p>
            <p className="mb-4">
              If you need to cancel or modify your order, please contact us within 36 hours of placing it.
              Orders are processed quickly, so early communication is important.
            </p>

            {/* Packaging */}
            <p className="fw-semibold mb-1">Packaging Details</p>
            <p className="mb-1">Each pair of eye glasses is delivered with:</p>
            <p className="mb-1 ps-3">- A protective designer case</p>
            <p className="mb-4 ps-3">- A soft cleaning cloth</p>

            {/* Relens */}
            <p className="fw-semibold mb-1">Relens Services</p>
            <p className="mb-4">
              Currently, we do not offer re-lensing services. Since our production facility is overseas,
              frames and lenses are manufactured together as a complete unit.
            </p>

            {/* Refund */}
            <p className="fw-semibold mb-1">Refund Policy</p>
            <p className="mb-2">We offer a 100% satisfaction guarantee. You may request assistance within 50 days of receiving your order if you experience:</p>
            <p className="mb-1 ps-3">- Vision issues</p>
            <p className="mb-1 ps-3">- Frame size problems</p>
            <p className="mb-3 ps-3">- Dissatisfaction with the frame</p>
            <p className="mb-4">We will first provide a replacement or exchange.</p>

            {/* Not Sure / Contact */}
            <h6 className="fw-bold text-center mb-2">NOT SURE WHAT TO DO?</h6>
            <p className="mb-3">
              Need to ask product-related questions or want to inquire about your order? Our Customer Support
              team is available 24/7 via live chat and Phone Support. We resolve issues via round-the-clock support.
            </p>

            <p className="text-center mb-1">
              <strong>Write to us:</strong> team@glasses-4u.com
            </p>
            <p className="text-center mb-5">
              <strong>Call Us:</strong> +1-888-972-9060.
            </p>

            {/* Footer CTA */}
            <div className="border-top pt-4 text-center">
              <p className="fw-semibold mb-1">Shop Smart. See Clearly.</p>
              <p className="text-muted">
                Skip searching for eye glasses near me and order premium-quality eye glasses frames cheap
                from Glasses 4 U. From prescription essentials to fashion-forward styles like cat eye glasses,
                we make buying eye glasses online simple, secure, and affordable.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ShippingPolicy