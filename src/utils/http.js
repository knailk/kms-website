import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
<<<<<<< HEAD
    withCredentials: true,
=======
    withCredentials: true, 
>>>>>>> 97bf1be396502b11d0616449e24b96b793bf79a1
});

export default request;