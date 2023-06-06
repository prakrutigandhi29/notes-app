import {Container, FormControl, InputLabel, MenuItem, Select, Snackbar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import Drawer from '../components/DrawerComponent';
import AddNote from '../components/AddNote';
import NotesList from '../components/NotesList';
import { requestNotes, sortAllNotes } from '../redux/Notes/action';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchNotesCategoryWise } from '../redux/Categories/actions';
function Notes() {
  const {snackbar,message,notes} = useSelector((state) => state.notesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestNotes());
  }, []);

  const [sortValue,setSortValue]=useState("");
  const [category,setCategory]=useState(false);
  const useStyles=makeStyles({
    box:{
      marginTop:50
    },
    select:{
      marginLeft:900
    }
  })
  const classes=useStyles();
const fetchNotes=(category)=>{
  dispatch(fetchNotesCategoryWise(category));
}
  const sortNotes=()=>{
    let sortedNotes;
    if(sortValue=='Newest First'){
      sortedNotes=notes.sort((a, b) => new Date(...a.date.split('-').reverse()) - new Date(...b.date.split('-').reverse()));
    }
    else{
      sortedNotes=notes.sort((a, b) => new Date(...b.date.split('-').reverse()) - new Date(...a.date.split('-').reverse()));
    }
      dispatch(sortAllNotes(sortedNotes));
  }

  
  return (
    <Container className={classes.box}>
      <Drawer  isCategory={setCategory} fetchNotes={fetchNotes} />
      <div className={classes.select}> 
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel color='secondary' sx={{color:'#d500f9'}}>SORT</InputLabel>
        <Select
          label="sort"
          disableUnderline
          color='secondary'
          value={sortValue??""}
          onChange={(e)=>{setSortValue(e.target.value)}}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={"Newest First"}  onClick={()=>sortNotes()}>Newest First</MenuItem>
          <MenuItem value={"Oldest First"}  onClick={()=>sortNotes()}>Oldest First</MenuItem>
        </Select>
      </FormControl>
      </div>
      <AddNote isCategory={setCategory} /><br></br>
      <NotesList isCategory={category} />
      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        message={message}
      />
    </Container>
  )
 
}
const mapStateToProps = (state) => ({ notes: state.notes,snackbar:state.snackbar,message:state.message })


export default connect(mapStateToProps)(Notes);
