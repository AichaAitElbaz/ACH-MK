import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { load_user_graph_number, load_user_file_number } from '../../../actions/user';
import { load_user } from '../../../actions/auth';
import axios from 'axios';  


export default function DashboardStatsGrid() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const [userGraphsCount, setUserGraphsCount] = useState(0);
  
	useEffect(() => {
	  const fetchUserGraphsCount = async () => {
		try {
		  // Ajoutez l'URL correcte pour accéder à votre endpoint Django
		  const response = await axios.get(`http://localhost:8000/account/count-user-graphs/${user.id}/`);
		  setUserGraphsCount(response.data.graphs_count);
		} catch (error) {
		  console.error('Error fetching user graphs count:', error);
		}
	  };
  
	  if (user) {
		fetchUserGraphsCount();
	  }
	}, [user]);
	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Graphs</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{userGraphsCount}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Files</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Spend</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">$12313</strong>
						<span className="text-sm text-red-500 pl-2">-30</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">16432</strong>
						<span className="text-sm text-red-500 pl-2">-43</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
