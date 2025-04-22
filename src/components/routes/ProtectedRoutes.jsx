import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsAuthChecked(true);
        }
    }, [loading]);

    if (loading || !isAuthChecked) {
        return(
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-10 h-10 border-4 border-primary-secondary-800 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/forbidden" replace/>;
    }

    return <Outlet />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};