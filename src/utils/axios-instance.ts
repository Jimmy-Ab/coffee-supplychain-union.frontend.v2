import axios from 'axios';

export const axiosInstance = async () => {
    const timeout = Number(localStorage.getItem('timeout'));
    const token = localStorage.getItem('authToken');
    const axiosClient = axios.create({
        baseURL: 'https://coffee-union.adey-bsm.de',
        timeout: timeout,
        headers: {
            'Accept': 'application/vnd.GitHub.v3+json',
            'Authorization': `Bearer ${token}`
        }
    });
    return axiosClient
}