import React, { useState } from "react";

const Varients = ({ sizes ,selectedSize, setSelectedSize}) => {

  return (
    <div className="d-flex gap-3 flex-column">
      <div>
        <small className="text-muted">Selected:</small>
        <span className="ms-1 fw-semibold">
          {selectedSize?.variant}
        </span>
      </div>

      <div className="d-flex gap-2 flex-wrap">
        {sizes.map((item, index) => (
          <button
            key={item._id || index}
            className={`text-lowercase btn rounded-pill px-3 py-2 ${
              selectedSize === item
                ? "shadow border-2"
                : "shadow border border-1 border-light text-muted"
            }`}
            style={{
              backgroundColor: selectedSize === item ? "white" : "transparent",
              borderColor: selectedSize === item ? "#ec8c97" : undefined,
            }}
            onClick={() => setSelectedSize(item)}
          >
            {item.variant}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Varients;
