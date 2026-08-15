import axios from "axios";
import { API } from "../../../config/config.js";

console.log(API);

const api = axios.create({
    baseURL : API,
    withCredentials: true
});

export const register = async (data) => {
    try{
        const resp = await api.post("/api/auth/register", data);

        return resp;
    }catch(err){
        throw new Error(err);
    }
}

export const login = async (data) => {
    try{
        const resp = await api.post("/api/auth/login", data);
        return resp;
    }catch(err){
        throw new Error(err);
    }
}

export const getUser = async () => {
    try{
        const resp = await api.get("/api/aut/get-me");
        return resp;
    }catch(error){
        throw new Error(error);
    }
}