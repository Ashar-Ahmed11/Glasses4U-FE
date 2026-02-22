import React from "react";
import { Link } from "react-router-dom";
import Fashion from '../images/Fashion 2.png'

const features = [
  { img: Fashion, label: "Fashion", link:'/category/eye-glasses'},
  // { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-rush-delivery.svg", label: "Fashion", link:'/category/eye-glasses'},
  // { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-kids.svg", label: "Kids" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-progressive.svg", label: "Progressives" , link:'/category/eye-glasses'},
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-featherlite.svg", label: "Glasses 4U Exclusive" , link:'/category/eye-glasses'},
  // { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-blokz.svg", label: "Blokz® Blue Light" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-night-driving.svg", label: "Night Driving" , link:'/category/eye-glasses'},
  // { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-bloomz.svg", label: "EcoBloomz™" },
  // { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-safety.svg", label: "Safety" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-zunnies.svg", label: "Sports" , link:'/category/eye-glasses'},
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-sunglasses.svg", label: "Sunglasses" , link:'/category/eye-glasses'},
];

const FeatureIconsRow = () => {
  return (
    <div className="container-fluid py-4 mt-5 top-bg">
                <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center my-4" style={{ fontWeight: 900 }}>TOP CHOICES </p>

      <div className="row justify-content-center text-center">
        {features.map((item, index) => (
          <div key={index} className="col-3 col-sm-4 col-md-1  mb-4">
            <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              className="d-flex flex-column align-items-center"
              style={{ cursor: "pointer" }}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle  mb-2"
                style={{
                    backgroundColor:"#eef0f1",
                  width: "80px",
                  height: "80px",
                }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  style={{ width: "40px", height: "40px", objectFit: "contain" }}
                />
              </div>
              <small className="fw-bold" style={{color:'black', textDecoration:'none'}}>{item.label}</small>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureIconsRow;
