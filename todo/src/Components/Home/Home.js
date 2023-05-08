import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import robot from "./robot.png";
import Posts from '../Posts/Posts.js';
import useStyles from "./styles.js"
import Form from '../Form/Form';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper ,Dialog} from '@material-ui/core';
import Pagination from "../Pagination/Pagination"
import { getPosts,getPostsBySearch } from '../../actions/posts';
import { EditorTabs } from '../../config/constants';
import Chat from "../chatgpt/chat"
// import  {  AI,Tab} from "../comp/index";
function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch =useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const  searchQuery = query.get("searchQuery");
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [tags, setTags] = useState([]);
  const [currentId , setCurrentId]= useState(null);
  const [openp , setOpenp]= useState(false);

  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]);
const open =()=>{
 setOpenp(true);
}



  return (
<>
<Grow in>
<Container className={classes.gridContainer} maxidth="xl" >
         <Grid container justify="space-between"   className={classes.grid1} alignItem="stretch"   spacing={2}>
        <Grid  className={classes.grid} item xs={12} sm={2} md={12}>
        <Posts setCurrentId={setCurrentId}/>
        {(!searchQuery && !tags.length) &&(
     <Pagination  page={page}/> 
     )}
        </Grid>
        <Grid container justify="space-between"  className={classes.grid2} flex-direction="column" alignItem="stretch" spacing={3}>
     <Grid item xs={12} sm={4} md={4}>
        <Form  currentId={currentId} setCurrentId={setCurrentId}/>
  </Grid>
      
        <div className={classes.chat} onClick={open}>
        {/* {openp? (
          <>
          <div className={classes.chatcontainer}>
           <Chat/>
          </div>
          </>):(null
        )} */}
        {/* {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))} */}
     {/* <img className={classes.image} src={robot}  alt="icon"/> */}
</div> 
  </Grid>
   </Grid>
        </Container>
       </Grow>      
</>

  )
}

export default Home