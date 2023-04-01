import React from "react";
import Scorecard from "../Components/Scorecard";
import ScorecardPlaceholder from "../Components/ScorecardPlaceholder";
import { useState, useEffect } from "react";

const Overview = () => {
  let [totalUnitSold, setTotalUnitSold] = useState(0);
  let [averageSqmPrice, setAverageSqmPrice] = useState(0);

  const fetchTotalUnitSoldData = async () => {
    const response = await fetch("http://localhost:5000/hdb/total_units_sold");
    if (response.ok) {
      let temp = await response.json();
      temp = temp.Result[0].total_units_sold;

      // format number with thousand separator
      temp = temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setTotalUnitSold(temp);
      console.log(temp);
    }
  };

  const fetchAverageSqmPrice = async () => {
    const response = await fetch("http://localhost:5000/hdb/avg_price_sqm");
    if (response.ok) {
      let temp = await response.json();
      temp = temp.Result[0].avg_resale_price_sqm;

      // format number to 0 decimal places and thousand separators
      temp = temp.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      setAverageSqmPrice(temp);
      console.log(temp);
    }
  };

  useEffect(() => {
    fetchTotalUnitSoldData();
    fetchAverageSqmPrice();
  }, []);

  return (
    <>
      <h1 className="mb-3">Overview</h1>
      <div className="row mb-3">
        <div className="col">
          {/* if totalUnitSold is 0 render scorecardPlaceholder */}
          {totalUnitSold == 0 ? (
            <ScorecardPlaceholder />
          ) : (
            <Scorecard
              title="Total Unit Sold"
              number={totalUnitSold}
              unit="units"
            />
          )}
        </div>
        <div className="col">
          {averageSqmPrice == 0 ? (
            <ScorecardPlaceholder />
          ) : (
            <Scorecard
              title="Average Price Per Sqm"
              number={averageSqmPrice}
              unit="SGD"
            />
          )}
        </div>
        <div className="col">
          <ScorecardPlaceholder />
        </div>
      </div>

      <div className="row"></div>
    </>
  );
};

export default Overview;
