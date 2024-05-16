import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.1.41:3000',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;