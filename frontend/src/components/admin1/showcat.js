import React, { Component } from 'react'
import axios from 'axios'

export default class showcat extends Component {
    state = {
        categories: [],
        cat_id:"",
        cat_name:"",
        delete:false
      };
      componentDidMount = async () => {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
        const res = await axios.get(` http://localhost:3000/api/v1/category`, config);
          this.setState({
          categories: res.data.data, });          
      };
      deleteProject = async (id,name, e) => {
        alert("You Want To Delete this Category?");
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",   },
          };
          const res = await axios.delete(`http://localhost:3000/api/v1/category/${id}`,config); 
            this.setState({
                  delete:true,
                });
                window.location.reload();             
    }
    render() {
        return (
            <div id="showev" className="container-fluid">
               
                 <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Event Name</th>
                         <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.categories.map((cat) => (
                    <tr>
                        <td>
                        {cat.catname}
                        </td>
                        <td>
                        {/* <button className="btn btn-success  mb-2 mr-2 btn-sm"><i class="fa fa-pencil-square" aria-hidden="true"></i></button> */}
                            <button className="btn btn-danger mb-2 mr-2  btn-sm" 
                            onClick={(e) =>this.deleteProject(cat._id, e)}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                    </table>
            </div>
        )
    }
}
