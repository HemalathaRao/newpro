import React from 'react';
// import logo from './logo.svg';
import '../../App.css';
import {Link, Switch, Route,BrowserRouter as Router} from 'react-router-dom'
import CNav from './navbar'
import Footer from './footer'
import About from './about'
import Contact from './contact'
import Events from './events'
import Profile from './profile'
import Editprof from './editprof'
import Addevent from "./addevent"
import Showevent from "./showevent"
import Desc from './description'
// import Signup from './components/Signup' 
// import Login from './components/Login' 
// import Forgot from './components/Forgot' 
function Allc() {
  return (
    <>
        
        <Router>
        <CNav/>
          <Switch>
             <Route  exact path="/college/home" component={Events}/>
             <Route  path="/college/about" component={About}/>
             <Route  path="/college/contact" component={Contact}/>
             <Route  path="/college/profile" component={Profile}/>
             <Route path="/college/editprof" component={Editprof}/>
             <Route  path="/college/addevent" component={Addevent}/>
             <Route  path="/college/showevent" component={Showevent}/>
             <Route  path="/college/desc" component={Desc}/>
          </Switch>
          {/* <Footer/> */}
        </Router>
    
        {/* <Events/> */}
    </>
  );
}

export default Allc;
