import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { getImageSrc } from '../../utils/imageUrl';

const HeroSlider = ({ slides = [] }) => {
  const [ref] = useKeenSlider({ loop: true, slides: { perView: 1.2,spacing: 12,origin:"center" }, created: s => s.update() });
 
  const handleImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo192.png'; };

  const ImgBlock = ({ s }) => (
    <div className="position-relative h-100" >
      <img src={getImageSrc(s.imageUrl)} alt={s.title||'slide'} style={{objectFit:"cover"}} className={`${window.innerWidth<768?"":"h-100"}  w-100 hero-img rounded-4`} referrerPolicy="no-referrer" loading="lazy" onError={handleImgError} />
        <div className="shade" style={{borderRadius:15,zIndex:20,position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.2)"}}></div>
     <div style={{zIndex:30,position:"relative"}} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
        {s.title && <h2 className="fw-bold display-6">{s.title}</h2>}
        {s.subtitle && <p className="lead mb-3">{s.subtitle}</p>}
        {s.cta && <a href={s.cta.href || '/'} className="btn btn-outline-light border-2 btn-lg">{s.cta.label}</a>}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="keen-slider">
      {slides.map((s, i) => (
        <div className="keen-slider__slide" key={i}>
          {i === 0 && Array.isArray(s.stacked) && s.stacked.length === 2 ? (
            <>
              <div className="d-none d-lg-block">
                <div className="container  px-0">
                  <div className="row g-3  align-items-stretch">
                    <div className="col-12  col-lg-8"><ImgBlock s={s} /></div>
                    <div className="col-12  col-lg-4 d-flex flex-column gap-3">
                      <ImgBlock s={s.stacked[0]} />
                      <ImgBlock s={s.stacked[1]} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-lg-none">
                <ImgBlock s={s} />
              </div>
            </>
          ) : (
            <ImgBlock s={s} />
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
