import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { useState, useEffect } from "react";
import { data } from "./sample-data/swarmplot-sample-data";

const MyResponsiveSwarmPlot = () => {
    const [data, setData] = useState([]);

    const handleFetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/hdb/avg_lease_remaining_by_town");
        if (response.ok) {
        const temp = await response.json();
        setData(temp);
        }
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <div style={{ height: "400px" }}>
        <ResponsiveSwarmPlot
        data={data}
        groups={[ '80-90 years', '70-79 years', '60-69 years', '50-59 years' ]}
        identity="town"
        value="avg_resale_price_sqm"
        valueFormat="$.2f"
        valueScale={{ type: 'linear', min: 0, max: 8000, reverse: false }}
        size={{
            key: 'avg_remaining_lease',
            values: [
                4,
                20
            ],
            sizes: [
                1,
                7
            ]
        }}
        spacing={2}
        layout="vertical"
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ],
                [
                    'opacity',
                    0.5
                ]
            ]
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisTop={{
            orient: 'top',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group if vertical, price if horizontal',
            legendPosition: 'middle',
            legendOffset: -46
        }}
        axisRight={{
            orient: 'right',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price if vertical, group if horizontal',
            legendPosition: 'middle',
            legendOffset: 76
        }}
        axisBottom={{
            orient: 'bottom',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group if vertical, price if horizontal',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price if vertical, group if horizontal',
            legendPosition: 'middle',
            legendOffset: -76
        }}
    />
    </div>
    );
};
    
export default MyResponsiveSwarmPlot;
