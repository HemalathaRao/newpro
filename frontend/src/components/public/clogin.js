import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Nav from './navbar'
// import HomeNav from './HomeNav'
class clogin extends Component {
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            isAuth:false,
            role:"",
            me:""
        };
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
   
    onSubmit=async(e)=>{
        e.preventDefault()
        const login={
            email:this.state.email,
            password:this.state.password
        }
        const body=JSON.stringify(login);
        const config={
            headers:{"Content-Type":"application/json",},
        }
        try {
            const res=await axios.post(`http://localhost:3000/api/v1/auth/login`, body,config)
            
            sessionStorage.setItem("token",res.data.token);
            const token = sessionStorage.getItem("token");
            const config2 = {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    };
                    const result = await axios.get(`http://localhost:3000/api/v1/auth/me`, config2);
                    this.setState({
                      me: result.data.data.role,
                    });
                    console.log(this.state.me)

            sessionStorage.setItem("isAuth",true);
            this.setState({
                isAuth:true,
            });

        } catch (error) {
            alert("Login Error")
        }
    }
    render() {

        return (
            <Fragment>{this.state.isAuth && this.state.me == 'college'?(<Redirect isAuth={this.state.isAuth} to="/college/home"/>):(
           <div id="backlogin">
           <Nav/>
               <form method="post" onSubmit={this.onSubmit}>
                  <div className="container "><br/><br/>
                      <div className="card card-header mx-auto col-md-5" id="form"> 
                          {/* <img  className='justify-left' src={logo} style={{width:'180px'}}></img> <hr/> */}
                          <h4 className="text-center text-blue mt-3">Sign Into Your Account</h4><hr/>
                                              
                          <div className="row">
                             <h4><i className=' col-md-2 ml-5 mt-4 fa fa-envelope'></i></h4>
                             <input type="text" className="col-md-7" placeholder="Email Address"
                             name="email" value={this.state.email} onChange={this.onChange} required></input>
                          </div>

                          <div className="row">
                             <h4><i className='col-md-1 ml-5 mt-4 fa fa-key'></i></h4>
                             <input type="password" className="col-md-7" placeholder="Password"
                             name="password" value={this.state.password} onChange={this.onChange} required></input>
                          </div>
                 
                          <Link to="/forgot" className="mx-auto"><h6 id="showev">Forgot password?</h6></Link><br/>
                 
                          <button type="submit"  name="submit" value="Login"  className="btn col-md-8 mx-auto btn-info">Login</button><br/>
                 
                          <p className="mx-auto"> Don't have an account?<Link to="/registration"><h6 id="showev">Sign Up</h6></Link></p>
                 
                        </div>
                   </div>
              </form>
           </div>
            )}
           </Fragment>
        )
    }
}
export default clogin