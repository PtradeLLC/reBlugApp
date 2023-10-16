import { BarChart, Bar, Area, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


const data = [
    {
        "name": "Mon",
        "opened": 0,
        "delivered": 0
    },
    {
        "name": "Tue",
        "opened": 0,
        "delivered": 0
    },
    {
        "name": "Weds",
        "opened": 0,
        "delivered": 0
    },
    {
        "name": "Thurs",
        "opened": 0,
        "delivered": 0
    },
    {
        "name": "Fri",
        "opened": 0,
        "delivered": 0
    },
    {
        "name": "Sat",
        "opened": 0,
        "delivered": 0
    },
    {
        "name": "Sun",
        "opened": 0,
        "delivered": 0
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