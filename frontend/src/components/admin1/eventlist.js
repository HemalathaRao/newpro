import React, { Component,Fragment } from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'

export default class eventlist extends Component {
    state = {
        events: [],
        event_id:"",
        event_name:"",
        view:false
      };
      componentDidMount = async () => {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
        const res = await axios.get(` http://localhost:3000/api/v1/events`, config);
          this.setState({
          events: res.data.data,
        });
          console.log(this.state.events);
               
      };
      deleteEvent = async (id,user, e) => {
        alert("You Want To Delete this event?");
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          try {
            const res = await axios.delete(`http://localhost:3000/api/v1/events/${id}`,config); 
            // const reslt=await axios.delete(`http://localhost:5000/api/v1/auth/${id}`,config)
            window.location.reload();
           } catch (error) {
            alert("something wrong");
           }
               
    }
  
      geteventId = async (id,name, e) => {
        e.preventDefault();
        this.setState({
            event_id: id,
            event_name:name,
            view:true,
        });
        console.log(id)
    }

 render() {
        return (
        //     <Fragment>
        //  {this.state.view ?
        //  ( 
        //      (<Redirect view={this.state.view} 
        //        to={{pathname:'',
        //                state:{project_id:this.state.project_id,
        //                       project_name:this.state.project_name}
        //            }} 
        //        />) 
        //     )
        //  : 
        //  (
            <div id="showev" className="container-fluid">
                {/* <div className="card"> */}
               
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th style={{width:"20%"}}>Image</th>
                         <th>Event_Name</th>
                         {/* <th>type</th> */}
                         <th>description</th>
                         {/* <th>College</th> */}
                         <th>Participants</th>
                         <th>Reg.Deadline</th>
                         <th>Date</th>
                         <th>Fees</th>
                         <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.events.map((event)=>(
                    <tr>
                        <td className="card"><img  id="show" src={event.file}/></td>
                        <td>{event.name}</td>
                        {/* <td>{event.category}</td> */}
                        <td>{event.description}</td>
                        {/* <td>{event.college}</td> */}
                        <td>{event.no_of_participant}</td>
                        <td>{event.deadline_for_reg}</td>
                        <td>{event.event_date}</td>
                        <td>{event.fees}</td>
                        <td>
                        {/* <button className="btn btn-success  mb-2 mr-2 btn-sm"><i class="fa fa-pencil-square" aria-hidden="true"></i></button> */}
                            <button className="btn btn-danger mb-2 mr-2  btn-sm" 
                            onClick={(e) =>this.deleteEvent(event._id,event.user,e)}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                        </td>

                    </tr>
                    ))}
                    </tbody>
                </table>  
               
                
            </div>
        //  )}
        //  </Fragment>
        )
    }
}
