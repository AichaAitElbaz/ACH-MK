import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user:null,
    role:null,
    firstname:null,
    lastname:null,
    email:null,

    
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    


    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGIN_SUCCESS:
            toast.success("Authentication successful");
            console.log(payload);
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            
            return {
                    ...state,
                    isAuthenticated: true,
                    access: payload.access,
                    user: payload,
                    role : payload.role,
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                    refresh: payload.refresh
                }
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            toast.success("Sign up Success");
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            console.log('User data loaded successfully:', payload);
            return {
                ...state,
                user: payload,
                access: payload.access,
                refresh: payload.refresh,
                role :payload.role,
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            console.log('User failed to load:', payload);

            return {
                ...state,
                user: null
            }
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
            toast.error('Incorrect Credentials');
            
        case SIGNUP_FAIL:
            toast.error('Error');

        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                role:null

            }
        case PASSWORD_RESET_SUCCESS:
        case UPDATE_USER_FAILURE:
            return { 
                ...state, 
                updateUserError: action.payload };
        case UPDATE_USER_SUCCESS:
            return { 
                ...state, 
                updateUserError: null };
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};