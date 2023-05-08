import React,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import {getPosts} from "../../actions/posts"
// import { getPosts } from '../actions/posts';
import useStyles from './styles';
const Paginate = ({page}) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
  
    const classes = useStyles();
  //we are gioing to send some parameters so that it will such only that page
    useEffect(() => {
      if (page) {
        console.log(page);
        console.log("hello page");
        dispatch(getPosts(page));
      }
    }, [dispatch, page]);
   
    return (
      <Pagination
        classes={{ ul: classes.ul }}
        count={ numberOfPages } 
        page={Number(page)|| 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
    
    );
  };
  export default Paginate;