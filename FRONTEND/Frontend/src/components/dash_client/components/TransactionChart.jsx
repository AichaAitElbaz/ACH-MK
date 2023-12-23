import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function TransactionChart() {
  const [monthlyGraphData, setMonthlyGraphData] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assurez-vous d'ajuster l'URL selon votre configuration Django
        const response = await axios.get(`http://localhost:8000/account/user-monthly-graphs/${user.id}/`);
		console.log(response.data.monthlyGraphs)
        setMonthlyGraphData(response.data.monthlyGraphs);
      } catch (error) {
        console.error('Error fetching monthly graph data:', error);
      }
    };

    if (user.id) {
		console.log('rien')
      fetchData();
    }
  }, [user]);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Graphs</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={monthlyGraphData}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="graphCount" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}