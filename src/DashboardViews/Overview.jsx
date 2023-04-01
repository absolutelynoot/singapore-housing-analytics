import React from "react";
import Scorecard from "../Components/Scorecard";
import ScorecardPlaceholder from "../Components/ScorecardPlaceholder";
import AveragePriceByHouseTypeCardList from "../Components/AveragePriceByHouseTypeCardList";
import { useState, useEffect } from "react";
import CardList from "../Components/CardList";

const Overview = () => {
  let [totalUnitSold, setTotalUnitSold] = useState(0);
  let [averageSqmPrice, setAverageSqmPrice] = useState(0);
  let [averageLeaseRemaining, setAverageLeaseRemaining] = useState(0);
  let [avgSqmPriceByHouseType, setAvgSqmPriceByHouseType] = useState([]);
  let [mostExpensiveUnitByTown, setMostExpensiveUnitByTown] = useState([]);
  let [cheapestUnitByTown, setCheapestUnitByTown] = useState([]);

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

  const fetchAverageLeaseRemaining = async () => {
    const response = await fetch(
      "http://localhost:5000/hdb/avg_lease_remaining"
    );

    if (response.ok) {
      let temp = await response.json();
      temp = temp.Result[0].avg_remaining_lease;

      // format number to 0 decimal places
      temp = temp.toFixed(0);

      setAverageLeaseRemaining(temp);
      console.log(temp);
    }
  };

  const fetchAvgSqmPriceByHouseType = async () => {
    const response = await fetch(
      "http://localhost:5000/hdb/avg_lease_remaining_by_house_type_with_units_sold"
    );

    if (response.ok) {
      let data = await response.json();

      // format avg_resale_price_sqm to 0 decimal places and thousand separators
      const formattedData = data.Result.map((item) => ({
        ...item,
        avg_resale_price_sqm: item.avg_resale_price_sqm
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        total_units_sold: item.total_units_sold
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      }));

      setAvgSqmPriceByHouseType(formattedData);
      console.log(formattedData);
    }
  };

  const fetchMostExpensiveUnitByTown = async () => {
    const response = await fetch(
      "http://localhost:5000/hdb/most_expensive_unit_by_town"
    );
  
    if (response.ok) {
      let data = await response.json();
  
      // format resale_price to 0 decimal places and thousand separators
      let temp = data.Result.map((item) => ({
        ...item,
        unit_sold: {
          ...item.unit_sold,
          resale_price: Number(item.unit_sold.resale_price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
      }));
  
      setMostExpensiveUnitByTown(temp);
      console.log(temp);
    }
  };
  

  const fetchCheapestUnitByTown = async () => {
    const response = await fetch(
      "http://localhost:5000/hdb/cheapest_unit_by_town"
    );

    if (response.ok) {
      let data = await response.json();

      // format resale_price to 0 decimal places and thousand separators
      let temp = data.Result.map((item) => ({
        ...item,
        unit_sold: {
          ...item.unit_sold,
          resale_price: Number(item.unit_sold.resale_price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },

      }));

      setCheapestUnitByTown(temp);
      console.log(temp);
    }
  };

  useEffect(() => {
    fetchTotalUnitSoldData();
    fetchAverageSqmPrice();
    fetchAverageLeaseRemaining();
    fetchAvgSqmPriceByHouseType();
    fetchMostExpensiveUnitByTown();
    fetchCheapestUnitByTown();
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
          {averageLeaseRemaining == 0 ? (
            <ScorecardPlaceholder />
          ) : (
            <Scorecard
              title="Average Lease Remaining"
              number={averageLeaseRemaining}
              unit="year"
            />
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <AveragePriceByHouseTypeCardList
            title="Average price/sqm by flat types"
            data={avgSqmPriceByHouseType}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CardList
            title="Most Expensive Unit Sold by Town"
            data={mostExpensiveUnitByTown}
          />
        </div>
        <div className="col">
          <CardList
            title="Cheapest Unit Sold by Town"
            data={cheapestUnitByTown}
          />
        </div>
      </div>
    </>
  );
};

export default Overview;
