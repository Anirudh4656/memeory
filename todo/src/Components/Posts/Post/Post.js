import React from 'react'
import useStyles from "./styles"
import {deletePost ,likePost} from "../../../actions/posts"
import {Card,CardActions,CardContent,ButtonBase,CardMedia,Button,Typography} from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {useHistory} from "react-router-dom";
import moment from "moment";


import {useSelector} from "react-redux";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import {useDispatch} from "react-redux";
const Post = ({post, setCurrentId }) => {
    const classes = useStyles();
    const history = useHistory();
    const user= JSON.parse(localStorage.getItem("profile"));
    console.log(`i am in usr ${JSON.stringify(user)}`);
    const dispatch = useDispatch();
    const {posts} = useSelector((state)=> state.posts);
    console.log(`i am in post ${JSON.stringify(posts)}`);
    // console.log(`i am in post  pop drill${JSON.stringify(post)}`)
    const openPost=()=>{

        history.push(`/posts/${post._id}`); }
            const Likes = () => {
        if (post.likes.length > 0){
          
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
  return (
    <Card className={classes.card} raised elevation={6}>
    <ButtonBase className={classes.cardAction} onClick={openPost} >
         <CardMedia className={classes.media} src={post.selectedFile} title={post.title} >
         {/* <img className={classes.media} src={post.selectedFile} /> */}
         </CardMedia>
         <div className={classes.overlay}>
         {/* <Typography variant="h6">{post.creator}</Typography> */}
             <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
         </div>      </ButtonBase>
         <div className={classes.overlay2}>
             <Button style ={{color:"black"}} size="small" 
              onClick={()=> setCurrentId(post._id)}>
              <MoreHorizIcon fontSize="default" />
             </Button>
         </div>
         <div className={classes.details}>
             <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag}`)}</Typography>
         </div>
         <Typography  className ={classes.title} variant="h5" gutterButtom>{post.title}</Typography>
         
         <CardContent>
         <Typography   variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
         </CardContent>
   
         <CardActions className={classes.cardActions}>
         <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId=== post?.creator || user?.result?.id===post?.creator)&&(
          <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))} > 
                 <DeleteIcon fontSize="small" />
                 Delete
             </Button>
        )}
             
         </CardActions>

     </Card>
  )
}

export default Post