import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return(
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h3>Zoom</h3>
                </div>
                <div className='navlist'>
                    <p>Join as a Guest</p>
                    <p>Register</p>
                    <div role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color: "#FF9839"}}>Connect</span> with you loved One</h1>
                    <p>Cover a distance by Zoom Video Call</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>

        </div>

    )
}
