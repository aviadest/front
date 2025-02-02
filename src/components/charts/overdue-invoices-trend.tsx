


import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchOverdueInvoicesTrend } from '../../services/api.service';

interface OverdueInvoicesTrendProps {
    filterString?: string;
}


const OverdueInvoicesTrendChart: React.FC<OverdueInvoicesTrendProps> = ({ filterString }) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [toggle, setToggle] = useState(false);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        if (filterString && filterString !== searchString) {
            fetchData(filterString);
            setSearchString(filterString);
        }
    }, [filterString]);

    const fetchData = async (filterString: string) => {
        const res = await fetchOverdueInvoicesTrend(filterString);
        if (res) {
            const data = res.map((item: any) => ({
                ...item,
                total_amount: parseFloat(item.total_amount),
                month: new Date(item.month),
                overdue_count: parseInt(item.overdue_count, 10),
            })).sort((a: any, b: any) => a.month - b.month);
            setChartData(data);
        }
    };

    return (
        <section>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
            <h1>Overdue Invoices Trend</h1>
            {toggle ? (
                <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="overdue_count" stroke="#8884d8" />
                </LineChart>
            ) : (
                <AreaChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="overdue_count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            )}
        </section>
    );
};

export default OverdueInvoicesTrendChart;
