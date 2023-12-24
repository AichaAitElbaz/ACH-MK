import {
  columnsDataDevelopment,
  columnsDataColumns,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import UsersTable from "./components/UsersTable";
import ProjectTable from "./components/ProjectTable";
import GuestTable from "./components/GuestTable";
import React, { useState, useEffect } from "react";

const Tables = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("URL_DE_VOTRE_BACKEND/users");
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
  }, []);
  return (
    <div>
      
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <UsersTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
         <GuestTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
         
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        
         <ProjectTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
      </div>


      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div> */}
    </div>
  );
};

export default Tables;
