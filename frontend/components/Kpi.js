import { BarChart, Bar, Area, RadialBar, RadialBarChart, ResponsiveContainer, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return Math.abs(hash);
};

const alldata = [
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

const delivered_data = [
    {
        "name": 'sentiment Analysis',
        "value": 93,
        "fill": `#${hashCode("18-24").toString(16).substring(0, 6)}`
        // "fill": "#8884d8"
        // "uv": 31.47,
        // "pv": 2400,

    },
    {
        "name": 25,
        "uv": 26.69,
        "pv": 4567,
        "fill": "#83a6ed"
    },
    {
        "name": 34,
        "uv": -15.69,
        "pv": 1398,
        "fill": "#8dd1e1"
    },
    {
        "name": 39,
        "uv": 8.22,
        "pv": 9800,
        "fill": "#82ca9d"
    },
]

const EmailBarChart = ({ name }) => {

    return (
        <>
            {name === "Processed" && (
                <AreaChart width={500} height={200} data={alldata}
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
            )}
            {name === "Delivered" && (
                <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart
                        innerRadius="50%"
                        outerRadius="100%"
                        data={delivered_data}
                        startAngle={180}
                        endAngle={0}
                        barSize={40}

                    >
                        <RadialBar
                            minAngle={15}
                            background
                            clockWise
                            dataKey='name'
                        />
                        <Legend
                            width="100%"
                            height={29}
                            layout='horizontal'
                            verticalAlign='bottom'
                            align="center"
                        />
                        <Tooltip />
                    </RadialBarChart>
                </ResponsiveContainer>
            )}
        </>
    );
}

export default EmailBarChart;