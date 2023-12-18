// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import {
//     COUNT_GUEST_VISITS_SUCCESS,
//     COUNT_GUEST_VISITS_FAIL,
//   } from '../actions/types';
  
//   // Initial state
//   const initialState = {
//     totalVisits: 0,
//     error: null,
//     ip: null,
//   };
  
//   // Reducer function
//   const guestVisitsReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case COUNT_GUEST_VISITS_SUCCESS:
//         return {
//           ...state,
//           totalVisits: action.payload.total_visits,
//           ip: action.payload.user_ip,
//           error: null, 
//         };
//       case COUNT_GUEST_VISITS_FAIL:
//         return {
//           ...state,
//           error: 'Failed to load guest visits', 
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default guestVisitsReducer;
  