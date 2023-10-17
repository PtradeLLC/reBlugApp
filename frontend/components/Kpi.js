import { PolarGrid, Area, RadarChart, PolarAngleAxis, ResponsiveContainer, Legend, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart } from 'recharts';


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
        "subject": "Math",
        "A": 120,
        "B": 110,
        "fullMark": 150
    },
    {
        "subject": "Chinese",
        "A": 98,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "English",
        "A": 86,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "Geography",
        "A": 99,
        "B": 100,
        "fullMark": 150
    },
    {
        "subject": "Physics",
        "A": 85,
        "B": 90,
        "fullMark": 150
    },
    {
        "subject": "History",
        "A": 65,
        "B": 85,
        "fullMark": 150
    }
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
                <RadarChart outerRadius={90} width={730} height={250} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            )}
        </>
    );
}

export default EmailBarChart;