import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import { DiApple } from "react-icons/di";
import { DiAndroid } from "react-icons/di";
import { DiWindows } from "react-icons/di";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import React, { useMemo,useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Progress from "../../../../components/progress";

const UsersTable = (props) => {
  const [userData, setUserData] = useState({ users: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/account/api/users/');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <Card extra={"w-full h-full p-4"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Users Table
        </div>
        <CardMenu />
      </div>

      <div class="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table
          className="mt-8 h-max w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
         <thead>
  <tr>
    <th className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700">
      <div className="text-xs font-bold tracking-wide text-gray-600">User ID</div>
    </th>
    <th className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700">
      <div className="text-xs font-bold tracking-wide text-gray-600">Name</div>
    </th>
    <th className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700">
      <div className="text-xs font-bold tracking-wide text-gray-600">Email</div>
    </th>
    <th className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700">
      <div className="text-xs font-bold tracking-wide text-gray-600">Date Joined</div>
    </th>
   
  </tr>
</thead>

<tbody>
  {userData.users.map((user) => (
    <tr key={user.id}>
      <td className="pt-[14px] pb-3 text-[14px]">
        <Link to={`/user/${user.id}`}>#{user.id}</Link>
      </td>
      <td className="pt-[14px] pb-3 text-[14px]">
        <Link to={`/email/${user.email}`}>{user.firstname} {user.lastname}</Link>
      </td>
      <td className="pt-[14px] pb-3 text-[14px]">{user.email}</td>
      <td className="pt-[14px] pb-3 text-[14px]">
        {format(new Date(user.date_joined), 'dd MMM yyyy')}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </Card>
  );
};

export default UsersTable;
