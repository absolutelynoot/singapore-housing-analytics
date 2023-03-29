import { ResponsiveBar } from "@nivo/bar";
import { data } from "./sample-data/bar-chart-sample-data";
import { useState, useEffect } from "react";

const BarChartHDBAveragePriceSqm = () => {
  const [data, setData] = useState([]);

  const handleFetchData = async () => {
    const response = await fetch("http://127.0.0.1:5000/hdb/town_vs_avg_price");
    if (response.ok) {
      const temp = await response.json();
      setData(temp);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div style={{ height: "600px", marginBottom:"200px"}}>
      <h2>Town vs Average price per sqm</h2>
      <ResponsiveBar
        data={data}
        keys={["avg_resale_price_sqm"]}
        indexBy="town"
        margin={{ top: 50, right: 130, bottom: 150, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
  
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}

        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legend: "town",
          legendPosition: "middle",
          legendOffset: 100,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Average per sqm",
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

export default BarChartHDBAveragePriceSqm;
