import styles from "../style";
import { arrowUp } from "../assets";
import { Link } from 'react-scroll';
import GenerateForm from './GenerateForm'; // Assurez-vous d'importer correctement GenerateForm.jsx
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect  } from 'react';
import Modal from 'react-modal';
// import { loadGuestVisits } from "../actions/guest";
import { useNavigate } from "react-router-dom";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    backgroundColor:'#FCFEFE',
    transform: 'translate(-50%, -50%)',
    width: '100%', // Largeur du modal
    height: '100%', // Hauteur maximale du modal
    overflowY: 'auto', // Activation du défilement vertical si nécessaire
    padding: '20px', // Espacement intérieur du contenu du modal
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de l'arrière-plan du modal
  },
};
const GetStarted = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [visitorData, setVisitorData] = useState({ ip_address: '', visit_counter: 0 });
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateVisitor = async () => {
    try {
      const response = await fetch('http://localhost:8000/account/api/update_guest_visits/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error updating visitor:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Updated visitor:', data);

      const { ip_address, visit_counter } = data;

      // Set the values in the component state
      setVisitorData({ ip_address, visit_counter });
    } catch (error) {
      console.error('Error updating visitor:', error);
    }
  };

  useEffect(() => {
    updateVisitor();
  }, []);
  const openModal = () => {
    if (isAuthenticated || visitorData.visit_counter < 5) {
      setModalIsOpen(true);
    } else {
      navigate('/login')
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <div
        className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-schemes p-[2px] cursor-pointer`}
        onClick={openModal}
      >
        <div className={`${styles.flexCenter} flex-col bg-white w-[100%] h-[100%] rounded-full`}>
          <div className={`${styles.flexStart} flex-row`}>
            <p className="font-poppins font-medium text-[22px] leading-[23.4px]">
              <span className="text-gradient">Get</span>
            </p>
            {/* <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" /> */}
          </div>
          <p className="font-poppins font-medium text-[22px] leading-[23.4px]">
            <span className="text-gradient">Started</span>
          </p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Generate Form Modal"
        
      >
        <GenerateForm />
        <div className='flex justify-center '>
        <button onClick={closeModal} className={` w-56 py-3 px-6 m-3 font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px] outline-none ${styles}`}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
};


export default GetStarted;