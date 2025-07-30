import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/tasks',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const getAllTasks = async () => {
    const res = await API.get('/');
    return res.data;
}