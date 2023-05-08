import * as api from "../api";
export const signin=(form,history) =>async(dispatch) =>{
    try{
        const {data} =await api.signIn(form);
        dispatch({type:"AUTH",data});
        history.push("/");

    }catch(e){
        console.log(e);
    }
}
export const signup=(form,history)=>async(dispatch) =>{
    try{
        const {data} = await api.signUp(form);
        dispatch({type:"AUTH", data});
        history.push("/");
      
    }catch(e){
        console.log(e);
    }
}