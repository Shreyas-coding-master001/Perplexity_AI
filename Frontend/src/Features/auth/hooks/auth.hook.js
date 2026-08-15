import { useDispatch } from "react-redux"
import { setError, setLoading, setUser } from "../auth.slice";
import {register, login, getUser} from "../services/api.service.js";

function authHooks(){
    const dispact = useDispatch();

    async function handleRegister({name, email, password, avatar, role}){
        try{
            dispact(setLoading(true));

            const resp = await register({name, email, password, avatar, role});

            dispact(setUser(resp.data?.user));

            return resp.data;
        }catch(error){
            dispact(setError(error.response?.data?.message || "Registration failed"));
        }finally{
            dispact(setLoading(false));
        }
    }

    async function handleLogin({email, password}){
        try{
            setLoading(true);

            const resp = await login({email, password});

            setUser(resp.data?.user);

            return resp.data;
        }catch(error){
            dispact(setError(error.response?.data?.message || "Login Failed"));
        }finally{
            dispact(setLoading(false));
        }
    }

    async function handleGetUser(){
        try{
            dispact(setLoading(true));

            const resp = await getUser();

            dispact(setUser(resp.data?.user));

            return resp.data;
        }catch(error){
            dispact(setError(error));
        }finally{
            dispact(setLoading(false));
        }   
    }

    return({
        handleRegister,
        handleLogin,
        handleGetUser
    });
}

export default authHooks;