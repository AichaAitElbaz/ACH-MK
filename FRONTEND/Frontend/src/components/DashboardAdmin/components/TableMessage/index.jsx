import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import React from 'react';
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import person from '../../Data/img/person.png'
   

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];
   
  const TABLE_HEAD = ["Member", "Message", "Date", "Reply"];
   
  const TABLE_ROWS = [
    {
      
      name: "John Michael",
      email: "john@creative-tim.com",
      message: "Hello, I'm experiencing an issue with the generation",
      date: "23/04/18",
    },
    {
      
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      message: "Organization",
      date: "23/04/18",
    },
    {
     
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      message: "Organization",
      date: "19/09/17",
    },
    {
      
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      message: "Organization",
      date: "24/12/08",
    },
    {
      
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      message: "Organization",
      date: "04/10/21",
    },
  ];
   
  export function MessageTable() {
    return (
        <>
      <Card className="h-full w-full dark:bg-[#0b1437]">
        <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-0 flex items-center justify-between gap-2 dark:bg-[#0b1437]">
          <div>
            <Typography variant="h5" color="blue-gray" className="text-left">
              Messages
            </Typography>
             <Typography   className="text-sm text-color-gray-400 py-2">
              See All Messages ordered by time
            </Typography>
         </div>
         
        </div>
       
      </CardHeader>
 
        
        <CardBody className=" px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-gray-50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-[#1d233ecb]  dark:border-darkBlue"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ name, email, message, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50  dark:border-darkBlue";
   
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={person} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {message}
                          </Typography>
                        </div>
                      </td>
                     
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 dark:border-darkBlue">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" className="dark:border-darkBlue dark:text-darkBlue">
              Previous
            </Button>
            <Button variant="outlined" size="sm" className="dark:border-darkBlue dark:text-darkBlue">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* {isModalOpen && (
      <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">

      <!-- hoverlay  -->
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
  
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <!-- Add modal content here -->
          <div class="modal-content py-4 text-left px-6">
              <div class="flex justify-between items-center pb-3">
                  <p class="text-2xl font-bold">Modal Title</p>
                  <div class="modal-close cursor-pointer z-50">
                      <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                          viewBox="0 0 18 18">
                          <path d="M1.39 1.393l15.318 15.314m-15.318 0L16.706 1.393" />
                      </svg>
                  </div>
              </div>
              <p>Modal content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at purus urna.
                  Vestibulum nec erat in diam rutrum posuere. Fusce gravida orci nec mi volutpat euismod. Proin aliquet,
                  lacus sit amet egestas rhoncus, turpis nulla laoreet urna, nec ultricies nibh urna eu sapien. </p>
  
              <div class="mt-4 flex justify-end">
                  <button class="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200">Cancel</button>
                  <button class="px-4 bg-purple-500 p-3 ml-3 rounded-lg text-white hover:bg-purple-400">Save</button>
              </div>
          </div>
      </div>
  
  </div>
   )}
   */}
  </>
    );
  }