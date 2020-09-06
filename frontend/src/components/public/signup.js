import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Nav from './navbar'
export default class signup extends Component {
    constructor(props){
        super(props);

        this.state={
            name:"",
            email:"",
            role:"",
            password:"",
            isAuth:false,
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
        const register={
            name:this.state.name,
            email:this.state.email,
            role:this.state.role,
            password:this.state.password
        }
        const body=JSON.stringify(register);
        const config={
            headers:{"Content-Type":"application/json",},
        }
        try {
            const res=await axios.post(`http://localhost:3000/api/v1/auth/register`, body,config)
            
            sessionStorage.setItem("token",res.data.token);
            sessionStorage.setItem("isAuth",true);
            this.setState({
                isAuth:true,
            });
            alert("Registered")
        } catch (error) {
            alert("Signup Error")
        }
    }
    render() {
        const role=this.state.role;
        console.log(role)
        const email=this.state.email;
        return (
            <Fragment>{this.state.isAuth?(role=="student" ?
            (<Redirect isAuth={this.state.isAuth} 
            to={{pathname:'/studentreg',
                    state:{name:this.state.name,
                            email:this.state,email
                         }
            }}
            />)
            :(<Redirect isAuth={this.state.isAuth} 
            to={{pathname:'/collegereg',
                    state:{name:this.state.name,
                            email:this.state.email
                         }
            }}
            />)
            ):(
            <div id="backlogin">
            <Nav/>
                 <form onSubmit={this.onSubmit}>
                  <div className="container"   >
    				   <div className="card card-header mx-auto col-md-5 mt-5" id="form"> 
                         {/* <img  className='justify-left' src={logo} style={{width:'180px'}}></img> <hr/> */}
		     	          <h4 className="mx-auto text-blue mt-2">Let’s get started</h4><hr/>
               
                          <div className="row">
                             <h3 style={{color:"#000"}}><i className='col-md-1 ml-5 mt-4 fa fa-user'></i></h3>
                             <input type="text" className="col-md-7" placeholder="Name" 
                              name="name" value={this.state.name} onChange={this.onChange} required></input>
                         </div>
                        <br></br>
                          <div className="row">
                              <h4><i className=' col-md-2 ml-5 mt-4 fa fa-envelope'></i></h4>
                              <input type="text" className="col-md-7" placeholder="Email Address" 
                               name="email" value={this.state.email} onChange={this.onChange} required></input>
                          </div>
                        
                          <label style={{marginLeft:"80px"}}>I am a....</label>
                             <div className="row" style={{marginLeft:"60px"}}>
                                <div className="col-md-4">
                                  <label class="radio-container">Student
                                     <input type="radio"  name="role" value="student"
                                      onChange={this.onChange} className="ml-2"/>
                                     <span class="checkmark"></span>
                                  </label>
                                  </div>
                                  <div className="col-md-4">
                                  <label class="radio-container ">College
                                      <input type="radio" name="role" value="college" onChange={this.onChange} 
                                      className="ml-2"/>
                                      <span class="checkmark"></span>
                                   </label>
                              </div>
                            </div>
                           <div className="row">
                              <h3><i className=' col-md-1 ml-5 mt-4 fa fa-key'></i></h3>
                              <input type="password" className="col-md-7" placeholder="Password" 
                               name="password" value={this.state.password} onChange={this.onChange} required></input>
                          </div><br/>
                          <button type="submit"  name="submit" value="signup"  className="btn col-md-8 mx-auto btn-info">Signup</button><br/>
                         
                          {/* <Link to="/college_registration" className="btn col-md-8 mx-auto btn-success">College Sign Up</Link><br/> */}

                          {/* <xp className="mx-auto"> Already have an account?<Link to="/login">Sign In</Link></xp> */}
                       </div>
                    </div>
                </form>
           

            </div>
            )}
            </Fragment>
        )
    }
}
