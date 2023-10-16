import { BarChart, Bar, Area, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


const data = [
    {
        "name": "Mon",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "Tue",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "Weds",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "Thurs",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "Fri",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Sat",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Sun",
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
            <Area type="monotone" dataKey="uv" stroke="#EF6262" fillOpacity={1} fill="#F8485E" />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
    );
}

export default EmailBarChart;