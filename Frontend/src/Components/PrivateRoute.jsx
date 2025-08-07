import { useSelector } from "react-redux";
import Loader from "./Loader/Loader";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    if (loading) {
        return <Loader />;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
}

export default PrivateRoute;