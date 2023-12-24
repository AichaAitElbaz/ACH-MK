import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify }) => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [verified, setVerified] = useState(false);

  const verifyAccount = async () => {
    console.log('UID:', uid);
    console.log('Token:', token);

    if (!uid || !token) {
      console.error('UID and/or token is missing.');
      // Handle the error here, for example, by displaying an error message to the user.
      return;
    }

    try {
      await verify(uid, token);
      setVerified(true);
    } catch (error) {
      console.error('Error during verification:', error);
      // Handle the verification error, for example, by displaying an error message to the user.
    }
  };

  useEffect(() => {
    if (verified) {
      navigate('/');
    }
  }, [verified, navigate]);

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: '200px' }}
      >
        <h1>Verif your Account:</h1>
        <button
          onClick={verifyAccount}
          style={{ marginTop: '50px' }}
          type="button"
          className="btn btn-primary"
        >
          Verifybae
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);


