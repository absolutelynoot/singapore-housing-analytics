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
      : data.filter((d) => {
      for (const key of selectedFilters) {
        if (d[key]) {
          return true;
        }
      }
      return false;
    });

  return (
    <div style={{ height: "400px" }}>
      <h2>HDB Lease Analysis</h2>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            value="EXECUTIVE"
            checked={selectedFilters.has("EXECUTIVE")}
            onChange={handleCheckboxChange}
          />
          EXECUTIVE
        </label>
        <label>
          <input
            type="checkbox"
            value="MULTI-GENERATION"
            checked={selectedFilters.has("MULTI-GENERATION")}
            onChange={handleCheckboxChange}
          />
          MULTI-GENERATION
        </label>
        <label>
          <input
            type="checkbox"
            value="5 ROOM"
            checked={selectedFilters.has("5 ROOM")}
            onChange={handleCheckboxChange}
          />
          5 ROOM
        </label>
        <label>
          <input
            type="checkbox"
            value="4 ROOM"
            checked={selectedFilters.has("4 ROOM")}
            onChange={handleCheckboxChange}
          />
          4 ROOM
        </label>
        <label>
          <input
            type="checkbox"
            value="3 ROOM"
            checked={selectedFilters.has("3 ROOM")}
            onChange={handleCheckboxChange}
          />
          3 ROOM
        </label>
        <label>
          <input
            type="checkbox"
            value="2 ROOM"
            checked={selectedFilters.has("2 ROOM")}
            onChange={handleCheckboxChange}
          />
          2 ROOM
        </label>
        <label>
          <input
            type="checkbox"
            value="1 ROOM"
            checked={selectedFilters.has("1 ROOM")}
            onChange={handleCheckboxChange}
          />
          1 ROOM
        </label>
      </div>
      <ResponsiveBar
        data={filteredData}
        keys={Array.from(selectedFilters)}
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
