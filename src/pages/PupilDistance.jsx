import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MetaDecorator from '../components/metaDecorator'
import Coverimg from '../images/pupil.png'

const PupilDistance = () => {
  return (
    <>
      <Header />
      <MetaDecorator title="Pupil Distance | Glasses 4U" description="Learn what PD is and how to measure your pupil distance for accurate lenses." />

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
          <h1 className="display-4 fw-bold">Pupil Distance</h1>
          {/* <p className="lead">Crafting prescription eyewear designed for comfort, clarity, and modern style.
 At Glasses 4U, we believe great vision should be easy, affordable, and effortless. That’s why we create high-quality prescription eyewear that helps you see clearly and feel confident every single day.
</p> */}
        </div>
      </section>

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-11 col-12">

            {/* Section 1 - What Is PD */}
            <div className="mb-4">
              <h6 className="fw-bold text-decoration-underline mb-1">What Is Pupil Distance (PD)?</h6>
              <p className="mb-0" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Pupil Distance (PD) is the measurement between the centers of your pupils in millimeters.
                This measurement ensures that the lenses in your eye glasses are positioned correctly in
                front of your eyes for clear and accurate vision.
              </p>
              <p className="mb-0 mt-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                When ordering eye glasses online from Glasses 4 U, providing the correct PD is essential.
                If the lenses are not aligned properly with your pupils, it may cause blurry vision or eye strain.
              </p>
              <p className="mb-0 mt-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                If your PD is not listed on your prescription, you can measure it yourself using a ruler and
                a mirror, or ask your eye care professional to provide it. Entering the correct PD helps us
                customize your lenses accurately — just like you would expect from an eye glass store near me,
                but with the convenience of shopping online.
              </p>
            </div>

            {/* Section 2 - Normal Progressive Lenses */}
            <div className="mb-4">
              <h6 className="fw-bold text-decoration-underline mb-1">What Are Normal Progressive Lenses?</h6>
              <p className="mb-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Normal progressive lenses, also known as multifocal lenses, combine three vision zones into
                one pair of eye glasses:
              </p>
              <p className="mb-1" style={{ fontSize: '0.92rem' }}>
                <strong>1</strong> &nbsp; Distance vision – for driving or watching TV
              </p>
              <p className="mb-1" style={{ fontSize: '0.92rem' }}>
                <strong>2</strong> &nbsp; Intermediate vision – for computer use
              </p>
              <p className="mb-3" style={{ fontSize: '0.92rem' }}>
                <strong>3</strong> &nbsp; Near vision – for reading or close-up tasks
              </p>
              <p className="mb-0" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Unlike traditional bifocals, progressive lenses do not have visible lines. The transition
                between prescriptions is smooth and gradual, providing a natural visual experience.
              </p>
              <p className="mb-0 mt-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                These lenses are ideal for individuals who need correction for multiple distances but prefer
                not to switch between different pairs of glasses.
              </p>
            </div>

            {/* Section 3 - Computer Glasses */}
            <div className="mb-4">
              <h6 className="fw-bold text-decoration-underline mb-1">What Are Computer Glasses?</h6>
              <p className="mb-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Computer glasses are designed specifically for extended screen use. They help reduce digital
                eye strain and provide clearer intermediate vision.
              </p>
              <p className="mb-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                At Glasses 4 U, computer eye glasses can be made on special request. To order:
              </p>
              <p className="mb-1" style={{ fontSize: '0.92rem' }}>
                <strong>1</strong> &nbsp; Select the reading prescription option when placing your order.
              </p>
              <p className="mb-1" style={{ fontSize: '0.92rem' }}>
                <strong>2</strong> &nbsp; After checkout, contact customer support with your order number.
              </p>
              <p className="mb-3" style={{ fontSize: '0.92rem' }}>
                <strong>3</strong> &nbsp; Request single-vision computer lenses.
              </p>
              <p className="mb-0" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Our production team will customize your lenses accordingly. This option is helpful for
                individuals who spend significant time on computers and want dedicated eye glasses for screen work.
              </p>
            </div>

            {/* Section 4 - Occupational Progressive Lenses */}
            <div className="mb-4">
              <h6 className="fw-bold text-decoration-underline mb-1">What Are Occupational Progressive Lenses?</h6>
              <p className="mb-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Occupational progressive lenses are designed for work-related activities that require clear
                near and intermediate vision, such as office or desk work.
              </p>
              <p className="mb-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Glasses 4 U offers occupational progressives upon special request. To order:
              </p>
              <p className="mb-1" style={{ fontSize: '0.92rem' }}>
                <strong>1</strong> &nbsp; Select varifocal (progressive) lenses during checkout.
              </p>
              <p className="mb-1" style={{ fontSize: '0.92rem' }}>
                <strong>2</strong> &nbsp; Contact customer support after placing your order.
              </p>
              <p className="mb-3" style={{ fontSize: '0.92rem' }}>
                <strong>3</strong> &nbsp; Inform us that you require occupational progressive lenses.
              </p>
              <p className="mb-0" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                These lenses are particularly useful for professionals who need enhanced visual comfort
                during working hours.
              </p>
            </div>

            {/* Section 5 - Ordering Specialized */}
            <div className="mb-5">
              <h6 className="fw-bold text-decoration-underline mb-1">Ordering Specialized Eye Glasses Online</h6>
              <p className="mb-0" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                Whether you are selecting progressive lenses, computer glasses, or standard prescriptions,
                Glasses 4 U makes it easy to order high-quality cheap eye glasses without visiting an eye
                glass world retailer.
              </p>
              <p className="mb-0 mt-2" style={{ lineHeight: '1.8', fontSize: '0.92rem' }}>
                From classic designs to fashionable cat eye glasses, you can find reliable and affordable
                eye glasses frames cheap, all from the comfort of your home, without searching for eye
                glasses near me.
              </p>
            </div>

            {/* Video CTA */}
            {/* <div className="text-center py-4 border-top border-bottom">
              <h6 className="fw-bold letter-spacing-wide mb-0" style={{ letterSpacing: '0.05em' }}>
                HOW TO MEASURE YOUR PD &nbsp;– &nbsp;WATCH THE VIDEO
              </h6>
            </div> */}

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default PupilDistance