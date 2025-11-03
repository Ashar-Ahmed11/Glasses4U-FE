import React from 'react';
import { getImageSrc } from '../../utils/imageUrl';

const PromoCard = ({ title, subtitle, cta, imageUrl }) => (
    <div className="p-4 p-lg-5 rounded-4 position-relative text-start bg-light text-white" style={{ minHeight: 360, background: `url(${getImageSrc(imageUrl)}) center/cover no-repeat` }}>
        <div classname="" style={{ borderRadius:15,zIndex: 20, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)" }}></div>
        <div style={{ zIndex: 30 ,position:"relative"}}>
            <div className="bg-dark bg-opacity-50 d-inline-block rounded px-2 py-1 mb-3 text-white fw-bold">{subtitle}</div>
            <h2 className="display-5 fw-bold mb-3" style={{ maxWidth: 520 }}>{title}</h2>
            <p className="lead mb-4" style={{ maxWidth: 520 }}>{cta?.desc}</p>
            {cta?.label && <a href={cta.href || '/'} className="btn btn-dark btn-lg rounded-pill">{cta.label}</a>}
        </div>
    </div>
);

const PromoDuo = () => (
    <section className="container py-4">
        <div className="row g-4">
            <div className="col-12 col-lg-6">
                <PromoCard
                    subtitle="GRATEFUL FOR"
                    title={"THE GOOD WE SEE"}
                    cta={{ label: 'Learn more' }}
                    imageUrl="https://t3.ftcdn.net/jpg/05/48/91/46/360_F_548914614_nu3JSogx41lxFDZGsVLMGQpqZ02KNvNg.jpg"
                />
            </div>
            <div className="col-12 col-lg-6">
                <PromoCard
                    subtitle="EYEWEAR FOR"
                    title={"EVERYONE™"}
                    cta={{ label: 'Our story' }}
                    imageUrl="https://img.freepik.com/free-photo/close-up-outdoor-photo-carefree-man-stylish-dark-clothes-posing-near-old-building-handsome-african-guy-standing-front-yellow-wall_197531-21784.jpg?semt=ais_hybrid&w=740&q=80"
                />
            </div>
        </div>
    </section>
);

export default PromoDuo;
