import React, { Component } from 'react'
import Animate from '../public/animated'
import Aboutimg from '../images/sincerely-media-dGxOgeXAXm8-unsplash.jpg'
export default class phome extends Component {
    render() {
        return (
            <>
            <header >
                <section class="header-content">
                {/* <Animate/> */}
                    {/* <img class="rocky-dashed animate-pop-in"  
                    src="https://cssanimation.rocks/levelup/public/images/rocky-dashed.svg"/> */}
                           <div ><h2 style={{ fontSize:"50px", fontWeight:"bolder"}}>
                        Welcome to Admin Dashboard</h2></div>
                </section>
                </header>
                <h1 class="abouttxt text-center">About</h1>
                <div class="about m-5">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12">
                        <img src={Aboutimg} class="img-fluid"/>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12 desc">
                        
                        <h3>EventZone</h3>
                        <p id="para">
                        Event planning requires foresight, follow through and attention to detail. You need to see the big picture as well as the tiniest of details. You need Vision. <br></br>
                     <br></br>Our Vision is to reduce the direct communication between the students and the event organizer to avoid the difficulties of the student to enter into event and participate for the event. 
                        </p>
                    </div>   
              </div> 
              </div> 
              {/* <div class="contact-form">
                    <div class="container">
                    <form>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                        <h1 style={{color:"brown", fontSize:"40px"}}>Get in Touch</h1> 
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 right">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg" placeholder="Your Name" name=""/>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control form-control-lg" placeholder="YourEmail@email.com" name="email"/>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control form-control-lg">
                            
                            </textarea>
                        </div>
                        <input type="submit" class="btn btn-secondary btn-block" value="Send" name=""/>
                        </div>
                    </div>
                    </form>
                    </div>
                    </div> */}
                </>
        )
    }
}
