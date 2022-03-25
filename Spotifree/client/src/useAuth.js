import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code, //posting code to this end point
      })
      .then(res => {
        // access token is required for requests
        setAccessToken(res.data.accessToken); 
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // pushState removes the excess codes in the URL
        window.history.pushState({}, null, "/");
      }) // redirects to login page if there's an error concerning the auth code
      .catch(() => {
        window.location = "/";
      });
    // effect happens everytime code changes
  }, [code]);

  useEffect(() => {
    // this effect should only be ran when there's no refreshToken or when it's about to expire
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken, 
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, null, "/");
        }) 
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000); // this effect to run 1min before token expires
    return () => clearInterval(interval)
    // effect happens everytime refreshToken, expiresIn changes
  }, [refreshToken, expiresIn]);

  // accessToken is the thing we need to call all the different spotify APIs.
  return accessToken;
};
export default useAuth;
