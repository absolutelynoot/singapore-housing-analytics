import React from "react";

const TwitterLoadingPlaceholder = () => {
  return (
    <>
      <div className="card" aria-hidden="true">
        <div className="card-body">
          {Array.from(Array(5).keys()).map((i) => (
            <>
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TwitterLoadingPlaceholder;
