import React from 'react'

import { useKeenSlider } from "keen-slider/react"
import { useState } from 'react'
import "keen-slider/keen-slider.min.css"
import MutationPlugin from './mutationPlugin'
import ResizePlugin from './resizePlugin'
import { getImageSrc } from '../utils/imageUrl'

const CategorySlider = ({ direction }) => {

  const items = [
    { label: 'Year of the Snake', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-LNY.png' },
    { label: 'Oversized', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-Zodiac.png' },
    { label: 'Small Frames', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-headset.png' },
    { label: 'Rush Delivery', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-rush-delivery.png' },
    { label: 'Top Rated', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-LNY.png' },
    { label: 'Under $30', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-Zodiac.png' },
    { label: 'Zenni Featherlite™', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-headset.png' },
    { label: 'Rectangle', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-rush-delivery.png' },
    { label: 'Cat Eye', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-LNY.png' },
    { label: 'Aviator', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-Zodiac.png' },
    { label: 'Clear', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-headset.png' },
    { label: 'Tortoiseshell', imageUrl: 'https://static.zennioptical.com/marketing/homepage/shopbycategory/pill/HP-pills-rush-delivery.png' }
  ]

  const [details, setDetails] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const animation = { duration: 50000, easing: (t) => t };

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,

      detailsChanged(s) {
        setDetails(s.track.details);
      },
      created(s) {
        // Small delay to ensure track.details exists
        setTimeout(() => {
          if (s.track?.details) s.moveToIdx(5, true, animation);
        }, 100);
      },
      updated(s) {
        if (!s.track?.details) return; // ✅ prevent null access
        s.moveToIdx(
          direction === "left"
            ? s.track.details.abs - 5
            : s.track.details.abs + 5,
          true,
          animation
        );
      },
      animationEnded(s) {
        if (!s.track?.details) return; // ✅ prevent null access
        s.moveToIdx(
          direction === "left"
            ? s.track.details.abs - 5
            : s.track.details.abs + 5,
          true,
          animation
        );
      },
      initial: 0,
      slides: {
        origin: "center",
        perView: window.innerWidth < 750 ? 2 : 8,
        spacing: 10,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [ResizePlugin, MutationPlugin]
  );

  const [containerHeight, setContainerHeight] = useState(null);

  return (
    <div className=' py-3'>
      <div ref={sliderRef} className="keen-slider category-scroll">
        {items.map((item, idx) => (
          <div className="keen-slider__slide category-slide" key={idx}>
            <a href="/" className="category-chip w-100">
              <span className="category-thumb">
                <img src={item.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/logo192.png'}} />
              </span>
              <span className="fw-semibold">{item.label}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySlider