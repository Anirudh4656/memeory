import React, { useState, useRef } from 'react';
import { Typography, TextField, Button,Dialog } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { cshort, gshort } from '../../actions/short';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';
import {Link} from "react-router-dom";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [ushort,setUshort] = useState(false);
  const [dat,setDat] = useState({full:""});

  const dispatch = useDispatch();
  const [comments, setComments] = useState([1,2,3]);
//   const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  const {short} = useSelector((state) => state);
  const handleComment = async () => {
      // const finalComment = `${user.result.name}:${comment}`
      // dispatch(commentPost(finalComment,post._id));
    // const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    // setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const Shotner=()=>{
    dispatch(cshort(dat))
  }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {/* <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]} */}
            
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
      
        {user?.result?.name&&(

        <div className={classes.div}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button onClick={()=>setUshort(true)}>click here</Button>
              <Dialog open={ushort} maxWidth="md" >
   
             <div className="seacrhinp">
             <input 
            type="text" 
            name="full"
             onChange={(e)=> setDat({full:e.target.value})}
              placeholder="Title" 
               autoComplete="off" />
             </div>
             <div className="seacrhinp">
             <Link  to="/:short">
             <input 
            type="text" 
          value={short.short}
              placeholder="Title" 
               autoComplete="off" />
             </Link>
            
             </div>
             
              <Button onClick={Shotner}  className={classes.searchButton} variant="contained" color="primary">Shotner</Button>

          
                <Button onClick={()=>setUshort(false)}> close</Button>
              </Dialog>
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>

        </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;