import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { deleteNotes, editNotes, pinNote, requestNotes, unpinNote } from '../redux/Notes/action';
import NoteCard from './NoteCard'

function NotesList({isCategory}) {
    const[pinNotes,setpinNotes]=useState([]);
    const {notes} = useSelector((state) => state.notesReducer);
    const dispatch=useDispatch();
    useEffect(async () => {
        await fetch('http://localhost:3000/pinNotes')
          .then(res => res.json())
          .then(data => {
            setpinNotes(data)})
      }, [])
     
    const handleDelete = async (id) => {
      dispatch(deleteNotes(id))
      dispatch(requestNotes())
    }
      const handleEditNote=async(id,newNote)=>{
      dispatch(editNotes(id,newNote))
      dispatch(requestNotes())
    }
    const pinnedNotes=async(id)=>{
        let notepin;
        notes.map((item)=>{
            if(item.id==id){
              notepin=item.pin
            }
            return item
        })
        if (notepin == 1) {
          dispatch(unpinNote(id))
          dispatch(requestNotes())
        }
    
        else {
          dispatch(pinNote(id))
          dispatch(requestNotes())  
        }
      }
    

   
  return (
      <>
      {isCategory ? 
      <Grid container spacing={4}>
      {
      notes.map(note=>{
          {
             return( 
           <Grid item key={note.id} xs={12} sm={6} md={4}>
           <NoteCard note={note} handleDelete={handleDelete} handleEditNote={handleEditNote} pinNotes={pinnedNotes} />
           </Grid>)}
         })}
      </Grid> :

        <div>
        {pinNotes.length>0 && <><Typography variant="h6">PINNED</Typography><Grid container spacing={4}>
              {notes.map(note => {
                               return note.pin===1?
                  <Grid item key={note.id} xs={12} sm={6} md={4}>
                      <NoteCard note={note} handleDelete={handleDelete} handleEditNote={handleEditNote} pinNotes={pinnedNotes}/>
                  </Grid>:""
            })}
          </Grid>
          <br></br>< br></br><br></br><br></br>
          <Typography variant='h6'>OTHERS</Typography>
          </>
}

     <Grid container spacing={4}>
     {notes.map(note=>
         {
             return note.pin===0?
          <Grid item key={note.id} xs={12} sm={6} md={4}>
          <NoteCard note={note} handleDelete={handleDelete} handleEditNote={handleEditNote} pinNotes={pinnedNotes} />
          </Grid>:""
        })}
     </Grid>
    </div>
    
      }
    </>
  )
}
const mapStateToProps = (state) => ({ notes: state.notes,snackbar:state.snackbar,message:state.message })
export default connect(mapStateToProps)(NotesList);
