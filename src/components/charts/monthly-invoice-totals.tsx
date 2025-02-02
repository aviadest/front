import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchMonthlyInvoiceTotals } from '../../services/api.service';

interface MonthlyInvoiceTotalsProps {
    filterString?: string;
}

const MonthlyInvoiceTotalsChart: React.FC<MonthlyInvoiceTotalsProps> = ({ filterString }) => {
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
        const res = await fetchMonthlyInvoiceTotals(filterString);
        if (res) {
            const data = res.map((item: any) => ({
                ...item,
                total_amount: parseFloat(item.total_amount),
                month: new Date(item.month),
            })).sort((a: any, b: any) => a.month - b.month);
            setChartData(data);
        }
    };

    return (
        <section>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
            <h1>Monthly Invoice Totals</h1>

            {toggle ? (
                <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(date) => date.toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_amount" fill="#82ca9d" />
                </BarChart>
            ) : (
                <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_amount" stroke="#8884d8" />
                </LineChart>
            )}
        </section>
    );
};

export default MonthlyInvoiceTotalsChart;
