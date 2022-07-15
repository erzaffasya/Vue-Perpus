import axios from "axios";
import { authHeader } from "../helpers/authservice/auth-header";
let Api = axios.create();
// let url = "http://perpustakaan_itk.test";
let url = "http://127.0.0.1:8000";

// Api.defaults.withCredentials = true;
Api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
Api.defaults.headers.common["Accept"] = "application/json";
Api.defaults.headers.common["Content-Type"] = "multipart/form-data";

// var user = JSON.parse(localStorage.getItem('user'))
var auth = authHeader();
Api.defaults.headers.common.Authorization = auth;

export { Api, url };
