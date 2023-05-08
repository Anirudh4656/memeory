import React from 'react'
import  "./style.css"
import send from "./assets/send.svg"
import { useState } from 'react';

let loadInterval;
function loader(element){
    element.textContent = "";
  
    loadInterval = setInterval(()=>{
      element.textContent += ".";
      if(element.textContent==="...."){
        element.textContent ="";
      }
    },300)
  }
  function typeText(element,text){
    let index =0;
    let interval = setInterval(()=>{
     if (index<text.length){
      element.innerHTML+= text.charAt(index);
      index++;
     }else{
      clearInterval(interval);
     }
    },20)
  }
  function generateUniqueId(){
    const timestamp =Date.now()
    const randomNumber =Math.random();
    const hexadecimalString =randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
  }
  function chatStipe(isAi, value,uniqueId){
    return (
      `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
        <div class="profile">
         <img 
             src="${isAi ? 'bot':'user'}"
             alt="${isAi? "bot":"user"}"
              />
        </div>
     <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
      `
    )} 
   
const Chat = () => {
  const [input ,setInput] =useState("");
  const [chatlog ,setChatlog] =useState([{user:"gpt",message:"how i can you do for you today"}]);
  const handleSubmit = async(e) =>{
    console.log(input);
    console.log(chatlog);
    e.preventDefault();
setChatlog([...chatlog,{user:"gpt", message:`${input}`}])
// setChatlog([...chatlog,{user:"gpt", message:`${input}`}])
   
    const response =await fetch('http://localhost:5000',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
       message:input,
      })
    })
   
    const data =await response.json();
    //  console.log(`i am in data of chat gpt ${JSON.stringify(data)}`);
     const dat=JSON.stringify(data)
    
    
     const parseData = data.data.trim();
     console.log(`i am in data of chat gpt ${parseData}`);
     setChatlog(parseData);
    // console.log(`message ok ${newData}`);
    // if(response.ok){
    //   const data =await response.json();
   
      // console.log(`message ok ${parseData}`);
    //   typeText(messageDiv,parseData)
    // }else{
    //   const err =await response.text();
    //   messageDiv.innerHTML= "Something went wrong"
    //   alert(err);
    // }
   }
  
   const handleKey=(e)=>{
    if(e.keyCode===13){
      handleSubmit(e)
    }
   }
  
  return (
    <div id="app">
      <div id="chat_container">
      <div className="chat-log">
      
        <div className="chat-message">
          {  `${chatlog}`}
          <div className="chat-message-center">
            <div className="avatar">

            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} onKeyPress={handleKey} >
            <input rows="1" value={input} onChange={(e)=>setInput(e.target.value)}></input>
        
          <button type="submit"><img src={send}/></button>
          
        </form>
      </div>
    </div>
  )
}

export default Chat;
// import React from 'react'
// import  "./style.css"
// import send from "./assets/send.svg"
// const form = document.querySelector('form')
// const chatContainer =document.querySelector('#chat_container')

// let loadInterval;
// function loader(element){
//     element.textContent = "";
  
//     loadInterval = setInterval(()=>{
//       element.textContent += ".";
//       if(element.textContent==="...."){
//         element.textContent ="";
//       }
//     },300)
//   }
//   function typeText(element,text){
//     let index =0;
//     let interval = setInterval(()=>{
//      if (index<text.length){
//       element.innerHTML+= text.charAt(index);
//       index++;
//      }else{
//       clearInterval(interval);
//      }
//     },20)
//   }
//   function generateUniqueId(){
//     const timestamp =Date.now()
//     const randomNumber =Math.random();
//     const hexadecimalString =randomNumber.toString(16);
//   return `id-${timestamp}-${hexadecimalString}`;
//   }
//   function chatStipe(isAi, value,uniqueId){
//     return (
//       `
//       <div class="wrapper ${isAi && 'ai'}">
//         <div class="chat">
//         <div class="profile">
//          <img 
//              src="${isAi ? 'bot':'user'}"
//              alt="${isAi? "bot":"user"}"
//               />
//         </div>
//      <div class="message" id=${uniqueId}>${value}</div>
//         </div>
//       </div>
//       `
//     )} 
//     const handleSubmit = async(e) =>{
//       e.preventDefault();
//       //user' chatstripe
//       const data = new FormData(form);
//       chatContainer.innerHTML += chatStipe(false,data.get('prompt'))
//       form.reset();
//   //bots chatstripe
//       const uniqueId=generateUniqueId();
//       chatContainer.innerHTML += chatStipe(true," ",uniqueId);
//       chatContainer.scrollTop=chatContainer.scrollHeight;
//       //*//
//       const messageDiv = document.getElementById(uniqueId);
//       loader(messageDiv);
//       const response =await fetch('http://localhost:5000',{
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//           prompt:data.get("prompt")
//         })
//       })
//       clearInterval(loadInterval);
//       messageDiv.innerHTML= "";
//       if(response.ok){
//         const data =await response.json();
//         const parseData = data.bot.trim();
//         typeText(messageDiv,parseData)
//       }else{
//         const err =await response.text();
//         messageDiv.innerHTML= "Something went wrong"
//         alert(err);
//       }
//      }
    
//      const handleKey=(e)=>{
//       if(e.keyCode===13){
//         handleSubmit(e)
//       }
//      }
    
// const chat = () => {
//   return (
//     <div id="app">
//       <div id="chat_container">
//         <form onSubmit={handleSubmit} onKeyPress={handleKey} >
//           <textarea className="prompt" rows="1" cols="1" placeholder="Ask codex..." ></textarea>
//           <button type="submit"><img src={send}/></button>
          
//         </form>
//       </div>
//     </div>
//   )
// }

// export default chat;