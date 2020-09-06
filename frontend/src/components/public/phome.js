import React, { Component } from 'react'
import Animate from './animated'
import Aboutimg from '../images/sincerely-media-dGxOgeXAXm8-unsplash.jpg'
import cont from '../images/contact.jpg'
import Nav from './navbar'
import axios from 'axios'
export default class phome extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          email: "",
          subject: "",
          message: "",
          
        };
        this.onChange = this.onChange.bind(this);
      }
      // Input on change
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }
      // register
      onSubmit = async (e) => {
        e.preventDefault();
    
        const reg = {
          name: this.state.name,
          email: this.state.email,
          subject: this.state.subject,
          message: this.state.message,
          
        };
       
        const token = sessionStorage.getItem("token");
        const body = JSON.stringify(reg);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        // console.log(body);
        try {
          const res = await axios.post(
            `http://localhost:3000/api/v1/reviews`,
            body,
            config
          );
          console.log(res.data);
          alert("successfully sent")
          window.location.reload()
        } catch (error) {
          alert("Error");
        }
      
      };
  
    render() {
        // window.location.reload()
        return (
            <div>
           
            <Nav/>
            
            <header>
                <section class="header-content">
                <Animate/>
                    <img class="rocky-dashed animate-pop-in"  
                    src="https://cssanimation.rocks/levelup/public/images/rocky-dashed.svg"/>
                           
                </section>
                </header>
                <h1 class="abouttxt text-center">About</h1>
                <section id="wavepage">
                <div class="about m-5">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12">
                        <img src={Aboutimg} class="img-fluid"/>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12 desc">
                        
                        <h3 style={{fontSize:"50px",fontWeight:"bolder",color:"lightblue"}}>EventZone</h3><br></br>
                        <p id="para" style={{fontWeight:"bold",color:"lightbrown"}}>
                        Event planning requires foresight, follow through and attention to detail. You need to see the big picture as well as the tiniest of details. You need Vision. <br></br>
                     <br></br>Our Vision is to reduce the direct communication between the students and the event organizer to avoid the difficulties of the student to enter into event and participate for the event. 
                        </p>
                    </div>   
              </div> 
              </div> 
              <div class="contact-form">
                    <div class="container" >
                    <form onSubmit={this.onSubmit}>
                    <div class="row">
                        <div class=" card col-lg-4 col-md-4 col-sm-12 mt-3 mb-3" style={{backgroundColor:"#fafafa"}}>
                        <img src={cont}  alt="img" style={{height:"200px", width:"100%"}}></img>
                        <h5 style={{color:"brown", fontSize:"50px", fontWeight:"bolder"}}>Get in Touch</h5>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 right">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg" placeholder="Your Name" 
                            name="name" value={this.state.name}
                          onChange={this.onChange}/>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control form-control-lg"
                             placeholder="YourEmail@email.com" name="email"
                             value={this.state.email}
                          onChange={this.onChange}
                             />
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg" 
                            placeholder="Your Subject" name="subject" value={this.state.subject}
                          onChange={this.onChange}/>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control form-control-lg"  name="message" value={this.state.message}
                          onChange={this.onChange}>
                            
                            </textarea>
                        </div>
                        <input type="submit" class="btn btn-secondary btn-block" value="Send"/>
                        </div>
                    </div>
                    </form>
                    </div>
                    </div>
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="wave wave3"></div>
                    <div className="wave wave4"></div>
                    </section>
                </div>
        )
    }
}
