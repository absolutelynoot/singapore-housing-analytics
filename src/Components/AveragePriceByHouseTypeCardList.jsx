import React from "react";

const AveragePriceByHouseTypeCardList = ({ title, data }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header fw-semibold">{title}</div>
      <ul className="list-group list-group-flush">
      {data.length === 0 && (
          Array.from(Array(5).keys()).map((i) => (
            <>
            <li className="list-group-item">
              <div className="fw-bold placeholder-glow">
                  <div className="placeholder col-4"></div>
                  <div className="placeholder col-6"></div>
                  <div className="placeholder col-4"></div>
              </div>
            </li>
            </>
        )))}
        
        {data.map((item) => (
          <li key={item._id} className="list-group-item">
            <div className="fw-bold">{item._id}</div>
            <div>
                Avg price per Sqm: {item.avg_resale_price_sqm}
            </div>
            <div>
                Total units sold: {item.total_units_sold}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AveragePriceByHouseTypeCardList;
