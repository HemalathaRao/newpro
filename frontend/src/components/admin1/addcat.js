import React, { Component,Fragment } from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'

export default class addcat extends Component {
    constructor(props) {
        super(props);
            this.state = {
                catname:"",
                user:"",
                me:"",
                success: false,
                file: null,
              };
              this.onChange = this.onChange.bind(this);
           }
           onChange(e) {
            this.setState({
              [e.target.name]: e.target.value,
            });
         }
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
           try{
              const res = await axios.post(
                `http://localhost:3000/api/v1/events/photo`,
                data,
                config
              );
              console.log(res.data.data);
            
            const add = {
                catname:this.state.catname,
                file: res.data.data,
                           
             };
            const body = JSON.stringify(add);
            const token = sessionStorage.getItem("token");
            const config1 = {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },              
           }
           console.log(token);
               const result = await axios.post(`http://localhost:3000/api/v1/category`,body,config1);
                   this.setState({success: true,});
               }catch (error) 
               {alert("Sorry Something Wrong!!");}
           }
    render() {
        return (
            <Fragment>
            { this.state.success ?
             ( <Redirect to="/admin/showcat" />
             ):
             (

            <div className="container mt-5" id="add">
            <div className="card text-center">
            <div className="card-header">
                <h2 >Add Category</h2>
                </div>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">Category Name:</label>
                        </div>
                        <div className="col-md-6">
                        <input type="text"
                                   className="col-md-12" 
                                   placeholder="Category" 
                                   name="catname" 
                                   value={this.state.catname}
                                   onChange={this.onChange} 
                                   required></input>
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
                         <input type="submit" className="btn btn-blue mr-5" value="Add" name="submit"></input>
                         <input type="reset" className="btn btn-dark  ml-5" value="Reset"></input>
                    </div>
                     </form>
                </div>
            </div>
             )}
             </Fragment>
   
        )
    }
}
