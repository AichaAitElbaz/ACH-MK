import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { load_user } from '../../../actions/auth';
import axios from 'axios';  


export default function DashboardStatsGrid() {
	const dispatch = useDispatch();
	const userId = useSelector(state => state.auth.user.id);
	const [userGraphsCount, setUserGraphsCount] = useState(0);
	const [userFilesCount, setUserFilesCount] = useState(0);


    useEffect(() => {
        const fetchUserGraphsCount = async () => {
            try {
                const response = await fetch(`http://localhost:8000/account/api/count_user_graphs/${userId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setUserGraphsCount(data.user_graphs_count);
                } else {
                    // Handle non-successful response
                    console.error('Error fetching user graphs count:', response.statusText);
                }
            } catch (error) {
                // Handle fetch error
                console.error('Error fetching user graphs count:', error);
            }
        };
		const fetchUserFilesCount = async () => {
            try {
                const response = await fetch(`http://localhost:8000/account/api/count_user_files/${userId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setUserFilesCount(data.user_files_count);
                } else {
                    // Handle non-successful response
                    console.error('Error fetching user files count:', response.statusText);
                }
            } catch (error) {
                // Handle fetch error
                console.error('Error fetching user files count:', error);
            }
        };

        fetchUserGraphsCount();
		fetchUserFilesCount();
    }, [userId]);

 
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
						<strong className="text-xl text-gray-700 font-semibold">{userFilesCount}</strong>
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
