import React ,{useState}from 'react'
import "./create.css"


const CreateNote = (props) => {

    const [note, setNote] = useState({
        title:"",
        content:"",
    });
    const[ expand , setExpand] = useState(false);
    const InputEvent=(event)=>{
        // const value = event.target.value;
        // const name = event.target.name;
        const {name , value} = event.target;
        setNote((prevData)=>{
            return{
                ...prevData,
                [name]: value,
            };
        })
    }
    const addEvent =()=>{
        props.passNote(note);
        setNote({
            title:"",
            content:"",
            
        })
    }
    const expandIt =()=>{
        setExpand(true)
    }
    const backToNormal =()=>{
        setExpand(false)
    }

    return (
        <div className="main_note"  onDoubleClick={backToNormal} >
    {    expand?
            <input 
            type="text" 
            name="title"
             value={note.title} 
             onChange={InputEvent}
              placeholder="Title" 
               autoComplete="off" />
                :null }
            <textarea 
            rows="" 
            value={note.content}
            name="content"
             onChange={InputEvent} 
              column="" 
              placeholder="Write something..."
              row={expand?3:2}
              onClick={expandIt}
             
               />
             {expand?
              <button  className="main_note_button" onClick={addEvent}>
              <i class="fas fa-plus"></i>
              </button>
              :null}
          
       
            
        </div>
    )
}

export default CreateNote