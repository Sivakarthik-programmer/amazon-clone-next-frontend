import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://amazon-clone-next.onrender.com"

const axiosInstance = axios.create({
    baseURL: API_URL,
})

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

export default axiosInstance