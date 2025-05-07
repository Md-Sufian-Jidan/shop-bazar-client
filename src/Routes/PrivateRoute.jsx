import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (!user || loading) {
        return (
            <div className="h-screen flex justify-center items-center text-lg font-medium">
                Loading...
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return children;
};

export default PrivateRoute;
