import React from 'react'
import { Chart } from 'react-charts'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function TemperatureChart(props){
    return (
            <LineChart width={600} height={300} data={props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            style={{backgroundColor: 'rgba(185, 201, 195, 0.8', width: "620px", height: "320px", borderRadius: "5px", padding: "10px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Line type="monotone" dataKey="highest" stroke="#ed0e0e" />
                <Line type="monotone" dataKey="lowest" stroke="#190eed" />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                  <Legend />
            </LineChart>
    );
}
