import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Nav from './navbar'

// import HomeNav from './HomeNav'
class Forgot extends Component {
    constructor(props){
        super(props);

        this.state={
            email: "",
        };
        this.onChange=this.onChange.bind(this);
    }
    onChange=(e)=>{
        this.setState({
            email:e.target.value,
        });
    };
    onSubmit=async(e)=>{
        e.preventDefault();
        try{
        const forgot={
            email:this.state.email,
        }
        const body=JSON.stringify(forgot);
        const config={
            headers:{"Content-Type":"application/json",},
        };
        console.log(body);
        console.log(config);
        const result= await axios.post(`http://localhost:3000/api/v1/auth/forgotpassword`,body,config);
        console.log(result);
        alert("mail sent")
        } catch (error) {
            alert("Error");
        }
    }
    render() {
        return (
           <div id="backlogin">
           <Nav/>
               <form method="post" onSubmit={this.onSubmit}>
                  <div className="container "><br/><br/>
                      <div className="card card-header mx-auto col-md-5 mt-5 "> 
                          {/* <img  className='justify-left' src={logo} style={{width:'180px'}}></img> <hr/> */}
                          <h4 className="text-center text-blue mt-3" style={{fontWeight:"bolder"}}>Forgot Password</h4><hr/>
                                              
                          <div className="row">
                             <h4><i className=' col-md-2 ml-5 mt-4 fa fa-envelope'></i></h4>
                             <input type="text" className="col-md-7" placeholder="Email Address" 
                             name="email" value={this.state.email} onChange={this.onChange} required></input>
                          </div>
                         
                          <button className="btn  btn-info col-md-8 mx-auto">Send OTP</button><br/>
                 
                          <p className="mx-auto" style={{fontSize:"14px"}}> Don't have an account?<Link to="/registration">Sign Up</Link></p>
                 
                        </div>
                   </div>
              </form>
           </div>
        )
    }
}
export default Forgot