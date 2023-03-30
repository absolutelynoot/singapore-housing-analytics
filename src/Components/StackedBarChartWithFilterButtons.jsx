import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
import "./styles/style.css";

const BarChart = () => {
  const [data, setData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const handleFetchData = async () => {
    const response = await fetch("http://127.0.0.1:5000/hdb/lease_data");
    if (response.ok) {
      const temp = await response.json();
      console.log(temp);
      setData(temp);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const newSelectedFilters = new Set(selectedFilters);
    if (newSelectedFilters.has(value)) {
      newSelectedFilters.delete(value);
    } else {
      newSelectedFilters.add(value);
    }
    setSelectedFilters(newSelectedFilters);
  };

  const filteredData =
    selectedFilters.size === 0
      ? data // show all data if no filter is selected
      : data.filter((d) => selectedFilters.has(d["Lease Bins"]));
      console.log(data);

  return (
    <div style={{ height: "400px" }}>
      <h2>HDB Lease Analysis</h2>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            value="94-90 years"
            checked={selectedFilters.has("94-90 years")}
            onChange={handleCheckboxChange}
          />
          94-90 years
        </label>
        <label>
          <input
            type="checkbox"
            value="89-85 years"
            checked={selectedFilters.has("89-85 years")}
            onChange={handleCheckboxChange}
          />
          89-85 years
        </label>
        <label>
          <input
            type="checkbox"
            value="79-75 years"
            checked={selectedFilters.has("79-75 years")}
            onChange={handleCheckboxChange}
          />
          79-75 years
        </label>
        <label>
          <input
            type="checkbox"
            value="74-70 years"
            checked={selectedFilters.has("74-70 years")}
            onChange={handleCheckboxChange}
          />
          74-70 years
        </label>
        <label>
          <input
            type="checkbox"
            value="69-65 years"
            checked={selectedFilters.has("69-65 years")}
            onChange={handleCheckboxChange}
          />
          69-65 years
        </label>
        <label>
          <input
            type="checkbox"
            value="64-60 years"
            checked={selectedFilters.has("64-60 years")}
            onChange={handleCheckboxChange}
          />
          64-60 years
        </label>
        <label>
          <input
            type="checkbox"
            value="59-55 years"
            checked={selectedFilters.has("59-55 years")}
            onChange={handleCheckboxChange}
          />
          59-55 years
        </label>
        <label>
          <input
            type="checkbox"
            value="54-50 years"
            checked={selectedFilters.has("54-50 years")}
            onChange={handleCheckboxChange}
          />
          54-50 years
        </label>
        <label>
          <input
            type="checkbox"
            value="49-45 years"
            checked={selectedFilters.has("49-45 years")}
            onChange={handleCheckboxChange}
          />
          49-45 years
        </label>
        <label>
          <input
            type="checkbox"
            value="44-40 years"
            checked={selectedFilters.has("44-40 years")}
            onChange={handleCheckboxChange}
          />
          44-40 years
        </label>
      </div>
      <ResponsiveBar
        data={filteredData}
        keys={[
            "EXECUTIVE", 
            "MULTI-GENERATION", 
            "5 ROOM", 
            "4 ROOM", 
            "3 ROOM", 
            "2 ROOM", 
            "1 ROOM"
          ]}
        indexBy="Lease Bins"
        margin={{ top: 50, right: 120, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "set1" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Lease Bins",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: "Average Resale Price per Square Meter ($)",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default BarChart;
