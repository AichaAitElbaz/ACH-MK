import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Indique à react-modal où est l'élément racine de l'application

export default function Message() {
  const user = useSelector(state => state.auth.user);
  const [userMessages, setUserMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const getUserMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/account/get-user-messages/${user.email}/`);
        setUserMessages(response.data.user_messages);
      } catch (error) {
        console.error('Error fetching user messages:', error);
      }
    };

    if (user) {
      getUserMessages();
    }
  }, [user]);

  const handleClickMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">User's Contact Form Data</strong>
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
            {userMessages.map((data) => (
              <tr key={data.id} onClick={() => handleClickMessage(data.message)}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.sender_email}</td>
                <td>{data.phone_number}</td>
                <td>{data.message.substring(0, 50)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!selectedMessage}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
            padding: '20px',
          },
        }}
      >
        <div>
          <strong>Full Message</strong>
        </div>
        <div>{selectedMessage}</div>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
}