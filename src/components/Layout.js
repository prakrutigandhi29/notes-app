import { makeStyles } from '@mui/styles'
import { Avatar,IconButton,Toolbar, useTheme} from '@mui/material';
import { Typography } from '@mui/material';
import { AppBar} from '@mui/material';
import format from 'date-fns/format';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
function Layout({children}) {
    const drawerWidth=240;
    const theme=useTheme();
    const useStyles = makeStyles(() => {
        return {
          layout: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(5),
            paddingLeft:'20%'
          },
          root: {
            display: 'flex',
          },
          drawer: {
            width: drawerWidth,
          },
          active: {
                color:'#808080'                    
                },
          title: {
            padding: theme.spacing(2),
          },
          appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: -240,
            margin:"auto"
          },
          date: {
            marginRight:-10
          },
          toolbar: theme.mixins.toolbar,
          name:{
              paddingLeft:theme.spacing(135)
          },
          avatar:{
              marginLeft:800
          },
        }
      })
    
    const classes=useStyles();
  return (
    <div className={classes.root}>
        <div>
        <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
            <IconButton>
                <CalendarMonthRoundedIcon color='secondary'></CalendarMonthRoundedIcon>
            </IconButton>

          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Avatar src='https://mui.com/static/images/avatar/3.jpg' className={classes.avatar}/>

          <Typography className={classes.name} position="fixed">Prakruti</Typography>
        </Toolbar>
      </AppBar>
        </div>
        <div className={classes.layout}>
          {children}
        </div>
</div>
  )
}

export default Layout
