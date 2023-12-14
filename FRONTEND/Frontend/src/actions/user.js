import axios from 'axios';
import {
    COUNT_UGRAPHS_SUCCESS,
    COUNT_UGRAPHS_FAIL,
    COUNT_UFILES_SUCCESS,
    COUNT_UFILES_FAIL,
} from './types';


export const load_user_graph_number = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`http://localhost:8000/account/api/count_user_graphs/`, config);
    
            dispatch({
                type: COUNT_UGRAPHS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: COUNT_UGRAPHS_FAIL
            });
        }
    } else {
        dispatch({
            type: COUNT_UGRAPHS_FAIL
        });
    }
};
export const load_user_file_number = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`http://localhost:8000/account/api/count_user_files/`, config);
    
            dispatch({
                type: COUNT_UFILES_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: COUNT_UFILES_FAIL
            });
        }
    } else {
        dispatch({
            type: COUNT_UFILES_FAIL
        });
    }
};