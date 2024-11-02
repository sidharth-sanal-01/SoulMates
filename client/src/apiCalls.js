import axios from "axios";
import {api} from "../src/components/setupProxy";

export const loginCall =async (userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res= await axios.post(api+"/api/auth/login",userCredential)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err});
    }
}