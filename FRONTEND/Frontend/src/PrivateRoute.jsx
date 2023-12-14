import { Outlet } from "react-router-dom";
import SignIn from './components/SignIn.jsx';
import { useSelector } from 'react-redux';


const useAuth = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.user.role);
    console.log(role)
    return { isAuthenticated, role };
};




const ProtectedRoutes = () => {
    const { isAuthenticated, role } = useAuth();

return isAuthenticated  && role === 'user' ? <Outlet /> : <SignIn />;
};

export default ProtectedRoutes;

