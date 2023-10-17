import { BarChart, Bar, Area, RadialBar, RadialBarChart, ResponsiveContainer, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


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

const delivered_data = [
    {
        "Metrics": 20,
        "value": "Sentiment Analysis",
        "fill": "#704F4F"
    },
    {
        "Metrics": 20,
        "value": "Segmentation",
        "fill": "#DE8F5F"
    },
    {
        "Metrics": 20,
        "value": "Sending Time",
        "pv": 1398,
        "fill": "#6527BE"
    },
    {
        "Metrics": 20,
        "value": "Target Audience",
        "fill": "#352F44"
    },
    {
        "Metrics": 20,
        "value": "Bounced",
        "fill": "#D2001A"
    },
]

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
                            dataKey='Metrics'
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