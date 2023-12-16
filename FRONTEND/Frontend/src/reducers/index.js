import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
// import guest from './guest';

export default combineReducers({
    auth,
    user,
    // guest,
});
