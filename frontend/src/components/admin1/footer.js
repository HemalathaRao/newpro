import React from 'react'
import logo from '../images/Eventzone.png'
export default function footer() {
    return (
        <div className="footer">
            <div className="container text-center">
                    <div className="row">
                        <div className="col-md-3">
                            <h1>Usefull Links</h1>
                            <p>Privacy Policy</p>
                            <p>Terms of Use</p>
                            {/* <p>Return Policy</p> */}
                            {/* <p>Discout Coupons</p> */}
                        </div>
                    <div className="col-md-3">
                        <h1>Company</h1>
                        <p><a href="/student/about">About Us</a></p>
                        <p><a href="/student/about">Contact Us</a></p>
                        {/* <p>Career</p> */}
                        {/* <p>Affiliate</p> */}
                    </div>
                    <div className="col-md-3">
                        <h1>Follow Us On</h1>
                        <p><a href="https://www.facebook.com/"><i className="fa fa-facebook-official"></i>Facebook</a></p>
                        {/* <p><i className="fa fa-youtube-play"></i>Youtube</p> */}
                        <p><a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i>LikedIn</a></p>
                        <p><a href="https://twitter.com/"><i className="fa fa-twitter"></i>Twitter</a></p>
                    </div>
                    <div className="col-md-3 footer-image">
                       
                        <img src={logo}/>
                    </div>
                </div>
              

                <p className="copyright">Made with <i className="fa fa-heart-o"></i> By Event Zone</p>
      
        </div>
        </div>
    )
}
