import React from "react";

const Trust = () => {
      const color = "#212427"

  return (
    <div className="container pb-5">
       <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center my-5" style={{ color: color,fontWeight:900 }}>SMARTER DEFENSE STARTS HERE       </p>


      <div className="row g-4">
        <div className="col-6 col-md-3 px-2">
          <div className="choose-box text-center p-4 rounded-4 h-100">
            <i className="fa fa-cubes mb-3" style={{ fontSize: 40, color: "#001f54" }}></i>
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#001f54" }}>
              WIDE RANGE OF PRODUCTS
            </h5>
            <p className="text-secondary">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, deserunt?
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3 px-2">
          <div className="choose-box text-center p-4 rounded-4 h-100">
            <i className="fa fa-thumbs-up mb-3" style={{ fontSize: 40, color: "#001f54" }}></i>
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#001f54" }}>
              BEST PRICES & GREAT DEALS
            </h5>
            <p className="text-secondary">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, deserunt?
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3 px-2">
          <div className="choose-box text-center p-4 rounded-4 h-100">
            <i className="fa fa-truck mb-3" style={{ fontSize: 40, color: "#001f54" }}></i>
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#001f54" }}>
              DELIVERY ALL OVER USA
            </h5>
            <p className="text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, deserunt?
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3 px-2">
          <div className="choose-box text-center p-4 rounded-4 h-100">
            <i className="fa fa-leaf mb-3" style={{ fontSize: 40, color: "#001f54" }}></i>
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#001f54" }}>
              ECO FRIENDLY
            </h5>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, deserunt?
            </p>
          </div>
        </div>
      </div>

      {/* Optional internal styles */}
      <style jsx>{`
        .choose-box {
          background: #f8f9fa;
          transition: all 0.3s ease;
        }
        .choose-box:hover {
          background: #eef1f5;
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Trust;