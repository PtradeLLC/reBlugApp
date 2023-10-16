import { BarChart, Bar, Area, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


const data = [
    {
        "name": "Mon",
        "opened": 4000,
        "delivered": 2400
    },
    {
        "name": "Tue",
        "opened": 3000,
        "delivered": 1398
    },
    {
        "name": "Weds",
        "opened": 2000,
        "delivered": 9800
    },
    {
        "name": "Thurs",
        "opened": 2780,
        "delivered": 3908
    },
    {
        "name": "Fri",
        "opened": 1890,
        "delivered": 4800
    },
    {
        "name": "Sat",
        "opened": 1890,
        "delivered": 4800
    },
    {
        "name": "Sun",
        "opened": 1890,
        "delivered": 4800
    },
];

const EmailBarChart = () => {
    return (
        <AreaChart width={500} height={200} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="coloropened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colordelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="opened" stroke="#EF6262" fillOpacity={1} fill="#F8485E" />
            <Area type="monotone" dataKey="delivered" stroke="#82ca9d" fillOpacity={1} fill="url(#colordelivered)" />
        </AreaChart>
    );
}

export default EmailBarChart;