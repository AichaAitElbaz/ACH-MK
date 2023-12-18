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
              <th className="text-center">First Name</th>
              <th className="text-center">Last Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Message</th>
            </tr>
          </thead>
          <tbody>
            {contactFormData.map((data) => (
              <tr key={data.id}>
                <td className="text-center">{data.firstName}</td>
                <td className="text-center">{data.lastName}</td>
                <td className="text-center">{data.email}</td>
                <td className="text-center">{data.phoneNumber}</td>
                <td className="text-center">{data.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
