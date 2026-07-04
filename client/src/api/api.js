import axios from 'axios'

const api = axios.create({
    baseURL: 'https://zuri-helpdesk-main.onrender.com',
    withCredentials: true
})

export default api