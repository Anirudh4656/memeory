import React from 'react'
import Post from "./Post/Post"
import useStyles from "./styles"
import {useSelector} from "react-redux";
import {Grid ,CircularProgress} from "@material-ui/core"
const Posts = ({post, setCurrentId }) => {
  const classes = useStyles();
  const {posts,isLoading} = useSelector((state)=> state.posts);/*[]->{posts:[]}*/
  if(!posts.length && !isLoading) return "No posts"
  return (
    isLoading ? <CircularProgress /> :(
      
      <Grid className={classes.container} container alignItems="stretch"  spacing={4}>
      
        {posts.map((posts)=>(
            
          <Grid key={posts._id}  item xs={9} sm={4} md={4} lg={5}>
          <Post post={posts} setCurrentId={setCurrentId} />
  
          </Grid>
        
          
         ) )}
        
      </Grid>
    )
   )
}

export default Posts