import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

const ResetPasswordRoute = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const apiBackEndURL = import.meta.env.VITE_API_DATABASE;

    useEffect(() => {
        const validateResetToken = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get("token");

            if (!token) {
                navigate("/reset-password");
                return;
            }

            try {
                const response = await axios.post(`${apiBackEndURL}/api/auth/verify-reset-token`, {
                    token,
                });

                if (response.status === 200) {
                    setIsValid(true);
                } else {
                    navigate("/reset-password");
                }
            } catch (err) {
                console.log("Token invalid or expired:", err);
                navigate("/reset-password", {
                    state: { error: "Link sudah tidak bisa digunakan" }
                });
            } finally {
                setLoading(false);
            }
        };

        validateResetToken();
    }, [navigate, apiBackEndURL]);

    if (loading) {
        return(
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-10 h-10 border-4 border-primary-secondary-800 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    return isValid ? <Outlet /> : null;
};

export default ResetPasswordRoute;
