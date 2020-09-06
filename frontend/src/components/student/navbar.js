import React, { Component,Fragment } from 'react'
import Events from './events'
import { Link,Redirect } from 'react-router-dom'
import logo from '../images/Eventzone.png'
import axios from 'axios'
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
        console.log(this.state.user)

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
          {/* {this.state.user == student ?((<Redirect to={{pathname:'/student/hm'}}/>))} */}
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

        <label for="drop" class="toggle">Menu</label>
        <input type="checkbox" id="drop" />
            <ul class="menu">
                <li><Link to='/student/home'>Home</Link></li>
                {/* <li> */}
                    
                    {/* <label for="drop-1" class="toggle"> Events</label> */}
                    {/* <Link to='/student/event'>Events</Link> */}
                    {/* <input type="checkbox" id="drop-1"/>
                    <ul>
                        <li><a href="#">Add Events</a></li>
                        <li><a href="#">Show Events</a></li>
                        {/* <li><a href="#">Tutorials</a></li> 
                    </ul>  */}

                {/* </li> */}
                {/* <li>

              
                <label for="drop-2" class="toggle">Web Design +</label>
                <a href="#">Web Design</a>
                <input type="checkbox" id="drop-2"/>
                <ul>
                    <li><a href="#">Resources</a></li>
                    <li><a href="#">Links</a></li>
                    <li>
                       
                  
                    <label for="drop-3" class="toggle">Tutorials +</label>
                    <a href="#">Tutorials</a>         
                    <input type="checkbox" id="drop-3"/>

                    <ul>
                        <li><a href="#">HTML/CSS</a></li>
                        <li><a href="#">jQuery</a></li>
                        <li><a href="#">Other</a></li>
                    </ul>
                    </li>
                </ul>
                </li> */}
                {/* <li><a href="#">Graphic Design</a></li> */}
                {/* <li><a href="#">Inspiration</a></li> */}
                <li><Link to='/student/about'>About</Link></li>
                <li><Link to='/student/contact'>Contact</Link></li>
                <li><Link><img id="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSDx687cZntUTVHu-wOcc7L28ikxqI99KfX9Ehn90RFdXNFG7&s" alt="Avatar"/>
                    </Link>
                <input type="checkbox" id="drop-1"/>
                    <ul>
                    <li>
                    <Link to="/student/profile">  
                     {this.state.user.name}
                     </Link>
                     </li>
                        <li><Link to="/" type="submit" pointer="cursor" onClick={this.onLogout}>
                        <i className="fa fa-sign-out"></i>Logout</Link></li>
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
