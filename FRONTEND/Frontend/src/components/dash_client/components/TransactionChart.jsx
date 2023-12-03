import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Graphs: 4000,
		Files: 2400
	},
	{
		name: 'Feb',
		Graphs: 3000,
		Files: 1398
	},
	{
		name: 'Mar',
		Graphs: 2000,
		Files: 9800
	},
	{
		name: 'Apr',
		Graphs: 2780,
		Files: 3908
	},
	{
		name: 'May',
		Graphs: 1890,
		Files: 4800
	},
	{
		name: 'Jun',
		Graphs: 2390,
		Files: 3800
	},
	{
		name: 'July',
		Graphs: 3490,
		Files: 4300
	},
	{
		name: 'Aug',
		Graphs: 2000,
		Files: 9800
	},
	{
		name: 'Sep',
		Graphs: 2780,
		Files: 3908
	},
	{
		name: 'Oct',
		Graphs: 1890,
		Files: 4800
	},
	{
		name: 'Nov',
		Graphs: 2390,
		Files: 3800
	},
	{
		name: 'Dec',
		Graphs: 3490,
		Files: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Graphs</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Graphs" fill="#0ea5e9" />
						<Bar dataKey="Files" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
