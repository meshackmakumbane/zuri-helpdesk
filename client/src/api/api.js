import axios from 'axios'

const api = axios.create({
    baseURL: 'https://zuri-helpdesk-1.onrender.com',
    withCredentials: true
})

export default api