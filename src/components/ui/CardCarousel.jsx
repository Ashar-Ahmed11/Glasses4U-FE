import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import ZCard from './ZCard';

const CardCarousel = ({ items = [] }) => {
  const [ref] = useKeenSlider({
    loop: false,
    slides: { perView: 1.2, spacing: 12 },
    breakpoints: {
      '(min-width: 576px)': { slides: { perView: 2, spacing: 16 } },
      '(min-width: 768px)': { slides: { perView: 3, spacing: 16 } },
      '(min-width: 992px)': { slides: { perView: 4, spacing: 16 } }
    }
  });
  return (
    <div ref={ref} className="keen-slider">
      {items.map((c, i) => (
        <div className="keen-slider__slide" key={i}><ZCard {...c} /></div>
      ))}
    </div>
  );
};

export default CardCarousel;
