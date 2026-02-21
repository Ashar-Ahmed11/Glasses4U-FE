import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MetaDecorator from '../components/metaDecorator'
import Coverimg from '../images/FAQs.png'

const faqs = [
  {
    question: "Why are your prices so low?",
    answer:
      "We keep costs down by avoiding expensive showrooms and heavy advertising. Instead of running a large eye glass store near me setup, we operate online — which means lower overhead and better prices for you. Our cheap eye glasses are affordable without compromising quality. Every frame and lens goes through strict quality checks before reaching you.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply select a frame as per your size. Enter in your prescription. Pick the lenses from the options available. Add them to the cart and proceed with the payment.",
  },
  {
    question: "How do I use a promo code?",
    answer:
      'Add your selected eye glasses frames to the cart. Enter your discount code in the "Promo Code" box. Click Apply and watch your total drop instantly. Note: Only one promo code can be used per order.',
  },
  {
    question: "Why is frame size important?",
    answer:
      "Choosing the correct size ensures accurate pupil distance alignment and clear vision. While style matters — especially for trendy cat eye glasses — proper fit is essential for focus and comfort.",
  },
  {
    question: "I don't see the lenses I need. What should I do?",
    answer:
      "Once you enter your prescription, our system shows compatible lens options. If nothing appears, it means we currently don't stock lenses for that prescription. Contact our support team — we may be able to arrange a special request.",
  },
  {
    question: "Can I use my contact lens prescription?",
    answer:
      "No. A contact lens prescription cannot be used to produce eye glasses. You'll need a valid eyeglasses prescription.",
  },
  {
    question: "How do I order prescription sunglasses?",
    answer:
      "Simply select tinted lenses (permanent color) or photochromic lenses (darken in sunlight automatically). Now your regular eye glasses become stylish sunglasses.",
  },
  {
    question: "What are your lenses made of?",
    answer:
      "All lenses are made from lightweight, durable plastic and finished with scratch-resistant coating. Each lens passes multiple quality inspections before being customized to your prescription. We currently offer plastic lenses only (up to index 1.67).",
  },
  {
    question: "What lens coatings do you offer?",
    answer:
      "All our eye glasses come with UV protection and scratch resistance by default. Additional options include: Anti-Reflective Coating – Ideal for night driving and screen use. Blue Light Protection – Reduces harmful blue light exposure. Hydrophobic Coating – Repels water and dirt. UV Protection – Blocks 100% UVA & UVB rays.",
  },
  {
    question: "Do you offer prism correction?",
    answer:
      "Yes. Prism correction is available up to base 5. Additional charges apply depending on your prescription.",
  },
  {
    question: "Do you charge extra for strong prescriptions?",
    answer:
      "Yes, additional charges may apply for strong prescriptions. The cost will automatically update after entering your prescription details.",
  },
  {
    question: "Can I pick up my glasses?",
    answer:
      "No. Glasses 4 U operates fully online. That's how we keep our cheap eye glasses prices low — no physical store needed.",
  },
  {
    question: "Where are my glasses made?",
    answer:
      "Our production facilities are located in Thailand and Pakistan. Orders are shipped from the available production center based on stock.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping costs vary by location. US Standard Shipping: $5.95 per pair. US Priority Shipping: $9.95. Additional pair: $2 extra. International rates: Contact support. Custom duties may apply outside the US, UK, and Canada depending on local laws.",
  },
  {
    question: "After placing an order, will I get a tracking number?",
    answer:
      "Yes of course. Once your eye glasses are shipped, you'll receive a tracking number via email and in your account.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Absolutely. We accept major credit cards, PayPal, Amazon Pay, and Apple Pay. All payments are securely processed. We do not store card details.",
  },
  {
    question: "Do glasses come with original cases?",
    answer:
      "Not always. Some designer brands may not include original cases due to bulk purchasing. However, every order includes a protective Glasses 4 U case.",
  },
  {
    question: "Can I cancel or change my order?",
    answer:
      "Yes — contact us within 24 hours of placing your order. We process orders quickly, so early communication is important.",
  },
]

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <style>{`
        .faq-item {
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
        //   background: #fff;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .faq-item.open {
          border-color: #b0c4d8;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .faq-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: left;
          gap: 12px;
        }
        // .faq-btn:hover {
        //   background: #f8fafc;
        // }
        .faq-icon {
          font-size: 1.4rem;
          color: #000000;
          font-weight: 300;
          flex-shrink: 0;
          line-height: 1;
          width: 24px;
          text-align: center;
        }
        .faq-answer {
          padding: 0 22px 20px 22px;
          color: #000000;
          line-height: 1.78;
          font-size: 0.94rem;
        }
        .faq-gap {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>

      <Header />
      <MetaDecorator title="FAQs | Glasses 4U" description="Find answers about ordering, prescriptions, shipping, coatings, and more." />

      {/* Hero */}
      <section className="position-relative">
        <div
          className="w-100"
          style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}
        >
          <img
            src={Coverimg}
            alt="FAQ Glasses 4U"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div
          className="w-100 h-100"
          style={{ zIndex: 20, position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
        />
        <div
          style={{ zIndex: 30 }}
          className="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
        >
          <h1 className="display-4 fw-bold">
            Frequently Asked Questions
          </h1>
          {/* <p className="lead">
            Shopping for eye glasses online should be easy, affordable, and transparent. At Glasses 4 U,
            we make sure you understand everything before placing your order — from pricing and
            prescriptions to shipping and coatings.
          </p> */}
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">

            <h2 className="fw-bold mb-2">Have A Question? Read Frequently Asked Questions Here</h2>
            <p className="text-muted mb-2" style={{ lineHeight: '1.8' }}>
              Shopping for eye glasses online should be easy, affordable, and transparent. At Glasses 4 U,
              we make sure you understand everything before placing your order — from pricing and
              prescriptions to shipping and coatings.
            </p>
            <p className="text-muted mb-4">Here's everything you need to know:</p>

            {/* FAQ Items */}
            <div className="faq-gap ">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item top-bg ${openIndex === index ? 'open' : ''} `}>

                  {/* Question Row */}
                  <button className="faq-btn" onClick={() => toggle(index)}>
                    <strong style={{ color: '#1e293b', fontSize: '0.97rem' }}>
                      {index + 1}. {faq.question}
                    </strong>
                    <span className="faq-icon">
                      {openIndex === index ? '×' : '+'}
                    </span>
                  </button>

                  {/* Answer */}
                  {openIndex === index && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}

                </div>
              ))}
            </div>

          </div>
          <div className="col-lg-8 col-md-10 my-4">

            <h3 className="fw-bold mb-2">See Smart. Shop Smart.</h3>
            <p className="text-muted mb-2" style={{ lineHeight: '1.8' }}>
              Why search for eye glasses near me when you can order premium-quality eye glasses online at unbeatable prices?
            </p>
            <p className="text-muted mb-2" style={{ lineHeight: '1.8' }}>
              From stylish cat eye glasses to everyday essentials and even custom solutions for a glass eye prescription, Glasses 4 U makes clear vision affordable and effortless.

            </p>
          
        </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Faqs