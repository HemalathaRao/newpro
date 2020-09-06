import React, { Component, Fragment } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
export default class events extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          category: [],
          events:[],
          event_id:"",
          view:false,
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
        async componentDidMount() {

            const token = sessionStorage.getItem("token");

        const config1 = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get(`http://localhost:3000/api/v1/events`, config1);
        this.setState({
          events: res.data.data,
        });
        console.log(this.state.events)
            const config = {
                headers: {
                //   Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              };
              try{
              const result = await axios.get(
                `http://localhost:3000/api/v1/category`, config
              );
              this.setState({category:result.data.data});
              console.log(result.data.data);
              }
              catch(err){
                  console.log("cannot load events")
              }
            }
            onClick=async(id,e)=>{
                e.preventDefault();
                this.setState({
                    view:true,
                    event_id:id
                })
            }
            
            handleDropdownChange(e) {
                this.setState({ cat: e.target.value });
                console.log(this.state.cat)
              }
          
    render() {
        return (
            <Fragment>
            {this.state.view?((<Redirect view={this.state.view} to={{
                pathname:'/student/desc',
                state:{event_id:this.state.event_id}
            }}
            />)
            ):(
            <div id="backabout">
                <section class="featured-categories">
                <div class="container">
                        <div class="row">
                            <div className="col-md-3">
                                <div className="card">
                                    <h1 id="showev">Event Types</h1>
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
                            {this.state.events.map((event)=>(
                            <div class="col-md-3">
                            <div class="product-top">
                                <img id="catimg" src={event.file}/>
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
                            </div>
                            <div className="card-footer">
                                    <h5>{event.name}</h5>
                            </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            )}
            </Fragment>
        )
    }
}
