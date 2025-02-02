import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchTotalsByStatus } from '../../services/api.service';


interface TotalsByStatusProps {
    filterString?: string;
}


const TotalsByStatusChart: React.FC<TotalsByStatusProps> = ({ filterString }) => {




    const [chartData, setChartData] = useState<any[]>([]);
    const [searchString, setSearchString] = useState('');





    useEffect(() => {
        if (filterString && filterString !== searchString) {


            fetchData(filterString);
            setSearchString(filterString);
        }

    }, [filterString])

    const fetchData = async (filterString: string) => {
        const res = await fetchTotalsByStatus(filterString)
        if (res) {
            const data = res.map((item: any) => ({
                ...item,
                total_amount: parseFloat(item.total_amount),
            }));
            setChartData(data)
        }
    }




    const [toggle, setToggle] = useState(false);



    return (
        <section>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
            <h1>Totals By Status</h1>


            {toggle ? (
                <PieChart width={400} height={400}>
                    <Pie data={chartData} dataKey="total_amount" nameKey="status" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_amount" fill="#82ca9d" />
                </BarChart>
            )}
        </section>
    );








}

export default TotalsByStatusChart;
