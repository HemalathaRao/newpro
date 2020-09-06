import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class animated extends Component {
    render() {
        return (
            <div className='container' >
            <div  className="row">
            {/* <div className="card col-md-6 mt-5" style={{width:'100%'}}>
                    <img src="https://www.yapsody.com/wp-content/uploads/2019/05/myths-the-heroes-fighting-the-truth-behind-event-planning-1024x633.jpg" alt="hhu"/>
                </div> */}
            <div class="context" >
                {/* <h1>Pure Css Animated Background</h1>  */}
                
                <div className="col-md-6">
                <Link to='/registration'> 
                <button className="header-button btn btn-info " id="animbtn"><span>Let's get Started</span></button>
                </Link>
                </div>

                <h1 >Build Your Connection.......</h1>
                </div>
               
            </div>
            
                
                
        
    
    
    <div class="area" >
                <ul class="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
        </div>
         
    </div>
        )
    }
}
