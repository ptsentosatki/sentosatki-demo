import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoInstansi from '../../assets/logo-pt-sentosakarya-aditama.svg';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const ResetPasswordSection = () => {
    const [email, setEmail] = useState('');
    const [loadingSubmitEmail, setLoadingSubmitEmail] = useState(false);
    const apiBackEndURL = import.meta.env.VITE_API_DATABASE;

    const location = useLocation();
    const navigate = useNavigate();

    const errorMessage = location.state?.error;

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            navigate(location.pathname, { replace: true });
        }
    }, [errorMessage, navigate, location.pathname]);

    const handleEmailRecovery = async (e) => {
        e.preventDefault();
        setLoadingSubmitEmail(true);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Email tidak valid.');
            setLoadingSubmitEmail(false);
            return;
        }

        try {
            const origin = window.location.origin

            await axios.post(`${apiBackEndURL}/api/auth/request-change-password`, {
                email,
            }, {
                headers: { origin },
            });
            
            toast.success(`Link berhasil dikirim ke email ${email}`);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.message === "Link sudah digunakan atau tidak valid.") {
                toast.error('Link sudah digunakan atau tidak valid');
            } else {
                toast.error(error.response.data.message || 'Terjadi kesalahan saat memproses permintaan Anda.');
            }
        } finally {
            setLoadingSubmitEmail(false);
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
            <form onSubmit={handleEmailRecovery} className="relative">
                <h2 className="text-center text-2xl font-semibold mb-3">
                    Reset Password
                </h2>
                <p className="text-center text-sm mb-6 text-gray-500">
                    Kami akan mengirimkan link untuk reset password Kamu ke email aktif Kamu yang
                    terdaftar
                </p>
                <input
                    type="email"
                    placeholder="Contoh: nama@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4 outline-none focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-gray-100"
                    required
                />
                <button
                    type="submit"
                    className="w-full mb-6 p-2 bg-primary-400 hover:bg-primary-500 text-white rounded-md transition duration-400 ease-in-out"
                >
                    {loadingSubmitEmail ? (
                    <div className="flex flex-col justify-center items-center">
                        <svg
                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                        viewBox="0 0 24 24"
                        ></svg>
                    </div>
                    ) : (
                    'Kirim Link Reset Password'
                    )}
                </button>
                <Link
                    to="/bantuan/akun"
                    className="block font-semibold text-center text-gray-500 hover:text-gray-600 transition duration-400 ease-in-out"
                >
                    Bantuan tentang Akun
                </Link>
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

export default ResetPasswordSection;
