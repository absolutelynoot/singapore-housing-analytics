import React from "react";

const Scorecard = ({ title, number, unit }) => {
  return (
    <div class="card shadow-sm bg-light">
      <div class="card-body">
        <h5 class="fw-bold card-title">{title}</h5>
        <p class="card-text display-3">
          {number}
          <span class="fs-5 ms-3">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default Scorecard;
