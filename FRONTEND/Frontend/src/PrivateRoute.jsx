import { Outlet } from "react-router-dom";
import SignIn from './components/SignIn.jsx';
import { useSelector } from 'react-redux';


const useAuth = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuthenticated;
};




const ProtectedRoutes = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <SignIn />;
};

export default ProtectedRoutes;
