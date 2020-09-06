import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class collegelist extends Component {

        state = {
           colleges: [],
           college_id:"",
           college_name:"",
           view:false
         };
         componentDidMount = async () => {
           const token = sessionStorage.getItem("token");
           const config = {
             headers: {
                 Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json", },
             };
           const res = await axios.get(` http://localhost:3000/api/v1/colleges`, config);
             this.setState({
             colleges: res.data.data, });
             console.log(this.state.colleges);  };
       deleteCollege = async (id,user, e) => {
         alert("You Want To Delete this College?");
         const token = sessionStorage.getItem("token");
         const config = {
           headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
             },
           };
           try {
             const res = await axios.delete(`http://localhost:3000/api/v1/colleges/${id}`,config); 
             window.location.reload();
            } catch (error) {
             alert("something wrong");
            }
                
     }
    render() {
        return (
            <div id="showev" className="container-fluid">
               
            <table class="table table-bordered">
               <thead>
               <tr>
                   <th>College Name</th>
                   <th>University</th>
                   <th>Email</th>
                   <th>Website</th>
                   <th>Phone</th>
                   <th>Address</th>

                    <th>Action</th>
               </tr>
               </thead>

               <tbody>
               {this.state.colleges.map((college) => (
               <tr>
                   <td>{college.name}</td>
                   <td>{college.university}</td>
                   <td>{college.email}</td>
                   <td ><a style={{color:"black"}}href={college.website}>{college.website}</a></td>
                   <td>{college.contact}</td>
                   <td>{college.address}</td>
                   <td>
                   {/* <button className="btn btn-success  mb-2 mr-2 btn-sm"><i class="fa fa-pencil-square" aria-hidden="true"></i></button> */}
                       <button className="btn btn-danger mb-2 mr-2  btn-sm" 
                        onClick={(e) =>this.deleteCollege(college._id,college.user,e)}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                   </td>
               </tr>
               ))}
               </tbody>
               </table>
       </div>
        )
    }
}
