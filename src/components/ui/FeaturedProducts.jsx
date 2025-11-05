import React, { useContext } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import AppContext from '../context/appContext';
import ProductCard from './productCard';
const FeaturedProducts = () => {
    const [ref] = useKeenSlider({
        
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
    const { products } = useContext(AppContext)
    return (
        <>
            <div ref={ref} className="keen-slider px-4">
                {products.map((p) => (
                    <div className="keen-slider__slide" key={p._id}>
                        <ProductCard product={p} to={`/product/${p._id}`} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default FeaturedProducts;
