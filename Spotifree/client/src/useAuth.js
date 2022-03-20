import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code, //posting code to this url route
      })
      .then((res) => {
        console.log(res.data)
        setAccessToken(res.data.accessToken); // this token is required for requests
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // pushState removes the excess codes in the URL 
        window.history.pushState({}, null, "/");
      }) // redirects to login page if there's an error
      .catch(() => {
        window.location = "/";
      });
      // effect happens everytime code changes
  }, [code]);

  useEffect(()=>{
    axios
      .post("http://localhost:3001/refresh", {
        refreshToken, //posting code to this url route
      })
      .then((res) => {
        setAccessToken(res.data.accessToken); 
        setExpiresIn(res.data.expiresIn);
        // pushState removes the excess codes in the URL 
        window.history.pushState({}, null, "/");
      }) // redirects to login page if there's an error
      .catch(() => {
        window.location = "/";
      });
    // effect happens everytime refreshToken, expiresIn changes
  }, [refreshToken, expiresIn])

  // accessToken is the thing we need to call all the different spotify APIs.
  return accessToken
};
export default useAuth;
