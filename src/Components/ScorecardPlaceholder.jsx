import React from "react";

const ScorecardPlaceholder = () => {
  return (
    <div class="card shadow-sm bg-light" aria-hidden="true">
      <div class="card-body">
        <h5 class="fw-bold card-title placeholder-glow"><span class="placeholder col-6"></span></h5>
        <p class="card-text display-3 placeholder-glow">
        <span class="placeholder col-8"></span>
          <span class="fs-5 ms-3 placeholder-glow"><span class="placeholder col-3"></span></span>
        </p>
      </div>
    </div>
  );
};

export default ScorecardPlaceholder;
