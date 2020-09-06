import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: "",
          profile: {},
          file: null,
        };
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
          const res = await axios.get(
            `http://localhost:3000/api/v1/students/${this.state.user}/me`,
            config
          );
          this.setState({
            profile: res.data.data[0],
          });
          console.log(this.state.profile);
        } catch (err) {
          console.log("Can't load the items");
        }
      };
      // fileupload selection
      onChangeHandler = (e) => {
        this.setState({
          file: e.target.files[0],
        });
      };
      // File Upload
      onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", this.state.file, this.state.file.name);
    
        console.log(data);
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        try {
          const res = await axios.put(
            `http://localhost:3000/api/v1/students/${this.state.profile._id}/photo`,
            data,
            config
          );
        //   this.setState({
        //     file: res.data.data[0],
        //   });
          console.log(res);
          alert("Profile Updated");
        } catch (err) {
          console.log("Can't load the items");
        }
      };
    render() {
        const {
            user,
            name,
            email,
            dob,
            file,
            usn,
            college,
            department,
            contact,
          } = this.state.profile;
          console.log(file);
        return (
            <div id="backcontact">
               
                <div class="container card" id="backabout">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={`${file}`} alt=""/>
                            {/* <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> */}
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        {name}
                                    </h5>
                                    <h6>
                                        {email}
                                    </h6>
                                    {/* <p class="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                    
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <div className="row">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                {/* <li class="nav-item"> */}
                                    {/* <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a> */}
                                {/* </li> */}
                                </div>
                            </ul>
                            
                        </div>
                    </div>
                    <div class="col-md-2">
                       <Link to="/student/editprof"> <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/></Link>
                    </div>
                </div>
                <br></br>
                <div class="row">
                    {/* <div class="col-md-4">
                        <div class="profile-work">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                        </div>
                    </div> */}
                    <div class="col-md-8 ">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row ">
                                            <div class="col-md-6 ">
                                                <label>USN</label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6>{usn}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label> College Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6>{college}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>DOB</label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6>{dob}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Department</label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6>{department}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6>{contact}</h6>
                                            </div>
                                        </div>
                                        
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
               
            </div>
        )
    }
}
