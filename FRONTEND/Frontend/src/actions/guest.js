// import axios from 'axios';
// import {
  
//     COUNT_GUEST_VISITS_SUCCESS,
//     COUNT_GUEST_VISITS_FAIL,
// } from './types';




//   export const loadGuestVisits = () => async dispatch => {
//       if (localStorage.getItem('access')) {
//           const config = {
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `JWT ${localStorage.getItem('access')}`,
//                   'Accept': 'application/json'
//               }
//           }; 
  
//           try {
//               const res = await axios.get(`http://localhost:8000/api/count_guest_visits/`, config);
//               dispatch({
//                 type: COUNT_GUEST_VISITS_SUCCESS,
//                 payload: res.data
//               });
//           } catch (err) {
//               dispatch({
//                 type: COUNT_GUEST_VISITS_FAIL,
//             });
//           }
//       } else {
//           dispatch({
//             type: COUNT_GUEST_VISITS_FAIL,
//         });
//       }
//   };
  