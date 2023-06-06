import {NOTES} from "../../constants";

export const requestNotes = () => async (dispatch) => {
  dispatch({
    type:NOTES.LOAD
  })
    try {
        let notesData;
       await fetch('http://localhost:3000/notes')
        .then(res => res.json())
        .then(data => {notesData=data})
      dispatch({
        type: NOTES.LOAD_SUCCESS,
        notes: notesData,
        isError: false,
      });
    } catch (e) {
      dispatch({
        type: NOTES.LOAD_SUCCESS,
        notes: [],
        isError: true,
        snackbar:true,
        message:"Hello"
      });
    }
  };
  export const deleteNotes = (id) => async (dispatch) => {
    console.log("Actions")
      try {
          await fetch('http://localhost:3000/notes/' + id, {
            method: 'DELETE'
          })
        dispatch({
          type: NOTES.DELETE,
          payload:{id},
          isError: false,
          snackbar:true,
          message:"Note deleted"
        });
      } catch (e) {
        console.log(e)
      }
    };

export const editNotes=(id,newNote)=>async(dispatch)=>{
  try{
    const title=newNote.title
        const details=newNote.details
        const category=newNote.category
        const pin=newNote.pin
        await fetch('http://localhost:3000/notes/' + id,{
        method:'PATCH',
        headers:{'Content-Type': 'application/json',
        'Accept': 'application/json'},
        body:JSON.stringify({title,details,category,pin})
      })
      dispatch({
        type:NOTES.EDIT,
        payload:newNote,
        snackbar:true,
        message:"Note Edited"
      })
  }
  catch(e){
    console.log(e)
  }
}
export const createNote=(title,details,category,date,pin)=>async(dispatch)=>{
  let newNote
  try{
    await fetch('http://localhost:3000/notes',{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({title,details,category,date,pin})
    }).then(res=>res.json())
    .then(data=>{newNote=data})
    dispatch({
      type:NOTES.CREATE,
      payload:newNote,
      snackbar:true,
      message:"Note added"
    })
    
  }
  catch(e){
    console.log(e)
  }
}
export const unpinNote=(id)=>async(dispatch)=>{
  let newNote;
    try{
      await fetch("http://localhost:3000/notes/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ pin: 0 }),
          }).then(res => res.json())
          .then(data=>{newNote=data})

      dispatch({
        type:NOTES.UNPIN,
        payload:newNote,
        snackbar:true,
        message:"Note unpinned"
      })
    } 
    catch(e){
      console.log(e)
    } 
}
export const pinNote=(id)=>async(dispatch)=>{
  try{
    let newNote;
    await fetch("http://localhost:3000/notes/" + id, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ pin: 1 }),
            })
              .then((res) => res.json())
              .then((data) => {
                newNote = data;
              });
              const {title,details,category,pin,date,noteID}=newNote
              await fetch('http://localhost:3000/pinNotes',{
              method:'POST',
              headers:{"Content-type":"application/json"},
              body:JSON.stringify({title,details,category,date:date,noteID,pin})
              })
        dispatch({
          type:NOTES.PIN,
          payload:newNote,
          snackbar:true,
          message:"Note pinned"
        })
            
      }
      catch(e){
        console.log(e)
      }
}
export const sortAllNotes=(sortedNotes)=>async(dispatch)=>{
  try{
      dispatch({
        type:NOTES.SORT,
        payload:sortedNotes
      })
  }
  catch(e){
    console.log(e)
  }
}


