import { ResponsiveBar } from "@nivo/bar";
// import { data } from "./sample-data/stacked-bar-chart-sample-data-lease";
import { useState, useEffect } from "react";

const BarChart = () => {
  const [data, setData] = useState([])

    const handleFetchData = async () => {
        const response = await fetch('http://127.0.0.1:5000/hdb/lease_data');
        if (response.ok) {
            const temp = await response.json();
            console.log(temp);
            setData(temp);
        }
    }
    
    useEffect(() => {
        handleFetchData();
    },[])

  return (
    <div style={{ height: "500px" }}>
      <h2>HDB Lease Analysis</h2>
      <ResponsiveBar
        data={data}
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
