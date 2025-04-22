import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../helper/supabaseCient';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
    const logoutUser = async () => {
        // Logout dari Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
        console.error('Error logging out:', error.message);
        } else {
        // Redirect ke halaman login setelah logout berhasil
        navigate('/');
        }
    };

    // Panggil fungsi logout saat komponen ini di-render
    logoutUser();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-gray-800 text-lg">Logging out...</p>
        </div>
    );
};

export default Logout;
