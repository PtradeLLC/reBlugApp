import { Area, Scatter, ZAxis, Legend, XAxis, YAxis, ScatterChart, CartesianGrid, Tooltip, AreaChart } from 'recharts';


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
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    }
];
const delever_02 = [
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    },
    {
        "x": 0,
        "y": 0,
        "z": 0
    }
];

const EmailBarChart = ({ name }) => {

    // Converion = Total number of Contacts
    // Delivered = Total number of delivered emails
    // Conversion rate = (Number of conversions / Total number of delivered emails) * 100%
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
                    width={250}
                    height={200}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 10,
                        left: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" type="number" name="Delivered" unit="" />
                    <YAxis dataKey="y" type="number" name="Conversions" unit="" />
                    <ZAxis dataKey="z" type="number" range={[64, 144]} name="Conversion rate" unit="" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Conversion" data={delever_01} fill="#CD1818" />
                    <Scatter name="Delivered" data={delever_02} fill="#1F8A70" />
                </ScatterChart>
            )}
        </>
    );
}

export default EmailBarChart;