import axios from 'axios';

export default axios.create({
   //baseURL: 'http://localhost:3000/api/v1/thirsty-seed',
   baseURL: 'http://localhost:3000',
   headers: { 'Content-type': 'application/json' }
});