import { useContext } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ allowedRoles, children }) => {
    const { user } = useContext(AuthContext);
    const data_secret_key = import.meta.env.VITE_DATA_SECRET_KEY;

    const decryptData = (data) => {
        const bytes = CryptoJS.AES.decrypt(data, data_secret_key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/*" />;
    }

    const dataUser = decryptData(user);
    console.log(dataUser);

    if (!allowedRoles.includes(dataUser.role)) {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/unauthorized" />;
    }

    return children;
};

RequireAuth.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};

export default RequireAuth;
