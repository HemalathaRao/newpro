import React, { Component, Fragment } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
export default class events extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          events:[],
          event_id:"",
          view:false,
          me:"",
        };
    }
        async componentDidMount() {
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
        })
        console.log(this.state.me)
        const res = await axios.get(`http://localhost:3000/api/v1/colleges/${this.state.me}/events`, config1);
        this.setState({
          events: res.data.data,
        });
        console.log(this.state.events)
            }
            onClick=async(id,e)=>{
                e.preventDefault();
                this.setState({
                    view:true,
                    event_id:id
                })
            }
    render() {
        return (
            <Fragment>
            {this.state.view?((<Redirect view={this.state.view} to={{
                pathname:'/college/desc',
                state:{event_id:this.state.event_id}
            }}
            />)
            ):(
            <div id="backabout">
                {/* <div class="featured-categories "> */}
                <div class="container ">
                        <div class="row ">
                            
                            {this.state.events.map((event)=>(
                            <div class="col-md-3"  >
                            <div class="product-top ">
                                <img id="catimg" src={event.file} style={{width:"250px"}}/>
                                <div class="overlay-right">
                                {/* <Link to="/student/desc"> */}
                                <button type="button" class="btn btn-secondary" title="Description"
                                   onClick={(e)=>
                                    this.onClick(event._id,e)} >
                                        <i class="fa fa-eye"></i>
                                    </button>
                                    {/* </Link> */}
                                    {/* <button type="button" class="btn btn-secondary" title="Like">
                                        <i class="fa fa-registered"></i>
                                    </button> */}
                                </div>
                                {/* <div className="">
                                    
                            </div> */}
                            </div>
                            <div class="card-footer product-bottom text-center">
                                <h5>{event.name}</h5>
                            </div>
                            
                            </div>
                            ))}
                        </div>
                    </div>
                {/* </div> */}
            </div>
            )}
            </Fragment>
        )
    }
}
