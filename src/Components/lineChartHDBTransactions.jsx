// install (please make sure versions match peerDependencies)
import { ResponsiveLine } from '@nivo/line'
// import { data } from "./sample-data/line-chart-sample-data";
import { useState, useEffect } from "react";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

function valuetext(value) {
    return `${value}`;
};

const MyResponsiveLine = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState([2017, 2023]);
    // const [originalData, setOriginalData] = useState([])

    const handleFetchData = async () => {
        const response = await fetch('http://127.0.0.1:5000/hdb/total_transactions_over_months');
        if (response.ok) {
            const temp = await response.json();
            // console.log(temp);
            setData(temp);
            // setOriginalData(temp);
        }
    }
    
    useEffect(() => {
        handleFetchData();
    },[])

    const handleChange = (event, newValue) => {
        // console.log(newValue);
        setValue(newValue);
        
        // console.log(originalData);
        // setData(originalData);

        // console.log(data[0].data);

        const result = data[0].data;

        // List of dictionary, filter for x values
        const selected = [];
        for (var i = value[0]; i <= value[1]; i++) {
            for (var j = 1; j <= 12; j++) {
                if (j < 10) {
                    selected.push(i.toString() + "-0" + j.toString());
                }
                else {
                    selected.push(i.toString() + "-" + j.toString());
                }
            }
        };
        
        // console.log(selected);
        const res = result.filter(({ x }) => selected.includes(x));

        // console.log(res);
        
        data[0].data = res;
        setData(data);

    };

    const reset = () => {
        console.log("reset");
        setValue([2017, 2023]);
        handleFetchData();
        // handleChange();
    };

    return (
        <div style={{height:"600px", marginBottom:"200px"}}>
            <div className="title">Filter based on Years</div>
            <Slider
                getAriaLabel={() => 'Year Range'}
                value={value}
                min={2017}
                max={2023}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
            <Button
            onClick={() => {reset()}}
            >
            Reset
            </Button>

            <h1>Total Transactions vs Months</h1>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 150, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: 'YYYY-MM',
                    legendOffset: 80,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -50,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default MyResponsiveLine;