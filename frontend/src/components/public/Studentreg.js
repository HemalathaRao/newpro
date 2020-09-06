import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Nav from './navbar'
// import HomeNav from './HomeNav'
// import logo from '../assets/logo.png'
class Studentreg extends Component {
    constructor(props){
        super(props);

        this.state={
            name:this.props.location.state.name,
            email:this.props.location.state.email,
            usn:"",
            year:"",
            contact:"",
            dob:"",
            gender:"",
            college:"",
            department:"",
            file: null,
            isAuth:false,
        };
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
     // fileupload
     onChangeHandler = (e) => {
      this.setState({
        file: e.target.files[0],
      });
      console.log(e.target.files[0])
    };
    onSubmit=async(e)=>{
        e.preventDefault()
        const data = new FormData();
        data.append("file", this.state.file);
        console.log(data);
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        try {
          const res = await axios.post(
            `http://localhost:3000/api/v1/students/photo`,
            data,
            config
          );
          console.log(res.data.data);
        const register={
            name:this.state.name,
            email:this.state.email,
            usn:this.state.usn,
            year:this.state.year,
            contact:this.state.contact,
            dob:this.state.dob,
            gender:this.state.gender,
            college:this.state.college,
            department:this.state.department,
            file: res.data.data,
        }
        const body=JSON.stringify(register);
        const token = sessionStorage.getItem("token");
        const config1 = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
      console.log(token)
            const result=await axios.post(`http://localhost:3000/api/v1/students`, body,config1)
            this.setState({
                isAuth:true,
            });
            alert("profile submitted")
            console.log(result)
        } catch (error) {
            alert("Error")
        }
    }
  render() {
    return (
        <Fragment>{this.state.isAuth?(<Redirect isAuth={this.state.isAuth} to="/student/home"/>):(
      <div id="backprofile">
        <Nav/>
         <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <div className="container">
				       <div className="card card-header mx-auto col-md-7" id="form"> 
                  {/* <img src={logo} style={{width:'180px'}}></img> <hr/> */}
			            <h4 className="mx-auto text-blue mt-2">Let's start your connection with College</h4><hr/>
               
                  <input type="text" className="col-md-12" placeholder="Name"
                  name="name" value={this.props.location.state.name} disabled></input>

                  <input type="text" className="col-md-12" placeholder="Email Address"
                  name="email" value={this.props.location.state.email} disabled></input>

                  <div className="row">
                      <div className="col-md-4">
                      <input type="text" className="col-md-12" placeholder="USN" 
                      name="usn" value={this.state.usn} onChange={this.onChange} required></input>
                      </div>

                      <div className="col-md-4">
                      <input type="text" className="col-md-12" placeholder="Year"
                      name="year" value={this.state.year} onChange={this.onChange}  required></input>
                      </div>
                  </div>
                  
                 
                  <div className="row">
                    <input type="text" className="col-md-6 ml-3" placeholder="contact number" 
                    name="contact" value={this.state.contact} onChange={this.onChange} pattern="[6-9]{1}[0-9]{9}" required ></input>

                    <input type="date" className="col-md-5 ml-4" placeholder="dob" 
                    name="dob" value={this.state.dob} onChange={this.onChange} required></input>
                  </div>
                                         
                  <div className="row">
                  <div className="col-md-3">
                    <label class="radio-container">Male
                        <input type="radio" name="gender" value="Male" 
                                onChange={this.onChange} className="ml-2"/>
                        <span class="checkmark"></span>
                     </label>
                     </div>
                     <div className="col-md-3">
                     <label class="radio-container">Female
                        <input type="radio" name="gender" value="Female" onChange={this.onChange} className="ml-2"/>
                        <span class="checkmark"></span>
                     </label>
                     </div>
                     <div className="col-md-4">
                     <label class="radio-container">Transender
                        <input type="radio" name="gender" value="Transender" onChange={this.onChange} className="ml-2"/>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                  </div>

                  <div className="row">
                    <input type="text" className="col-md-6 ml-3" placeholder="college " 
                      name="college" value={this.state.college} onChange={this.onChange} required></input>

                    <input type="text" className="col-md-5 ml-4" placeholder="Department" 
                     name="department" value={this.state.department} onChange={this.onChange}  required></input>
                  </div>
                  <div className="row form-group">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">upload image:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="file" name="file"
                            onChange={this. onChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                        </div>
                    </div>

                  {/* <textarea placeholder="Permanent Address"></textarea> */}

                  <div className="row" style={{marginLeft:'22%'}}>
                    {/* <Link to="/home_s" className="btn btn-blue col-md-5 ml-3">Sign Up</Link> */}
                    <input type="submit" className="btn btn-dark ml-5" value="Register" name="submit"></input>
                    <input type="reset" className="btn btn-info col-md-2 ml-3" value="Reset"></input>
                  </div>
                  <p className="mx-auto"> Already have an account?<Link to="/slogin"><p id="showev"> Sign In</p></Link></p>
					     </div>
            </div>
          </form>
        </div>
        )}
        </Fragment>
    )
  }

}
export default Studentreg