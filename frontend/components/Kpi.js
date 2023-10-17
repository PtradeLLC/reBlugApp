import { Area, Legend, XAxis, YAxis, ScatterChart, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


const alldata = [
    {
        "name": "Mon",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
    {
        "name": "Tue",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
    {
        "name": "Weds",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
    {
        "name": "Thurs",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
    {
        "name": "Fri",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
    {
        "name": "Sat",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
    {
        "name": "Sun",
        "delivered": 0,
        "opened": 0,
        "clicked": 0
    },
];

const delever_01 = [
    {
        "x": 100,
        "y": 200,
        "z": 200
    },
    {
        "x": 120,
        "y": 100,
        "z": 260
    },
    {
        "x": 170,
        "y": 300,
        "z": 400
    },
    {
        "x": 140,
        "y": 250,
        "z": 280
    },
    {
        "x": 150,
        "y": 400,
        "z": 500
    },
    {
        "x": 110,
        "y": 280,
        "z": 200
    }
];
const delever_02 = [
    {
        "x": 200,
        "y": 260,
        "z": 240
    },
    {
        "x": 240,
        "y": 290,
        "z": 220
    },
    {
        "x": 190,
        "y": 290,
        "z": 250
    },
    {
        "x": 198,
        "y": 250,
        "z": 210
    },
    {
        "x": 180,
        "y": 280,
        "z": 260
    },
    {
        "x": 210,
        "y": 220,
        "z": 230
    }
];

const EmailBarChart = ({ name }) => {

    return (
        <>
            {name === "Processed" && (
                <AreaChart width={500} height={200} data={alldata}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colordelivered" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="coloropened" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorclicked" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>

                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="delivered" stroke="#82ca9d" fillOpacity={1} fill="url(#colordelivered)" />
                    <Area type="monotone" dataKey="opened" stroke="#EF6262" fillOpacity={1} fill="#F8485E" />
                    <Area type="monotone" dataKey="clicked" stroke="#EF6262" fillOpacity={1} fill="#F8485E" />
                </AreaChart>
            )}
            {name === "Delivered" && (
                <ScatterChart
                    width={730}
                    height={250}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 10,
                        left: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" type="number" name="stature" unit="cm" />
                    <YAxis dataKey="y" type="number" name="weight" unit="kg" />
                    <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="A school" data={delever_01} fill="#8884d8" />
                    <Scatter name="B school" data={delever_02} fill="#82ca9d" />
                </ScatterChart>
            )}
        </>
    );
}

export default EmailBarChart;