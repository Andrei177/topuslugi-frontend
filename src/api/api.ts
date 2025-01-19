import axios from "axios";

export const $publicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

export const $privateApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    // }
})

$privateApi.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});