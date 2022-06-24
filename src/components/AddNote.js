import { CardContent,Card, TextField, Collapse, ClickAwayListener, FormControl, FormLabel, RadioGroup, FormControlLabel, Button, Radio, InputLabel, Select, MenuItem, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import format from 'date-fns/format'
import { createNote, requestNotes } from '../redux/Notes/action'
import { useDispatch, useSelector } from 'react-redux'
import { requestCategories } from '../redux/Categories/actions'
function AddNote({isCategory}) {
    const [expand,setExpand]=useState(false)
    const {categories} = useSelector((state) => state.categoriesReducer);
    const dispatch=useDispatch()
    const usestyles=makeStyles({
        card:{
            width:500,
            marginBottom:0,
            marginTop:-50,
            margin:"auto",
            alignItems:'center',
        },
    })
    const classes=usestyles();
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [category,setCategory]=useState('')
    useEffect(() => {
      dispatch(requestCategories());
      },[])
   
    const handleField=()=>{
        setExpand(true)
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      setTitleError(false)
      const date=format(new Date(), 'dd-MM-yy')
      const pin=0
      if (title == '') {
        setTitleError(true)
      }
      
      if (title && category) {
        dispatch(createNote(title,details,category,date,pin))
        dispatch(requestNotes())  
        setExpand(false);
        isCategory(true)
      } 
    }
  return (
    <div>
      <ClickAwayListener onClickAway={()=>setExpand(false)}>
      <Card className={classes.card}>
          <CardContent>
              <TextField 
              variant={expand?'standard':'outlined'}
              color="secondary" 
              required
              fullWidth
              placeholder={expand?'Title':'Take a Note...'}
              onClick={()=>handleField()}
              onChange={(e)=>{setTitle(e.target.value)}}
              error={titleError}
            />
            
            <Collapse in={expand}>
                <CardContent>
                <TextField 
              variant="outlined" 
              color="secondary" 
              required
              fullWidth
              placeholder='Add Details'
              onChange={(e)=>setDetails(e.target.value)}
              required
            />
                             <br></br><br></br><br></br>

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='secondary'>Category</InputLabel>
       
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          color='secondary'
          defaultValue={"Monetary"}
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
        <br></br><br></br>
      </FormControl>
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          onClick={(e)=>handleSubmit(e)}
          className={classes.button}
          >
          Done
        </Button>
      
        </CardContent>
            </Collapse>
            
          </CardContent>

      </Card>
      </ClickAwayListener>
      
    </div>
  )
}

export default AddNote
