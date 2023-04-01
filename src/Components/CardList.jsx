import React from "react";

const CardList = ({ title, data }) => {
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

        {data.length > 0 && (
          <>
            {data.map((item) => (
              <li key={item._id} className="list-group-item">
                <div className="fw-bold">
                  {item._id}
                  <span> ({item.unit_sold.street_name})</span>
                </div>
                <div>
                  Flat Model: {item.unit_sold.flat_model} 
                </div>
                <div>
                  Flat Type: {item.unit_sold.flat_type}
                </div>
                <div>
                  Remaining Lease: {item.unit_sold.remaining_lease} year 
                </div>
                <div>
                  Floor area: {item.unit_sold.floor_area_sqm} sqm
                </div>
                <div>Resale Price: <span className="fw-semibold">SGD {item.unit_sold.resale_price}</span></div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default CardList;
