import React, { useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    width:'100%'
  },
  box:{
    marginTop:50
  }
})
export default function Create() {
  const history=useHistory()
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [category,setCategory]=useState('monetary')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)

    if (title == '') {
      setTitleError(true)
    }
    
    if (title && category) {
      fetch('http://localhost:3000/notes',{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title,details,category})
      }).then(()=>history.push('/'))
    } 
  }

  return (
    <Container size="sm" className={classes.box}>
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a Note
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Title" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
        />
        <br></br><br></br>
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
        />
        <br></br><br></br>
        <FormControl className={classes.field}>
        <FormLabel color='secondary'>Note Category</FormLabel>
        <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}> 
          <FormControlLabel label="Monetary" control={<Radio color='secondary'/>} value="monetary"></FormControlLabel>
          <FormControlLabel label="Reminders" control={<Radio color='secondary'/>} value="reminders" ></FormControlLabel>
          <FormControlLabel label="Work" control={<Radio color='secondary'/>} value="work" ></FormControlLabel>
          <FormControlLabel label="Todos" control={<Radio color='secondary'/>} value="todos" ></FormControlLabel>
        </RadioGroup>
        </FormControl><br></br><br></br>
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      
    </Container>
  )
}