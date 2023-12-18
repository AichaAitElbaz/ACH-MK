import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    COUNT_UGRAPHS_SUCCESS,
    COUNT_UGRAPHS_FAIL,
    COUNT_UFILES_SUCCESS,
    COUNT_UFILES_FAIL,

} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    usergraphcount: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case COUNT_UGRAPHS_SUCCESS:
            console.log('h',payload.user_graphs_count)

            return {
                    ...state,
                    isAuthenticated: true,
                    access: payload.access,
                    refresh: payload.refresh,
                    usergraphcount: payload.user_graphs_count,

                }

         
        case COUNT_UGRAPHS_FAIL:
            console.log('erroedgddh')
        case COUNT_UFILES_SUCCESS:
         
        case COUNT_UFILES_FAIL:
            
  
       
        default:
            return state
    }
};