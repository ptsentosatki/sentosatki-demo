import axios from 'axios';
import { useCookies } from 'react-cookie';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_DATABASE,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const [cookies] = useCookies(['csrfToken']);
        config.headers['X-CSRF-Token'] = cookies.csrfToken;
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
