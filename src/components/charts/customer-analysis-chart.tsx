import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchCustomerAnalysis } from '../../services/api.service';

interface CustomerAnalysisProps {
    filterString?: string;
}

const CustomerAnalysisChart: React.FC<CustomerAnalysisProps> = ({ filterString }) => {
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
        const res = await fetchCustomerAnalysis(filterString);
        if (res) {
            const data = res.map((item: any) => ({
                ...item,
                total_amount: parseFloat(item.total_amount),
            })).sort((a: any, b: any) => b.total_amount - a.total_amount);
            setChartData(data);
        }
    };


    return (
        <section>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
            <h1>Customer Analysis</h1>
            {toggle ? (
                <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customer" interval={0} angle={-45} textAnchor="end" height={80} /> {/* Rotated labels */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_amount" fill="#82ca9d" />
                </BarChart>
            ) : (
                <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customer" interval={0} angle={-45} textAnchor="end" height={80} /> {/* Rotated labels */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_amount" stroke="#8884d8" />
                </LineChart>
            )}
        </section>
    );
};

export default CustomerAnalysisChart;
