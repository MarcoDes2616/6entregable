import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'; 


const ProtectedRoutes = () => { 
    
    
    if(true){ 
        return <Outlet /> 
    } else { 
        return <Navigate to='/' /> 
    }
};
export default ProtectedRoutes;