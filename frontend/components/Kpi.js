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

const bounced = [
    {
        "email_sent": 10000,
        "num_bounced": 100,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    }
];
const delivered = [
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    },
    {
        "email_sent": 0,
        "num_bounced": 0,
        "z": Number("num_bounced" / "email_sent") * 100
    }
];


// Formula:
// Conversion = Total number of Email Contacts
// Delivered = Total number of delivered emails
// Conversion rate = (Number of conversions / Total number of delivered emails) * 100%
const convRate = bounced.map((index) => {
    const conversion_Rate = Number(index.y / index.x) * 100;
    index.z = conversion_Rate;
    return index
});

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
                    <XAxis className='text-xs' dataKey="email_sent" type="number" name="Delivered" unit="" />
                    <YAxis className='text-sm' dataKey="num_bounced" type="number" name="Conversions" unit="" />
                    <ZAxis className='text-xs' dataKey="z" type="number" range={[0, 100]} name="BR" unit="%" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter className='text-sm' name="Bounced" data={bounced} fill="#CD1818" />
                    <Scatter className='text-sm' name="Delivered" data={delivered} fill="#1F8A70" />
                    <Scatter className='text-sm' name="BR - Bounce Rate" data={delivered} fill="#2B3A55" />
                </ScatterChart>
            )}
        </>
    );
}

export default EmailBarChart;