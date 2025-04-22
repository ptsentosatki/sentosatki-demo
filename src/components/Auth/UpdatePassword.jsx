import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import LogoInstansi from '../../assets/logo-pt-sentosakarya-aditama.svg';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const UpdatePasswordSection = () => {
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get("token");

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [loadingChangePassword, setLoadingChangePassword] = useState(false);
    const apiBackEndURL = import.meta.env.VITE_API_DATABASE;

    useEffect(() => {
        if (!token) {
            toast.error('Link tidak valid atau sudah kedaluwarsa');
            navigate('/reset-password');
        }
    }, [token, navigate]);

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmNewPassword) {
            toast.error('Password baru tidak sama dengan konfirmasi password baru');
            return;
        }

        try {
            setLoadingChangePassword(true);
            await axios.post(`${apiBackEndURL}/api/auth/change-password`, {
                token,
                newPassword,
                confirmNewPassword
            });

            toast.success('Kamu berhasil mengganti password baru!');
            navigate('/');
        } catch (error) {
            console.error('Update password error:', error);
            if (error.response && error.response.data.message === 'Token reset password sudah digunakan atau kedaluwarsa.') {
                toast.error('Token reset password sudah digunakan atau kedaluwarsa');
            } else {
                toast.error('Terjadi kesalahan saat memproses permintaan Kamu.');
            }
            navigate('/reset-password');
        } finally {
            setLoadingChangePassword(false);
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
            <header className="w-full flex justify-center mb-6">
                <Link to="/">
                    <img
                        src={LogoInstansi}
                        alt="LOGO PT. SENTOSAKARYA ADITAMA"
                        className="max-w-xs"
                        height="54"
                    />
                </Link>
            </header>
            <Toaster richColors position="top-center" />
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-lg md:max-w-md p-6 space-y-6">
                <form onSubmit={handleSubmitChangePassword}>
                    <h2 className="text-center text-2xl font-semibold mb-6">
                        Reset Password
                    </h2>
                    <div className="relative mb-4">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Masukkan password baru"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 focus:outline-none"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            placeholder="Konfirmasi password baru"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 focus:outline-none"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        >
                            {showConfirmNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-primary-400 hover:bg-primary-500 text-white rounded-md transition duration-400 ease-in-out"
                        disabled={loadingChangePassword}
                    >
                        {loadingChangePassword ? 'Memproses...' : 'Ganti Password'}
                    </button>
                </form>
            </div>

            <footer className="flex justify-center mt-6">
                <span className="text-gray-500 font-bold">
                    COPYRIGHT @ <Link to="/">PT. SENTOSAKARYA ADITAMA</Link>
                </span>
            </footer>
        </div>
    );
};

export default UpdatePasswordSection;
