import * as api from "../api";
import {FETCH_ALL,CREATE,FETCH_POST,FETCH_BY_SEARCH,DELETE,UPDATE ,COMMENT } from "../constants/actionTypes";
export const getPosts=(page)=>async(dispatch)=>{
    try{
      dispatch({type:"START_LOADING"});
             const {data} =await api.fetchPosts(page);
             console.log(data);
             const action = {type:FETCH_ALL,payload:data}
             dispatch(action);
             dispatch({type:"END_LOADING"});
    }catch(e){
        console.log(e.message);
    }
}
export const getPost= (id)=> async(dispatch)=>{
  try{
    // console.log("hellooo i am in getPost")
    dispatch({type:"START_LOADING"});
      const {data} = await api.fetchPost(id);
      
      // console.log(data);
      const action ={type:FETCH_POST,payload:data}
      dispatch(action) ;
      dispatch({type:"END_LOADING"});
  }catch(e){
console.log(e);
  }


}
export const getPostsBySearch=(searchQuery)=> async (dispatch)=>{
  try{
    // console.log("i am in acton")
    dispatch({type:"START_LOADING"});
    const{data:{data}} =await api.fetchPostsBySearch(searchQuery);
    //  
    dispatch({type:FETCH_BY_SEARCH,payload:data});
  // console.log(data);
  dispatch({type:"END_LOADING"});
  }catch(e){
       console.log(e);
  }

}
export const createPost=(post,history)=>async(dispatch)=>{
    try{
        const{data} =await api.createPost(post);
        dispatch({type:CREATE,payload:data});
history.push(`/posts/${data._id}`);
    }catch(e){
  console.log(e)
    }
}

export const deletePost =(id )=> async (dispatch) =>{
    try{
     await api.deletePost(id);
     dispatch({type:DELETE ,payload:id})
    }catch(error){
      console.log(error);
    }
  }
  export const likePost =(id)=> async (dispatch) =>{
    try{
      const {data} = await api.likePost(id);
      console.log(`i am in reducer ${JSON.stringify(data)}`);
      dispatch({type:UPDATE , payload:data});
    }catch(error){
      console.log(error);
    }
  }
  export const commentPost =(value,id)=> async (dispatch) =>{
    try{
      const {data} = await api.comment(value,id);
      dispatch({type:COMMENT , payload:data});
      // check 
      //for new comments
      return  data.comments;
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }
  export const updatedPost =(id ,post)=> async(dispatch) =>{
    try{
     const {data} = await api.updatePost(id,post);
     dispatch({type:UPDATE , payload:data});
    }catch(error){
      console.log(error);
    }
  }