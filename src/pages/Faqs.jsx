import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MetaDecorator from '../components/metaDecorator'
import Coverimg from '../images/FAQs.png'

const faqs = [
  {
    question: "Why are your prices so low?",
    answer:
      "Our prices remain low since we operate online and so the price of physical stores, rent and advertising is minimized. This enables us to transfer our savings to our customers without sacrificing quality. Each frame and lens is carefully checked in quality prior to shipment. We will be able to offer trendy and high-quality eyeglasses at reasonable costs by reducing extra costs. We have a mission to ensure that quality eyewear is affordable to all and at the same time we are willing to be of high quality.",
  },
  {
    question: "How do I place an order?",
    answer:
      "It is fast and easy to place an order. Select a frame that matches your face and style and gets a pair of them. You just need to fill your prescription and select the type of lens you require and the kinds of coatings. Add the glasses to the cart, checkout, and make a safe payment. Upon confirmation, your order will be converted and delivered in time thus a hassle free experience both in choosing and delivery.",
  },
  {
    question: "How do I use a promo code?",
    answer:
      "In order to apply a promo code, add glasses of your desired items in your shopping cart. When checking out, you should find a place that says Promo Code and enter your code and then click Apply. The discount will be computed at once in your total. It is necessary to note that in most cases, there is only one promo code per order. Promotional codes will help in saving money when purchasing products and we do have frequent promotions on products during seasons.",
  },
  {
    question: "Why is frame size important?",
    answer:
      "Getting the right frame size would help in making sure that your glasses fit in the right manner and that the pupils fit in the right way too. A properly fitted frame will give a clear vision, avoid slipping and will not cause any discomfort. The misplaced frames may lead to headaches, blurred vision or the pressure that can be experienced on the nose and ears. The correct size of the frame also improves the overall look of your glasses as they are useful and aesthetic.",
  },
  {
    question: "I don't see the lenses I need. What should I do?",
    answer:
      "In case you are unable to locate the necessary lenses on our site, our customer care department is within your service. You may contact us through telephone, email or chat to talk about your needs. We are able to offer substitute choices in most situations or take you through the process of ordering of lenses which are custom made. We aim at making sure that you are not compromised when it comes to lenses that are in accordance with your prescription, preferences and the lifestyle needs.",
  },
  {
    question: "Can I use my contact lens prescription?",
    answer:
      "No, contact lens prescriptions are different from eyeglass prescriptions and they cannot be used interchangeably. Eyeglass lenses are positioned a little distance in front of your eyes thus varying the needed lens power as compared to contact lenses. It is always advisable to order glasses online with a valid eyeglass prescription. In case you are not sure, your optometrist can assist you to get the proper measurements to get the best vision correction.",
  },
  {
    question: "How do I order prescription sunglasses?",
    answer:
      "The procedure of getting prescription sunglasses is easy and it has the same process as ordinary glasses. Select the frame to be used with the sunglasses, your prescription and the tint of the lenses to use and the UV block. Additional options of coating such as anti-reflective or blue light protection can also be selected. This will not only keep your sunglasses fashionable but will also give them the best vision correction not to mention their ability to shield your eyes against the sun.",
  },
  {
    question: "What are your lenses made of?",
    answer:
      "We use optical grade materials that are of superior quality to manufacture lenses that offer clear and accurate perception. These are light, durable and impact-resistant materials to be worn on daily basis. A number of our optic lenses incorporate highly developed plastics which have better resistance to scratches and comfort than the old fashioned glass lenses. They are not only safe, but also designed to last a long time too, so that your eyewear can be reliable and functional.",
  },
  {
    question: "What lens coatings do you offer?",
    answer:
      "We do provide various lens coating to increase durability, comfort, and performance. There are the anti-reflective coating to reduce the glare, scratches-free coating to eliminate breakages, UV protection to save your eyes against adverse rays, and filtering of the blue light use on the screens. There are also some lenses with photochromic properties that automatically adjust to the sunlight. These finishes enhance the general wearing experience and your eyes are also secure in various settings.",
  },
  {
    question: "Do you offer prism correction?",
    answer:
      "Yes, some prescriptions can be corrected by prism, and it can be helpful to those that have problems with alignment in their eyes or with seeing two images. Prism lenses assist in correcting the way in which the light enters your eyes so that it can be correctly aligned and is comfortable to see. We also have support team which you can call to seek advice before placing an order to ensure that prism lenses can be used on your glasses.",
  },
  {
    question: "Do you charge extra for strong prescriptions?",
    answer:
      "In some cases, very strong prescriptions might need special lenses or extra processing which might be charged a little extra. This makes the lenses clear, durable, and comfortable and has maintained good vision correction. It also shows any extra charge at the checkout. Our mission is to offer low-cost eyewear that does not compromise on the quality and performance of the lenses provided to the consumers.",
  },
  {
    question: "Can I pick up my glasses?",
    answer:
      "To ensure the ease of getting our orders, most of our orders are usually delivered to your doorstep, although there are pickup options, based on the availability of a local shop or a collection centre. In case of pickup, then you can choose it in checkout. We make sure that every glass will be packed well so that it is not damaged during transportation. Such flexibility would enable customers to get their eyewears in the most convenient manner possible.",
  },
  {
    question: "Where are my glasses made?",
    answer:
      "The glasses we produce are of high quality and made through the latest production methods. Frames and lenses can be made in special factories which deal with optical production. The quality of every product is thoroughly checked during the shipping process. This guarantees that you get a long lasting eyewear that is of professional standards.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, international shipping can be offered to the customers of numerous countries. Delivery time and expenses may be different with respect to the destination and mode of delivery adopted. When it comes to the checkout, you are going to be able to see if your location is supported. Our mission is to deliver in a safe and reliable manner across the world.",
  },
  {
    question: "After placing an order, will I get a tracking number?",
    answer:
      "Yes, after processing your order and a shipment has been made, you will get an email with a tracking number. This tracking number will enable you track your shipment online. The tracking system of the courier will allow you to see the status of the delivery at any point in time. This will keep you fully informed on the delivery date of your glasses.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes, any payments that are made in our site are made using secure payment gateways. These systems have an encryption technology that safeguards your personal and financial data. We do not keep sensitive details of payment in our servers. This makes all the transactions safe and confidential.",
  },
  {
    question: "Do glasses come with original cases?",
    answer:
      "Yes, the majority of eyeglasses come with a protective case to ensure the eyeglasses are not damaged when not in use. The situation is useful to avoid scratches, dust, and unintentional damages. A cleaning cloth can also be in most occasions attached to assist in keeping the lenses clear. These are the accessories that assist you in caring better about your eyewear.",
  },
  {
    question: "Can I cancel or change my order?",
    answer:
      "Orders may in most cases be canceled or changed within a very short period after the order is made as far as production is not processed. In case you have to change something, it is best to contact the customer support as early as possible with your order details. When the lenses are already manufactured or the order is shipped the change might not be possible anymore. Our team will take you through the available options.",
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