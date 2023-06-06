import { DeleteOutlined,Edit } from '@mui/icons-material'
import { Avatar, Button, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Icon, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useScrollTrigger } from '@mui/material'
import {Card,CardHeader} from '@mui/material'
import { blue, green, orange, red, yellow } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useState } from 'react'
import ShowMoreText from 'react-show-more-text'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import clsx from "clsx";
import { useEffect } from 'react'
const useStyles = makeStyles({
    avatar: {
      bgcolor: (note) => {
        if (note.category == 'work') {
          return yellow[700]
        }
        if (note.category == 'money') {
          return orange[500]
        }
        if (note.category == 'todos') {
          return red[500]
        }
        return blue[500]
      },
    },
    card:{
      '&:hover, $showIcon, & .Mui-focused $showIcon':{ 
        visibility: "visible"
      },
      '&:hover':{
        border:'1px solid black',
        background:'#E8E8E8',
        
      },
    },
    showIcon:{
    },
    icon:{
      visibility:"hidden"
    },
    editDialog:{
      margin:'auto',
      height:'60vh',
    }
  })
  
  export default function NoteCard({note,handleDelete,handleEditNote,pinNotes}) {
    const [deleteOpen,setDeleteOpen]=useState(false);
    const [editOpen,setEditOpen]=useState(false);
    const[title,setTitle]=useState(note.title);
    const pin=note.pin;
    const date=note.date;
    const[details,setDetails]=useState(note.details);
    const[category,setCategory]=useState(note.category);
    const [categories,setCategories]=useState([]);
    const[expand,setExpand]=useState(false);
    const [open,setOpen]=useState(false);
    useEffect(() => {
      fetchNotes();
      return () => {
        setCategories([]); // This worked for me
      };
  }, []);
    const fetchNotes=() => {
      fetch('http://localhost:3000/categories')
        .then(res => res.json())
        .then(data => {
        setCategories(data)})
    }
    
    const handleDeleteOpen=()=>{
        setDeleteOpen(true)
    }
    const handleDeleteClose=()=>{
        setDeleteOpen(false)
    }
    const handleEditOpen=()=>{
        setEditOpen(true)
    }
    const handleEditClose=()=>{
        setEditOpen(false)
    }
    const handleReadMore = () => {
      setExpand(!expand);
    };
    const updatedNote={title,details,category,pin,date}
    const classes=useStyles()
    return (
      <div>
        <Card elevation={1} sx={{height:'-webkit-fill-availabe'}} className={classes.card}     
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor:()=>{
                if (note.category == 'Work') {
                    return yellow[700]
                  }
                  if (note.category == 'Monetary') {
                    return green[500]
                  }
                  if (note.category == 'Todos') {
                    return red[500]
                  }
                  return blue[500]

              }}}>
                {note.category[0].toUpperCase()}
              </Avatar>}
            action={
                <>
                <IconButton onClick={() => handleEditOpen()}>
                    <Edit/>
                </IconButton>
                <IconButton onClick={() => handleDeleteOpen()}>
                        <DeleteOutlined color='error' />
                    </IconButton>
                </>
            }
            title={note.title}
            subheader={note.date}

          />
          <CardContent>
            <Typography component={'span'} variant="body2" color="textSecondary">
              {details?note.details.substring(0,30):""}
             {details.length>30?
             <ShowMoreText
             lines={1}
             more={"Read more..."}
             less={"Read less..."}
             onClick={()=>handleReadMore()}
             expanded={expand}
             >
               {note.details.substring(30,note.details.length)}
             </ShowMoreText>:""}
            </Typography>
            <CardActions disableSpacing>
              <IconButton style={{height:'40px', width:'40px',marginLeft:270,marginTop:'auto'}} className={clsx(classes.icon, {[classes.showIcon]: open })} onClick={()=>pinNotes(note.id)}>
              <PushPinRoundedIcon></PushPinRoundedIcon>
            </IconButton>
            </CardActions>
          </CardContent>
        </Card>

        <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {`Are you sure, you want to delete "${note.title}" ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} sx={{color:'#888888'}}>CANCEL</Button>
          <Button onClick={()=>{handleDelete(note.id) 
            handleDeleteClose()}} color='secondary'>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}  className={classes.editDialog}>
        <DialogTitle>Edit a Note</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            color='secondary'
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}

          />
          <TextField
            margin="dense"
            id="details"
            label="Details"
            type="text"
            fullWidth
            variant="outlined"  
            color='secondary'
            multiline
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            />
            
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='secondary'>Category</InputLabel>
       
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          color='secondary'
          defaultValue={""}
          onChange={(e)=>{setCategory(e.target.value)}}
          value={category}
          required
          MenuProps={{
            disablePortal:true
          }}
        >
          {categories.map((item)=>{
                     return <MenuItem key={item.category} value={item.category} color='secondary' onChange={(e)=>setCategory(e.target.value)}>{item.category}</MenuItem>

          })}
        </Select>
      </FormControl>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} sx={{color:'#888888'}}>CANCEL</Button>
          <Button onClick={()=>{handleEditNote(note.id,updatedNote)
          handleEditClose()}} color='secondary'>EDIT</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }


