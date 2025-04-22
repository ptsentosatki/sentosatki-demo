import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiBackEndURL = import.meta.env.VITE_API_DATABASE;

    // useEffect(() => {
    //     const refresh = async () => {
    //         const refreshToken = localStorage.getItem('refreshToken');
    //         if (!refreshToken) return logout();
        
    //         try {
    //             const res = await axios.post(`${apiBackEndURL}/api/auth/refresh-token`, { refreshToken }, { withCredentials: true });
    //             localStorage.setItem('refreshToken', res.data.refreshToken);
    //             setUser(res.data.user);
    //         } catch (err) {
    //             console.error(err);
    //             logout();
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
        
    //     refresh();
    //     const interval = setInterval(refresh, 10 * 1000); // refresh tiap 10 detik
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     const checkUser = async () => {
    //         setLoading(true);
    //         const { data, error } = await supabase.auth.getUser();
    //         if (error || !data) {
    //             return setLoading(false);
    //         }
    //         if (data?.user) {
    //             setUser(data.user.user_metadata);
    //         } else {
    //             setUser(null);
    //         }
    //         setLoading(false);
    //     };

    //     checkUser();

    //     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    //         if (event === 'SIGNED_OUT' || !session) {
    //             setUser(null);
    //         } else if (session?.user) {
    //             setUser(session.user.user_metadata);
    //         }
    //         setLoading(false);
    //     });
    //     return () => {
    //         authListener.subscription.unsubscribe();
    //     };
    // }, []);
    
    useEffect(() => {
        // ==== Get User ====
        const fetchUserFromAccessToken = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`${apiBackEndURL}/api/auth/getUser`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                setUser(res.data.user);
            } catch (err) {
                localStorage.removeItem('accessToken');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        // ==== Refresh Token ====
        const refreshAccessToken = async () => {
            try {
                const res = await axios.post(`${apiBackEndURL}/api/auth/refresh-token`, {}, { withCredentials: true });
                localStorage.setItem('accessToken', res.data.accessToken);
            } catch (err) {
                setUser(null);
                localStorage.removeItem('accessToken');
            }
        };

        fetchUserFromAccessToken();

        const interval = setInterval(refreshAccessToken, 10 * 1000); // setiap 10 detik
        return () => clearInterval(interval);
    }, [apiBackEndURL]);

    // useEffect(() => {
    //     const refreshToken = async () => {
    //         const { data, error } = await supabase.auth.refreshSession();
    //         if (error) {
    //             await supabase.auth.signOut();
    //             setUser(null);
    //         } else {
    //             setUser(data?.user?.user_metadata);
    //         }
    //     };
    
    //     const interval = setInterval(refreshToken, 60 * 1000);
    //     return () => clearInterval(interval);
    // }, []);

    // ==== Login ====

    const login = async (email, password) => {
        const res = await axios.post(`${apiBackEndURL}/api/auth/login`, { email, password }, { withCredentials: true });
        const { user, accessToken } = res.data;
        
        setUser(user);
        localStorage.setItem('accessToken', accessToken);
        setLoading(false);
    };

    // const login = async (email, password) => {
    //     const { data, error } = await supabase.auth.signInWithPassword(
    //         { email, password },
    //         { shouldCreateUser: false }
    //     );
    //     if (error) throw error;
    //     if(!data.user.email_confirmed_at) throw new Error('Email belum terverifikasi. Silahkan cek emailmu');
    //     setUser(data.user.user_metadata);
    // };

    // ==== Logout ====
    const logout = async () => {
        try {
            await axios.post(`${apiBackEndURL}/api/auth/logout`, {}, { withCredentials: true });
        } catch (err) {
            console.error('Gagal logout:', err);
        } finally {
            localStorage.removeItem('accessToken');
            setUser(null);
        }
    };
    // const logout = async () => {
    //     await supabase.auth.signOut();
    //     setUser(null);
    // };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};