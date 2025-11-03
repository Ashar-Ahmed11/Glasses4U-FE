import React from "react";

const features = [
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-rush-delivery.svg", label: "Rush Delivery" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-kids.svg", label: "Kids" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-progressive.svg", label: "Progressives" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-featherlite.svg", label: "Zenni Featherlite™" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-blokz.svg", label: "Blokz® Blue Light" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-night-driving.svg", label: "Night Driving" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-bloomz.svg", label: "EcoBloomz™" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-safety.svg", label: "Safety" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-zunnies.svg", label: "Zunnies Sports" },
  { img: "https://static.zennioptical.com/marketing/homepage/shopbycategory/chip/HP-chips-sunglasses.svg", label: "Sunglasses Guide" },
];

const FeatureIconsRow = () => {
  return (
    <div className="container-fluid py-4 mt-5 top-bg">
                <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center my-4" style={{ fontWeight: 900 }}>TOP CHOICES </p>

      <div className="row justify-content-center text-center">
        {features.map((item, index) => (
          <div key={index} className="col-3 col-sm-4 col-md-1  mb-4">
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
              <small className="fw-bold">{item.label}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureIconsRow;
