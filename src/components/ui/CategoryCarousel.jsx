import React, { useMemo } from 'react';

const CategoryCarousel = ({ imageUrl, heading }) => {
  const displayHeading = useMemo(() => {
    if (!heading) return ''
    const s = heading.indexOf('*'), e = heading.lastIndexOf('*')
    return s !== -1 && e !== -1 && e > s ? heading.replace(heading.substring(s, e + 1), '') : heading
  }, [heading])

  return (
    <div className="carousel slide" style={{ borderBottom: '1px solid #F4B92D' }}>
      <div className="carousel-inner">
        <div className="carousel-item active position-relative">
          <div className="shade w-100 h-100" style={{ zIndex: 20 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
          <div className="w-100 position-relative" style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}>
            <img src={imageUrl} alt={displayHeading} className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
            <p data-aos="fade-up" data-aos-duration="1000" style={{ fontFamily: 'Sagrantino', fontSize: window.innerWidth > 750 ? 52.8 : 32, color: '#000', margin: 0 }}>{displayHeading}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryCarousel;
