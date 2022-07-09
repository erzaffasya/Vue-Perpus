import axios from 'axios';
import { authHeader } from '../helpers/authservice/auth-header';
let Api = axios.create();

// Api.defaults.withCredentials = true;
Api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Api.defaults.headers.common['Accept'] = 'application/json';
Api.defaults.headers.common['Content-Type'] = 'multipart/form-data';

// var user = JSON.parse(localStorage.getItem('user'))    
var auth = authHeader();
Api.defaults.headers.common.Authorization = auth;


export default Api;
