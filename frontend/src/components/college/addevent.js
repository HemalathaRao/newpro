import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
export default class addevent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          category: [],
          name: "",
          cat: "",
          description: "",
          no_of_participant: "",
          deadline_for_reg: "",
            college:"",
            event_date:"",
            fees:"",
          file: null, 
        };
        this.onChange = this.onChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
      }
     async componentDidMount() {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try{
          const result = await axios.get(
            `http://localhost:3000/api/v1/category`,
            config
          );
          this.setState({category:result.data.data});
          console.log(result.data.data);
          }
          catch(err){
              console.log("cannot load events")
          }
        }
      // Input on change
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      } // Dropdown change
      handleDropdownChange(e) {
        this.setState({ cat: e.target.value });
      }
      // fileupload
      onChangeHandler = (e) => {
        this.setState({
          file: e.target.files[0],
        });
        console.log(e.target.files[0])
      };
      onSubmit = async (e) => {
        e.preventDefault();
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
            `http://localhost:3000/api/v1/events/photo`,
            data,config
          );
          console.log(res.data.data);
    
          const events = {
            name: this.state.name,
            category: this.state.cat,
            description: this.state.description,
            no_of_participant:this.state.no_of_participant ,
            deadline_for_reg: this.state.deadline_for_reg,
              college:this.state.college,
              event_date:this.state.event_date,
              fees:this.state.fees,
            
            file: res.data.data,
          };
          const body = JSON.stringify(events);
          console.log(body);
          const config1 = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          console.log(token)
          const result = await axios.post(
            `http://localhost:3000/api/v1/events`,
            body,
            config1
          );
          console.log(result.data.data);
          alert(`events added`);
        } catch (err) {
          console.log("Can't load the items");
        }
      
      };

    render() {
        return (
          <div id="backevent">
            <div className="container "  id="add" >
            <div className="card text-center" id="backcolor">
            <div className="card-header">
                <h2 >ADD EVENTS</h2>
                </div>
                <form onSubmit={this.onSubmit} encType="multipart/form-data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Event Name:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="name" value={this.state.name}
                            onChange={this.onChange} placeholder="enter event name"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Event Type:</label>
                        </div>
                        <div className="col-md-6">
                            <select  
                                // className="btn bg-success"
                                onChange={this.handleDropdownChange}>
                                <option value="no cat">None</option>
                                    {this.state.category.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                        {cat.catname}
                                        </option>
                                     ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Event Description:</label>
                        </div>
                        <div className="col-md-6">
                            <textarea type="text" name="description" value={this.state.description}
                            onChange={this.onChange} placeholder="enter description"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">No. of participants:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="no_of_participant" value={this.state.no_of_participant}
                            onChange={this.onChange} placeholder="enter no_of_participant"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Deadline for Register:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="deadline_for_reg" value={this.state.deadline_for_reg}
                            onChange={this.onChange} placeholder="enter deadline_for_reg"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">College Name:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="college" value={this.state.college}
                            onChange={this.onChange} placeholder="enter college name"></input>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Address:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="address" value={this.state.address}
                            onChange={this.onChange} placeholder="enter event name"></input>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Event Date:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="date" name="event_date" value={this.state.event_date}
                            onChange={this.onChange} placeholder="enter event date"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Fees:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="fees" value={this.fees}
                            onChange={this.onChange} placeholder="enter event fees"></input>
                        </div>
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
                   
                    </div>
                    <div className="card-footer">
                        <input type="submit" name="submit" value="Add" className="btn btn-info"/>
                    </div>
                     </form>
                </div>
            </div>
</div>
   
        )
    }
}
