import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import { createTheme,ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';
import Layout from './components/Layout'
function App() {
  const theme=createTheme(
    {
      palette:{
        secondary:purple,
        primary: {
          main: '#fefefe'
        },
      },
      typography:{
        fontFamily:'Lato',
        fontWeightLight:400,
        padding:50
       }
    }
  )
  
  return (
   
    <ThemeProvider theme={theme}>
    <Router>
      <Layout>
      <Switch>
        <Route path='/'>
          <Notes/>
        </Route>
      </Switch>
      </Layout>
    </Router>
    </ThemeProvider>
   
  );
}

export default App;
