import { BarChart, Bar, Area, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Page F",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Page G",
        "uv": 1890,
        "pv": 4800
    },
];

const EmailBarChart = () => {
    return (
        <AreaChart width={500} height={200} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#F8485E" fillOpacity={1} fill="url(#EF6262)" />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
        // <BarChart width={500} height={200} data={data}>
        //     <CartesianGrid strokeDasharray="3 3" />
        //     <XAxis dataKey="name" />
        //     <YAxis />
        //     <Tooltip />
        //     <Legend />
        //     <Bar dataKey="uv" fill="#E43F5A" />
        //     <Bar dataKey="pv" fill="#67BA6D" />
        // </BarChart>
    );
}

export default EmailBarChart;