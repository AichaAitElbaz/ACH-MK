import CheckTable from "./components/CheckTable";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
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
    

      </div>
    </div>
  );
};

export default Tables;
