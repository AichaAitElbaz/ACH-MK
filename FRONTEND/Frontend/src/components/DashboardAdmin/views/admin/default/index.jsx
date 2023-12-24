import MiniCalendar from "../../../components/calendar/MiniCalendar";
import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";


import Widget from "../../../components/widget/Widget";

import DailyTraffic from "./components/DailyTraffic";
import RecentGraphs from "./components/RecentGraphs";
import TaskCard from "./components/TaskCard";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(null);
  const [numberOfgraphs, setTotalGraphsCount] = useState(null);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    // Fonction pour récupérer le nombre d'utilisateurs depuis le backend
    const fetchNumberOfUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/account/api/count_users/");
        const data = await response.json();

        if (response.ok) {
          setNumberOfUsers(data.user_count);
        } else {
          console.error("Erreur lors de la récupération du nombre d'utilisateurs");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    const fetchTotalGraphsCount = async () => {
      try {
        const response = await fetch("http://localhost:8000/account/api/count_total_graphs/");
        const data = await response.json();

        if (response.ok) {
          setTotalGraphsCount(data.total_graphs_count);
        } else {
          console.error("Erreur lors de la récupération du nombre total de graphes");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };
  
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/account/api/users/");
          const data = await response.json();
  
          if (response.ok) {
            setUserData(data);
          } else {
            console.error("Erreur lors de la récupération des données utilisateur");
          }
        } catch (error) {
          console.error("Erreur réseau :", error);
        }
      };
  
      fetchData();
    // Appel des fonctions pour récupérer les données
    fetchNumberOfUsers();
    fetchTotalGraphsCount();;
  }, [])

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"number Of users"}
                   subtitle={numberOfUsers !== null ? numberOfUsers : "Loading..."}

        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"number of graphs"}
          subtitle={numberOfgraphs !== null ? numberOfgraphs : "Loading..."}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
         <div>	
          			<RecentGraphs />
	</div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <DailyTraffic />
        </div>

        {/* Complex Table , Task & Calendar */}

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;