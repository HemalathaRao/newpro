import React from 'react'
import Aboutimg from '../images/sincerely-media-dGxOgeXAXm8-unsplash.jpg'

export default function about() {
    return (
        <div id="backcontact">
        <div className="container" id="backabout">
        <div className="card-header mr-5">
             <h1>About Us!</h1>
        </div>
             <div className="card-body">
             <div className="row">
                 <div className="col-md-6">
               
                     <h6>Event planning requires foresight, follow through and attention to detail. You need to see the big picture as well as the tiniest of details. You need Vision. <br></br>
                     <br></br>Our Vision is to reduce the direct communication between the students and the event organizer to avoid the difficulties of the student to enter into event and participate for the event.</h6>

                   
                 </div>
            
                <div class = " col-md-6">

                <div className="card"  style={{width:"450px"}}>
                    <img className="m-2" 
                    src={Aboutimg} alt=""style={{height:"200px"}} />
                </div>
                </div>
                </div>
                </div>
                <div className="card-footer about ml-5">
                <div class="row">
                    <div class="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200" >
                        {/* <span class="fa fa-group"></span> */}
                        <h2>CONNECTION</h2>
                        <p class="lead">
                            The users i.e. Students can easily register for the events which will organized by the different Institutions/Colleges.So that the students can connect the colleges easily.
                        </p>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200">
                        {/* <span class="fa fa-info"></span> */}
                        <h2>VISION </h2>
                        <p class="lead">
                            Build a bridge between Students and Institutions/Colleges.
                        </p>
                    </div>
                    <div class="clearfix visible-md-block visible-sm-block"></div>
                    <div class="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200">
                        {/* <span class="fa fa-file"></span> */}
                        <h2>Feature</h2>
                        <p class="lead">
                            View the events which is happen in the colleges.
                        </p>
                    </div>
          
                </div>
                </div>
      </div>
                
        </div>
    )
}
