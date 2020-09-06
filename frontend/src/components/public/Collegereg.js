import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Nav from './navbar'
// import HomeNav from './HomeNav'
// import logo from '../assets/logo.png'
class Collegereg extends Component {
    constructor(props){
        super(props);

        this.state={
            name:this.props.location.state.name,
            email:this.props.location.state.email,
            university:"",
            website:"",
            slug:"",
            contact:"",
            address:"",     
            file: null,
            isAuth:false,
        };
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
     // fileupload
     onChangeHandler = (e) => {
      this.setState({
        file: e.target.files[0],
      });
      console.log(e.target.files[0])
    };
    onSubmit=async(e)=>{
        e.preventDefault()

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
            `http://localhost:3000/api/v1/colleges/photo`,
            data,
            config
          );
        
          console.log(res.data.data);
        const register={
            name:this.state.name,
            email:this.state.email,
            university:this.state.university,
            website:this.state.website,
            slug:this.state.slug,
            contact:this.state.contact,
            address:this.state.address,
            file: res.data.data,
        }
        const body=JSON.stringify(register);
        // const config={
        //     headers:{"Content-Type":"application/json",},
        const token = sessionStorage.getItem("token");
        const config1 = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
console.log(token)
        
        
            const result=await axios.post(`http://localhost:3000/api/v1/colleges`, body,config1)
            
            // sessionStorage.setItem("token",res.data.token);
            // sessionStorage.setItem("isAuth",true);
            this.setState({
                isAuth:true,
            });
            alert("profile submitted")
        } catch (error) {
            alert(" Error")
        }
    }
  render() {
    return (
        <Fragment>{this.state.isAuth?(<Redirect isAuth={this.state.isAuth} to="/college/home"/>):(
      <div id="backprofile">
      <Nav/>
             
        <form onSubmit={this.onSubmit}>
          <div className="container">
				    <div className="card card-header mx-auto col-md-7" id="form"> 
              {/* <img src={logo} style={{width:'180px'}}></img> <hr/> */}
			        <h4 className="mx-auto text-blue mt-2">Let's get connected with students</h4><hr/>
               
                <input type="text" className="col-md-12" placeholder="College Name"
                name="name" value={this.props.location.state.name} disabled></input>

                <input type="text" className="col-md-6 ml-3" placeholder="Email Address"
                name="email" value={this.props.location.state.email} disabled ></input>

                <input type="text" className="col-md-7 ml-3" placeholder="university"
                 name="university" value={this.state.university} onChange={this.onChange} required ></input>
                      
               <div className="row">
                 <input type="text" className="col-md-7 ml-3" placeholder="website"
                 name="website" value={this.state.website} onChange={this.onChange} required ></input>

                 <input type="text" className="col-md-4 ml-4" placeholder="Add slug" 
                   name="slug" value={this.state.slug}  onChange={this.onChange} required></input>
                </div>

                <div className="row">
                  
                  <input type="text" className="col-md-5 ml-4" placeholder="contact number"
                    name="contact" value={this.state.contact} onChange={this.onChange} pattern="[6-9]{1}[0-9]{9}" required></input>
                </div>
                                         
               <textarea placeholder="Address" name="address" value={this.state.address} onChange={this.onChange}></textarea>

               <div className="row form-group">
                        <div className="col-md-6">
                            <label for="exampleFormControlInput1">upload image:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="file" name="file"
                            onChange={this. onChangeHandler} class="form-control-file" id="exampleFormControlFile1"/>
                        </div>
                    </div>
                <div className="row" style={{marginLeft:'22%'}}>
                  <input type="submit" className="btn btn-blue" value="Submit" name="submit"></input>
                  <input type="reset" className="btn btn-dark col-md-3 ml-5" value="Reset"></input>
                </div>
                <p className="mx-auto"> Already have an account?<Link to="/clogin"> Sign In</Link></p>
					  </div>
          </div>
        </form>
      </div>
        )}
        </Fragment>
    )
  }

}
export default Collegereg