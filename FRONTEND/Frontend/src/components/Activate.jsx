import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ match, verify }) => {
    const navigate = useNavigate();

    const [verified, setVerified] = useState(false);

    const verify_account = () => {
        // Use optional chaining to access route parameters safely
        const uid = match?.params?.uid;
        const token = match?.params?.token;
        console.log('UID:', uid);
        console.log('Token:', token);

        // Check if either uid or token is undefined
        if (uid === undefined || token === undefined) {
            console.error('UID and/or token is missing.');
            // You can handle the error here, for example, by displaying an error message to the user.
            return;
        }

        // Continue with verification if both uid and token are defined
        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        navigate('/');
    }

    return (
        <div className='container'>
            <div
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);

