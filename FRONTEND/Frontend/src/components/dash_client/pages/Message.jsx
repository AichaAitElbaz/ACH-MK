import React from 'react';

const contactFormData = [
  {
    id: 1,
    firstName: 'Kaoutar',
    lastName: 'MRHAR',
    email: 'kaoutarmrhar@gmail.com',
    phoneNumber: '123-456-7890',
    message: 'This is a sample message.',
  },
];

export default function Message() {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Contact Form Data</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contactFormData.map((data) => (
              <tr key={data.id}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
