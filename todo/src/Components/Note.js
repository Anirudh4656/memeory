import React, {useState} from 'react'


const Note = (props) => {
    const[toggleSubmit, setToggleSubmit]= useState(true)
    const removeItem=()=>{
            props.delete(props.id)
    }
    const edit=()=>{
           return props.id
         
    }

    return (
        <div className="note">
        <h1 className="note-h1"> {props.title}</h1>
        <br />
        <p className="note-p">{props.content} </p>
      
    <button className="note_button" onClick={removeItem}> 
    <i class="fas fa-trash-alt" ></i>
    </button>
    <button className="note_button" onClick={edit}> 
    <i class="fas fa-edit add-btn" ></i>
    </button>
        </div>
    )
}

export default Note