import { Grid } from '@material-ui/core';
import { Route, Routes } from 'react-router';
import './App.css';
import NavBar from './components/NavBar';
import DashBoard from './pages/DashBoard';
import FunctionalTest from './pages/FunctionalTest';
import Projectslist from './pages/Projectslist';
import Runner from './pages/Runner';
import Unittest from './pages/Unittest';
function App() {
  return (
  <>
    <Grid container>
      <Grid item md={1.5}>
        <NavBar/>
      </Grid>
      <Grid item md={10}>
        <Routes>
         <Route path="/" element={<DashBoard />} exact/>
         <Route path="/projects_lists" element={ <Projectslist />} exact/>
         <Route path="/runner" element={<Runner />}  exact/>
         <Route path="/functional_test" element={<FunctionalTest/>} />
         <Route path="/unit_test" element={<Unittest/>} />
         <Route path="/runner" exact element={<Runner />}/>
        </Routes>
      </Grid>
    </Grid>
  </> 
  );
}

export default App;