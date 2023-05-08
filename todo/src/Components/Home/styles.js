import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  chat:{
    right: "20px",
    height: "12rem",
    position: "absolute",
    bottom: "148px",
  },
  image:{
    marginTop: "12rem",
    height: "7rem",
    position: "relative",
  },
  pag: {
  
    marginTop: '29px',
  
  },
  grid2:{
    flexDirection:"column"
  },
  grid1:{
    flexDirection:"row",
    flexWrap: "nowrap",
  },

  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    marginTop:"3rem",
  },
  chatcontainer:{
    height:"100px",
    width:"100px",
  },
  container:{
    display:"flex",
  }
}));