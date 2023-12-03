import CardMenu from "../../../../components/card/CardMenu";
import React from "react";
import Checkbox from "../../../../components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "../../../../components/card";
import { MdCreate } from "react-icons/md";


const TaskCard = () => {
  return (
    <Card extra="pb-7 p-[20px]">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Free Uses
          </h4>
        </div>
       
      </div>

      {/* task content */}

      <div className="h-full w-full">

      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center ">
        <p className="font-dm text-sm font-medium text-gray-600">Set monthly limit for free graph generation to manage usage.</p>
      </div>

    <Card className="justify-evenly m-4 bg-lightPrimary-100 flex ">
      <div className="h-160 w-16 ml-4 flex  flex-col justify-center rounded-lg bg-white p-3 dark:bg-navy-700">
        <p className=" justify-items-center font-dm text-lg font-medium text-gray-600">4</p>
        <hr />
      
      </div>
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center ">
        <div className="rounded-full bg-white p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <button>
            <MdCreate className="h-7 w-7" />

            </button>
          </span>
        </div>
      </div>

     
    </Card>

        <div >

        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
