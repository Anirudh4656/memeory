import React,{useEffect,useState} from 'react'
import './App.css';
import { BrowserRouter,Switch,Route, Redirect } from 'react-router-dom';
import Header from './Components/Navbar/Header';
import { useHistory } from 'react-router-dom';
import Footer from './Components/Footer';
import PostDetails from './Components/PostDetails/PostDetails';
import Home from "./Components/Home/Home"
import Appv from './Components/Voice/Appv';
import { useDispatch } from 'react-redux';
import Auth from './Components/Auth/Auth';
import Chat from "./Components/chatgpt/chat"

const App=()=> {
  const user= JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch =useDispatch();
  
  
  return (
    <>
     <BrowserRouter>
     <Header  />
     <Switch>
     <Route path="/" exact component={()=> <Redirect to="/posts" />} />
     <Route path="/posts" exact component={Home} />
     <Route path="/auth" exact component={Auth} />
     <Route path="/posts/search" exact component={Home} />
     <Route path="/posts/:id"  component={PostDetails} />
     <Route path="/auth" exact component={()=>(!user ? <Auth />:<Redirect  to="/posts"/>)} />
     </Switch>
     </BrowserRouter>
     </>
     );
     }

export default App;
