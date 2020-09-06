import React, { Component,Fragment } from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
export default class showevent extends Component {
    state = {
    event: [],
    category:[],
    event_id:"",
    delete:false,
    me:"",
    user:""
  };
deleteEvent= async (eventid,e)=>{
    alert("Are you sure to delete this event?")
    const token = sessionStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
}
try{
const res = await axios.delete(
    ` http://localhost:3000/api/v1/events/${eventid}`,
    config
  );
  this.setState({
    delete: true,
  });
  alert("deleted successfully")
  console.log(res.data.data);
}
catch(err){
    alert("some error")
}
}
 componentDidMount =  async () => {
    const token = sessionStorage.getItem("token");
    const config1 = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const result=await axios.get(`http://localhost:3000/api/v1/auth/me`,config1);
    this.setState({
        me:result.data.data._id,
        user:result.data.data.name,
    })
    console.log(this.state.user)
    const res = await axios.get(
        ` http://localhost:3000/api/v1/colleges/${this.state.me}/events`,
        config1
      );
      this.setState({
        event: res.data.data,
        category:res.data.data.category,
      });
      console.log(res.data.data);
  };
  
 

    render() {
       
        return (
            <div id="showev" className="container-fluid">
                {/* <div className="card"> */}
               
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th style={{width:"20%"}}>Image</th>
                         <th>Event_Name</th>
                         {/* <th>type</th> */}
                         <th>Description</th>
                         <th>College</th>
                         <th>Participants</th>
                         <th>Reg.Deadline</th>
                         <th>Date</th>
                         <th>Fees</th>
                         <th>Action</th>
                    </tr>
                    </thead>

                    <tbody >
                    {this.state.event.map((events)=>(
                    <tr  >
                        <td  className="card"><img  id="show" src={events.file}  /></td>
                        <td>{events.name}</td>
                        {/* <td>{events.category}</td> */}
                        <td>{events.description}</td>
                        <td>{this.state.user}</td>
                        <td>{events.no_of_participant}</td>
                        <td>{events.deadline_for_reg}</td>
                        <td>{events.event_date}</td>
                        <td>{events.fees}</td>
                        <td>
                        {/* <button className="btn btn-success  mb-2 mr-2 btn-sm">
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        </button> */}
                            <button className="btn btn-danger mb-2 mr-2  btn-sm" 
                            onClick={(e)=>this.deleteEvent(events._id,e)}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                        </td>

                    </tr>
                    ))}
                    </tbody>
                </table>  
                {/* </div> */}
                
            </div>
        )
    }
}
