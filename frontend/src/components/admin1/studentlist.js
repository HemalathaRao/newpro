import React, { Component } from 'react'
import axios from 'axios'

export default class studentlist extends Component {

        state = {
           students: [],
           student_id:"",
           student_name:"",
           view:false
         };
         componentDidMount = async () => {
           const token = sessionStorage.getItem("token");
           const config = {
             headers: {
                 Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json",},
             };
           const res = await axios.get(` http://localhost:3000/api/v1/students`, config);
             this.setState({
             students: res.data.data,
           });
             console.log(this.state.students);  };
       deleteStudent = async (id,user, e) => {
         alert("You Want To Delete this Student?");
         const token = sessionStorage.getItem("token");
         const config = {
           headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json", },
           };
           try {
             const res = await axios.delete(`http://localhost:3000/api/v1/students/${id}`,config); 
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
                   <th>Student Name</th>
                   <th>USN</th>
                   <th>Email</th>
                   <th>College Name</th>
                   <th>Department</th>
                   <th>Phone</th>
                    <th>Action</th>
               </tr>
               </thead>

               <tbody>
               {this.state.students.map((student) => (
               <tr>
                   <td>{student.name}</td>
                   <td>{student.usn}</td>
                   <td>{student.email}</td>
                   <td>{student.college}</td>
                   <td>{student.department}</td>
                   <td>{student.contact}</td>
                 
                   <td>
                   {/* <button className="btn btn-success  mb-2 mr-2 btn-sm"><i class="fa fa-pencil-square" aria-hidden="true"></i></button> */}
                       <button className="btn btn-danger mb-2 mr-2  btn-sm" 
                        onClick={(e) =>this.deleteStudent(student._id,student.user,e)}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                   </td>
               </tr>
               ))}
               </tbody>
               </table>
       </div>
        )
    }
}
