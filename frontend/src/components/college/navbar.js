import React, { Component,Fragment } from 'react'
import {Link , Redirect} from 'react-router-dom'
import axios from 'axios'
import logo from '../images/Eventzone.png'
export default class navbar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         user:"",
         logout:false
        };
        // this.onChange = this.onChange.bind(this);
     
      }
     async componentDidMount() {

        const token = sessionStorage.getItem("token");

        const config2 = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get(`http://localhost:3000/api/v1/auth/me`, config2);
        this.setState({
          user: res.data.data,
        });
        console.log(this.state.user.name)

    }
        onLogout = async (e) => {
            e.preventDefault();
            const token = sessionStorage.getItem("token");
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            };
            try {
              await axios.get("http://localhost:3000/api/v1/auth/logout", config);
              sessionStorage.removeItem("token", "isAuth");
              // alert("Logged Out");
              this.setState({
                logout:true,
              });
            } catch (err) {
              console.log("Can't load the items");
            }
            sessionStorage.clear();
        
    }
  
    render() {
        return (
          <Fragment>
          {this.state.logout?((<Redirect to={{
              pathname:'/'
              
          }}
          />)
          ):(
        <div class="top-nav-bar">
                    <nav>
                    
                    <img id="logo" src={logo} style={{width:"137px"}}></img>
       
        <div className="row">
        {/* <input  id="sbox" type="text" placeholder="Search.." name="search"/>
            <button  id="bttn" className="bg-light btn" ><i class="fa fa-search"></i></button> */}
        <div className="col-md-9">
        <label for="drop" class="toggle" id="menu">Menu</label>
        
        <input type="checkbox" id="drop" />
            <ul class="menu">
                <li><Link to="/college/home">Home</Link></li>
                <li>
                    
                    <label for="drop-1" class="toggle"> Events</label>
                    <Link>Events</Link>
                    <input type="checkbox" id="drop-1"/>
                    <ul>
                        <li><Link to="/college/addevent">Add Events</Link></li>
                        <li><Link to="/college/showevent">Show Events</Link></li>
                        {/* <li><a href="#">Tutorials</a></li> */}
                    </ul> 

                </li>
                <li><Link to="/college/about">About</Link></li>
                <li><Link to="/college/contact">Contact</Link></li>
                <li>
                <Link to="/college/events"><img id="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSDx687cZntUTVHu-wOcc7L28ikxqI99KfX9Ehn90RFdXNFG7&s" alt="Avatar"/>
                </Link>
                <input type="checkbox" id="drop-1"/>
                    <ul>
                        <li><Link to="/college/profile">   {this.state.user.name}</Link></li>
                        <li><Link  type="submit" pointer="cursor" onClick={this.onLogout}>
                        <i className="fa fa-sign-out"></i>Logout</Link></li>
                        {/* <li><a href="#">Tutorials</a></li> */}
                    </ul> 
                </li>

            </ul>
            </div>
           </div> 
        </nav>
        </div>
          )} 
          </Fragment>
      
       
        )
    }
}
