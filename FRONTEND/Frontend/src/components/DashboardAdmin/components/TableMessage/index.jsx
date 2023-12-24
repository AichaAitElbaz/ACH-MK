import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import person from '../../Data/img/person.png';

export function MessageTable() {
  const [adminMessages, setAdminMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const getAdminMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/account/get-all-messages/`);
        setAdminMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching admin messages:', error);
      }
    };

    getAdminMessages();
  }, []);

  const TABLE_HEAD = ["Sender", "Message", "Date", "Phone"];

  return (
    <>
      <Card className="h-full w-full dark:bg-[#0b1437]">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-0 flex items-center justify-between gap-2 dark:bg-[#0b1437]">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-left">
                Messages
              </Typography>
              <Typography className="text-sm text-color-gray-400 py-2">
                See All Messages ordered by time
              </Typography>
            </div>
          </div>
        </CardHeader>

        <CardBody className="px-0">
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
              {adminMessages.map(({ sender_email,firstname, lastname,phone_number,  message, date_sent }, index) => {
                const isLast = index === adminMessages.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50  dark:border-darkBlue";

                return (
                  <tr key={`${firstname} ${lastname}`}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={person} alt={`${firstname} ${lastname}`} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {`${firstname} ${lastname}`}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {sender_email}
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
                        {date_sent}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phone_number}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
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
    </>
  );
}