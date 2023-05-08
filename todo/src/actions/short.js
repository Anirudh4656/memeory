import * as api from "../api";
export const cshort=(dat)=>async(dispatch)=>{
    try{
        const {data} =await api.createshort(dat);
        console.log(data);
        dispatch({type:"SHORT",payload:data});

    }catch(e){
  console.log(e)
    }
}
export const gshort=()=>async(dispatch)=>{
    try{
        const {data} =await api.getshort();
        console.log(data);
        dispatch({type:"GSHORT",payload:data});

    }catch(e){
  console.log(e)
    }
}