import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
export default function GroupSizesColors({fetchNotes}) {
    const useStyles=makeStyles({
        filter:{
            paddingTop:20,
            paddingBottom:30,
        },
    })
    const [selected,setSelected]=useState('All');
    const classes=useStyles()
    const categories=['All','Work','Monetary','Todos','Reminders']
    const buttons = 
        categories.map((category)=>{return <Button key={category} onClick={()=>{fetchNotes(category.toLowerCase())
        setSelected(category)}} variant={selected===category?'contained':'outlined'} value={category}>{category}</Button>
        })
        
      ;
      
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup color="secondary" aria-label="medium secondary button group" className={classes.filter}>
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
