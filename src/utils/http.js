import axios from 'axios';

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
};
const request = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    withCredentials: true,
});

export default request;
