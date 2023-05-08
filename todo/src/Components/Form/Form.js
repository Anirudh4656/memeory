import React,{useEffect, useState} from 'react'
import FileBase from "react-file-base64"
import {useHistory,useLocation} from "react-router-dom"
import {useSelector} from "react-redux";
import { Container, Grow, Grid, AppBar, TextField, Button, Paper ,Dialog, Typography} from '@material-ui/core';
import useStyles from "./style"
import DeleteIcon from "@material-ui/icons/Delete"
import Add from "@material-ui/icons/Add"
import Search from "@material-ui/icons/Search"
import {createPost, updatedPost} from "../../actions/posts"
import {useDispatch} from "react-redux";
import ChipInput from 'material-ui-chip-input';
import { getPosts,getPostsBySearch } from '../../actions/posts';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Form = ({currentId , setCurrentId}) => {
  const query = useQuery();
  const  searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [openpop, setOpenpop] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user= JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const post =    useSelector((state)=>currentId? state.posts.posts.find((p)=>p._id===currentId):null )
  const [postData, setPostData]= useState({title:"" , message:"" , tags:"", selectedFile:""})
  const[ expand , setExpand] = useState(false);
                                                        
    useEffect(()=>{
      if(post) setPostData(post);
       },[post]);
  
 if(!user?.result?.name){
  return(
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please SignIn  to create your own memories and like other's memories. </Typography>
    </Paper>
  )
 }
 
    const handleSubmit =(e)=>{
      if(currentId){
        dispatch(updatedPost(currentId,{...postData,name:user?.result?.name}))
      }else{
        dispatch(createPost({...postData, name:user?.result?.name},history))
      }
      clear()
    }
    
    const clear =()=>{
        setPostData({title:"",message:"",tags:"",selectedFile:""})
       
        setCurrentId(null);
      
     }
    const expandIt =()=>{
        setExpand(true)
    }
    const backToNormal =()=>{
        setExpand(false)
    }
    
    const popup=()=>{
      setOpenpop(!openpop)
     }
  
    const searchPost = () => {
       setOpenpop(!openpop);
       console.log("I am in search blog");
      if(search.trim() || tags ){
        dispatch(getPostsBySearch({search,tags:tags.join(",")}));
        history.push(`/posts/search?searchQuery=${search || "none"}$tags=${tags.join(",")}`);
      }else{
        history.push("/");
      }
    }

    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
       searchPost();
      }
      
    };
     const handleAddChip = (tag) => setTags([...tags, tag]);
   
     const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className="main_note"  onDoubleClick={backToNormal} >
  
    {    expand?
            <input 
            type="text" 
            name="title"
             value={postData.title} 
             onChange={(e)=> setPostData({...postData, title:e.target.value})}
              placeholder="Title" 
               autoComplete="off" />
                :null }
                {    expand?
            <input 
            type="text" 
            name="tags"
             value={postData.tags} 
             onChange={(e)=> setPostData({...postData, tags:e.target.value})}
              placeholder="Tags" 
               autoComplete="off" />
                :null }
       <textarea 
            rows="" 
            
            value={postData.message}
            name="message"
             onChange={(e)=> setPostData({...postData, message:e.target.value})}
              column="" 
              placeholder="Write something..."
              row={expand?3:2}
              onClick={expandIt}
              
               />

             {expand? ( <>
                <div className={classes.fileInput}>
        <FileBase type="file"
        multiple={false}
        onDone={({base64})=>setPostData({...postData, selectedFile:base64})} />
    </div>
    <div className='main_note_button-div'> 
    <button  className="main_note_button" onClick={handleSubmit}>
    <Add  style={{ margin: '-3px ',color:"#3f51b5" }}  fontSize="medium" />
              </button>
              <button  className="main_note_button"   onClick={popup}>
             <Search style={{ margin: '-2px ',color:"#3f51b5" }}   />
              </button>
              <button  className="main_note_button" color="primary" onClick={clear}>
    <DeleteIcon   style={{ margin: '-2px ',color:"#3f51b5" }}  fontSize="small" />
              </button>
              </div>
              <Dialog open={openpop} maxWidth="md" >
     <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField   onKeyPress={handleKeyPress} name="search" variant="outlined" label="Search Memories" 
              fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button   onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>

            </AppBar>
                <Button onClick={()=>setOpenpop(false)}> close</Button>
              </Dialog>

             </>)
              :null}
          
       
            
        </div>
  )
}

export default Form