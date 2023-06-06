import { AddCircleOutlineOutlined,LabelOutlined, SubjectOutlined } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import LabelIcon from '@mui/icons-material/Label';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addCategories, requestCategories } from '../redux/Categories/actions';
import { requestNotes } from '../redux/Notes/action';
function DrawerComponent({fetchNotes,isCategory}) {
    const drawerWidth=240;
    const theme=useTheme();
    const [displayBox,setdislayBox]=useState(false);
    const [category,setCategory]=useState('');
    const [selected,setSelected]=useState('All');
    const {categories,snackbar} = useSelector((state) => state.categoriesReducer);
  const dispatch=useDispatch();
    useEffect(async() => {
     dispatch (requestCategories())
    },[])
    
    const useStyles=makeStyles({
        drawer: {
            width: drawerWidth,
          },
          active: {
                color:'#808080'                    
                },
          title: {
            padding: theme.spacing(2),
          },
          bottomPush: {
            position: "fixed",
            bottom: 0,
            textAlign: "center",
            paddingTop: 100,
        }
    })
    const classes=useStyles();
    const handleAddCategory=()=>{
      setdislayBox(true);
    }
    const handleCloseCategory=()=>{
      setdislayBox(false);
    }
    const handleAllNotes=()=>{
      isCategory(false)
      dispatch(requestNotes())
      setSelected('All')
    }
    const storeCategory= ()=>{
      dispatch(addCategories(category));
      dispatch(requestCategories());
      console.log(snackbar)
    }

  return (
    <>
    <Drawer anchor='left' variant='permanent' className={classes.drawer} classes={{paper:classes.drawer}}>
            <Typography variant="h6" className={classes.title}>MY NOTES</Typography>
                <List>
                    <ListItem 
                    button 
                    onClick={()=>handleAllNotes()} 
                    key="All"
                    >
                        <ListItemIcon>
                        <SubjectOutlined color='secondary'></SubjectOutlined>
                        </ListItemIcon>
                        <ListItemText primary="All Notes" />
                    </ListItem>

                    <ListItem button onClick={()=>handleAddCategory()} className={classes.bottomPush} style={{marginTop:"auto"}}>
                      <ListItemIcon><AddCircleOutlineOutlined color='secondary'></AddCircleOutlineOutlined></ListItemIcon>
                      <ListItemText primary="Add Category"></ListItemText>
                    </ListItem>       
                    
            
              {categories.map((item)=>{
                return (
                <ListItem button key={item.category} onClick={()=>{fetchNotes(item.category) 
                setSelected(item.category)
                isCategory(true)}}>
                  <ListItemIcon>{selected===item.category?<LabelIcon fontSize='medium' color='secondary'></LabelIcon>:<LabelOutlined fontSize='medium' color='secondary'></LabelOutlined>}</ListItemIcon>
                <ListItemText primary={item.category} />
              </ListItem>)
              })}

           
        </List>
  </Drawer>

        <Dialog open={displayBox} onClose={handleCloseCategory}>
        <DialogTitle>Add a Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            color='secondary'
            onChange={(e) => {setCategory(e.target.value)}}
           />
          </DialogContent>
          <DialogActions>
          <Button onClick={()=>{storeCategory()
          handleCloseCategory()
          }} color='secondary'>SUBMIT</Button>
          <Button onClick={handleCloseCategory} sx={{color:'#888888'}}>CANCEL</Button>
        </DialogActions>
          </Dialog>
            </>

  )
}

const mapStateToProps = (state) => ({ notes: state.notes,snackbar:state.snackbar,message:state.message })

export default connect(mapStateToProps)(DrawerComponent);

