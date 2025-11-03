import React from 'react';
import { getImageSrc } from '../../utils/imageUrl';

const ZCard = ({ imageUrl, title, subtitle, href = '/' }) => (
  <a href={href} className="text-decoration-none text-reset">
    <div className="card h-100 border-0">
      <img src={getImageSrc(imageUrl)} alt={title||'card'} className="card-img-top" referrerPolicy="no-referrer" loading="lazy" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/logo192.png';}} />
      <div className="card-body">
        {title && <h5 className="card-title mb-1">{title}</h5>}
        {subtitle && <p className="card-text text-muted small m-0">{subtitle}</p>}
      </div>
    </div>
  </a>
);

export default ZCard;
