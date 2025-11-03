import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { getImageSrc } from '../../utils/imageUrl';
import ProductCard from './productCard';
const FeaturedProducts = ({ slides = [] }) => {
    const [ref] = useKeenSlider({
        loop: true,
        renderMode: 'auto',
        slides: {
            perView: 2.2, // show 2 full + small portion of previous/next
            spacing: 10,
            origin: 'auto' // ensures the previous slide slightly peeks in
        },
        breakpoints: {
            '(max-width: 767px)': {
                slides: { perView: 1.2, spacing: 0, origin: 'auto' }
            },
            '(min-width: 768px) and (max-width: 1199px)': {
                slides: { perView: 2.1, spacing: 10, origin: 'auto' }
            },
            '(min-width: 1200px)': {
                slides: { perView: 4.5, spacing: 10, origin: 'auto' }
            }
        }
    });
    const handleImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo192.png'; };
    return (
        <>
            <div ref={ref} className="keen-slider px-4">
                {slides.map((s, i) => (
                    <div className="keen-slider__slide" key={i}>
                        <ProductCard/>
                        {/* <div className="position-relative">
                            <div className="shade h-100 w-100 rounded-4" style={{ zIndex: 20 }}></div>
                            <img src={getImageSrc(s.imageUrl)} alt={s.title || 'slide'} className="w-100 featured-img rounded-4" referrerPolicy="no-referrer" loading="lazy" onError={handleImgError} />
                            <div style={{ zIndex: 30 }} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
                                {s.title && <h2 className="fw-bold display-6">{s.title}</h2>}
                                {s.subtitle && <p className="lead mb-3">{s.subtitle}</p>}
                                {s.cta && <a href={s.cta.href || '/'} className="btn btn-primary btn-lg">{s.cta.label}</a>}
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default FeaturedProducts;
