// install (please make sure versions match peerDependencies)
import { ResponsiveLine } from "@nivo/line";
// import { data } from "./sample-data/line-chart-sample-data";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import MultiSelect from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const lineChartRoomTown = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFetchData = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/hdb/room_town_avg_price_over_months"
    );
    if (response.ok) {
      const temp = await response.json();
      // console.log(temp);
      setData(temp);
      setOriginalData(temp);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const reset = () => {
    console.log("reset");
    setValue([2017, 2023]);
    handleFetchData();
    // handleChange();
  };

  // create xValues list to contain 2017 to 2023 in YYYY-MM format

  function generateDates(startYear, endYear) {
    const startDate = new Date(startYear, 0); // January 1st of startYear
    const endDate = new Date(endYear + 1, 0); // January 1st of endYear + 1 (to include endYear)
    const months = [];
    for (
      let date = startDate;
      date < endDate;
      date.setMonth(date.getMonth() + 1)
    ) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // zero-padding month
      const formattedDate = `${year}-${month}`;
      months.push(formattedDate);
    }
    return months;
  }

  const xValues = generateDates(2017, 2023);

  const options = [];

  for (var i = 0; i < originalData.length; i++) {
    options.push({
      label: originalData[i]["id"],
      value: originalData[i]["id"],
    });
  }

  // sort options based on label
  options.sort((a, b) => (a.label > b.label ? 1 : -1));

  // const options = temp_options;

  const handleSelectedOptionsChange = (event, value) => {
    setSelectedOptions(value);

    if (value.length == 0) {
      console.log("reset");
      // setData(originalData);
    } else {
      const result = originalData;
      // console.log(originalData);

      const filters = [];
      for (var i = 0; i < value.length; i++) {
        filters.push(value[i].value);
      }

      const filteredData = result.filter((d) => filters.includes(d["id"]));

      setData(filteredData);
    }
  };

  return (
    <>
      <h3>Search for price over months of estates</h3>
      <div>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.label}
          filterOptions={(options, state) =>
            options.filter((option) =>
              option.label
                .toLowerCase()
                .includes(state.inputValue.toLowerCase())
            )
          }
          onChange={handleSelectedOptionsChange}
          value={selectedOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select options"
              placeholder="Options"
            />
          )}
        />
      </div>
      {selectedOptions.length == 0 && (
        <div className="alert alert-info my-3 align-items-center d-flex" role="alert" style={{height:"100px"}}>
          <span className="me-3"><FontAwesomeIcon icon={faCircleInfo} /></span>Please select a town from the filter above.
        </div>
      )}
      {selectedOptions.length > 0 && (
        <div style={{ height: "600px" }}>
          <h1>Town-Room average price per sqm over Months</h1>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 200, bottom: 150, left: 60 }}
            xScale={{
              type: "time",
              format: "%Y-%m",
              precision: "month",
            }}
            xFormat="time:%Y-%m"
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "YYYY-MM",
              legendOffset: 80,
              legendPosition: "middle",
              tickValues: xValues.map((x) => new Date(x)),
              format: "%b %Y",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Avg Price per sqm ($)",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default lineChartRoomTown;
