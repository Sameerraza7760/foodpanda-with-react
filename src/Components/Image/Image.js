import React from "react";
import "./../style.css";

function Image() {
  return (
    <div className="background-image">
      <div className="background-image-panda">
        <div className="form-container">
          <h3>It's the food and groceries you love, delivered</h3>
          <div className="input-container">
            <div className="input-location">
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter Your Full address"
              />
            </div>
            <div className="twoButton">
              <button type="button" className="btn btn-danger">
                Delevered
              </button>
              <span>OR</span>
              <button type="button" className="btn btn-danger">
                Pickup
              </button>
            </div>
          </div>
        </div>
      </div>
      <h4 className="bottom-heading">
        You prepare the food we handle the rest
      </h4>
    </div>
  );
}

export default Image;


