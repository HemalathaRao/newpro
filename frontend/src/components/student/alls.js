import React from 'react';
// import logo from './logo.svg';
import '../../App.css';
import {Link, Switch, Route,BrowserRouter as Router} from 'react-router-dom'
import SNav from './navbar'
import Footer from './footer'
import About from './about'
import Contact from './contact'
import Events from './events'
import Profile from './profile'
import Editprof from './editprof'
import Desc from './description'
import Home from './home'
import Catevents from './catevents'

function Alls() {
  return (

        
        <Router>
        <SNav/>
          <Switch>
             <Route  exact path="/student/hm" component={Events}/>
             <Route  path="/student/about" component={About}/>
             <Route  path="/student/contact" component={Contact}/>
             <Route  path="/student/profile" component={Profile}/>
             <Route path="/student/editprof" component={Editprof}/>
             <Route path="/student/desc" component={Desc}/>
             <Route path="/student/home" component={Home}/>
             <Route path="/student/catevents" component={Catevents}/>
             {/* <Route  path="/addevent" component={Addevent}/> */}
             {/* <Route  path="/showevent" component={Showevent}/> */}
          </Switch>
          {/* <Footer/> */}
        </Router>
    
  
  );
}

export default Alls;
