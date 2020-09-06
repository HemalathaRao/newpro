
import React, { Component,Fragment } from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from "axios";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
// import backedit from '../images/ian-schneider-PAykYb-8Er8-unsplash (1).jpg'
// import StudentNav from './StudentNav'
// import RightFixed from './RightFixed'

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          edit:false,
          user: "",
          profile: {},
          file: null,
          id:"",
          name:"",
          email:"",
          university:"",
          website:"",
          phone:"",
         address:""
        };
        this.onChange = this.onChange.bind(this);
      }
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
     }
     componentDidMount = async () => {
        // getting user
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get(`http://localhost:3000/api/v1/auth/me`, config);
    
        this.setState({
          user: res.data.data._id,
        });
        console.log(this.state.user);
        // user profile data
        try {
          const reslt = await axios.get(
            `http://localhost:3000/api/v1/colleges/${this.state.user}/me`,
            config
          );
          this.setState({
           profile: reslt.data.data[0],
          });
        } catch (err) {
          console.log("Can't load the items");
        }
        console.log(this.state.profile);
       this.setState({
          id:this.state.profile._id,
          name:this.state.profile.name,
          email:this.state.profile.email,
          university:this.state.profile.university,
          website:this.state.profile.website,
          phone:this.state.profile.phone,
          address:this.state.profile.address,
        });
      };

      onSubmit = async (e) => {
        e.preventDefault();
        
        const edit = {
           name:this.state.name,
           email: this.state.email,
           university:this.state.university,
           website:this.state.website,
           phone:this.state.contact,
           address:this.state.address
         };
        const body = JSON.stringify(edit);
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
       }
         try {
              const res = await axios.put(`http://localhost:3000/api/v1/colleges/${this.state.id}`,body,config);
              this.setState({edit: true,});
              console.log(res);
           }catch (error) {
                           alert("Sorry Something Wrong!!");
                          }
      }
    render() {
    //  const {
    //     name,
    //     email,
    //     phone,
    //     dob,
    //     gender,
    //    college,
    //    department,
    //    address
    //   } = this.state.profile;
        return (
          <Fragment>
          { this.state.edit ?
           ( <Redirect to="/college/profile" />
           ):
           (
          <div className="backedit">
      
               {/* <StudentNav/> */}
               <form method="post" onSubmit={this.onSubmit}>
                   <div className="container">
                       <div className="row"> 
                         <div className="col-md-9"  style={{backgroundColor:"#66CDAA"}}>
                             <div className="card mt-3"  style={{backgroundColor:"#008080"}}> 
                	            <h4 className="mx-auto text-blue mt-2"  style={{fontWeight:"bolder", fontSize:"42px"}}>Edit Details</h4><hr/>
                              </div>
                              <div>
                                 <input type="text" name="name"
                                 className="col-md-12" placeholder="Name" 
                                 value={this.state.name} onChange={this.onChange} required></input>

                                 <input type="text" className="col-md-12" name="email"
                                 placeholder="Email Address" value={this.state.email} onChange={this.onChange} required ></input>
                                  <div className="row">
                                  <input type="text" name="university"
                                 className="col-md-6 ml-3" placeholder="University" 
                                 value={this.state.university} onChange={this.onChange} required></input>
                                 <input type="text" name="website"
                                 className="col-md-5 ml-4" placeholder="website" 
                                 value={this.state.website} onChange={this.onChange} required></input> 
                                </div> 
                                <div className="row">
                                   <input type="text" 
                                   className="col-md-6 ml-3" placeholder="contact number" name="phone"
                                    value={this.state.phone} onChange={this.onChange} pattern="[6-9]{1}[0-9]{9}" required></input>

                                       
                                  
                                   {/* <input type="date" className="col-md-5 ml-4" placeholder="dob" 
                                   name="dob" value={this.state.dob} onChange={this.onChange} required></input>  */}
                                </div>
                                         
                               

                              

                                <textarea placeholder="Permanent Address" name="address"
                                 value={this.state.address} onChange={this.onChange}></textarea> 

                                 <div className="row" style={{marginLeft:'22%'}}>
                                    {/* <Link to="/student/profile" className="mr-5 ml-r "> */}
                                    <input type="submit" className="btn btn-info " value=" Edit "></input>
                                    {/* </Link> */}
                                    <input type="reset" className="btn btn-dark ml-5" value="Clear"></input>
                                 </div>
                 
					                    </div>      
                          
                             </div>

	                           
                             <div className="col-md-3">
                                {/* <RightFixed/> */}
                             </div>
                             
                        </div>
                    </div>
                   
                </form>
                
            </div>
              )}
              </Fragment> 
        )
    }

}
export default EditProfile
