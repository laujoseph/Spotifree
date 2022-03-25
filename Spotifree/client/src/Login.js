import React from 'react';
import raindrops from "./video/raindrops.mp4"
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=1a9068e5a02c4897adb142f295edfe75&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played"

const Login = () => {
    return (
        
        <div className="login">
        <video autoPlay loop muted id='video' style={{
            position: "fixed",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%,-50%)",
            zindex: "-1",
        }}>
            <source src={raindrops} type='video/mp4'/>
        </video>
        <div className="logintitle">Spotifree</div>
            <a className="loginbtn"  href={AUTH_URL}>
                <span>Login with Spotify</span>
                </a>
        </div>
    );
};

export default Login;