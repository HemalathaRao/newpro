import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Link, Switch, Route,BrowserRouter as Router} from 'react-router-dom'
import PrivateRoute from './components/utils/PrivateRoute'
import Allc from './components/college/allc' 
import Alls from './components/student/alls';
import Allp from './components/public/allp';
import Admin from './components/admin1/adminroute'
import Homep from './components/public/phome'
import Footer from './components/public/footer'
function App() {
  return (
   
        
        <Router>
   
          <Switch>
          <Route  exact path="/" component={Homep}/>
              <PrivateRoute role="admin" path={'/admin'} component={Admin}/>
             <PrivateRoute role="college"  path={'/college'} component={Allc}/>
             <PrivateRoute role="student"  path={'/student'} component={Alls}/>
             <Allp/>
          </Switch>
         <Footer/>
        </Router>
    

  );
}

export default App;
