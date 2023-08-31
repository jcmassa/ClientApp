import axios from 'axios'
import {baseURL} from '../EndPoints';
const rankingApi = axios.create({
    baseURL:baseURL,
    headers: {"Access-Control-Allow-Origin": "*",  "Content-Type": "application/json"},   
    withCredentials: false
})
export default rankingApi;