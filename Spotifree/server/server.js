const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors")
const lyricsFinder = require("lyrics-finder")
// bodyParser() is required to make form data available in req.body
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log('hi')
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "1a9068e5a02c4897adb142f295edfe75",
    clientSecret: "c5d2af13e8ce425590c76f6a7892ee3d",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })
      console.log(data.body);
    })
    .catch((err) => {
        console.log(err)
      res.sendStatus(400);
    });
});

// clientId, clientSecret and refreshToken has been set on the api object previous to this call.

//.post sends an HTTP POST request to the API
app.post("/login", (req, res) => {
  // The code that's returned as a query parameter to the redirect URI
  const code = req.body.code;
  // Credentials
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "1a9068e5a02c4897adb142f295edfe75",
    clientSecret: "c5d2af13e8ce425590c76f6a7892ee3d",
  });
  // Retrieve an access token and a refresh token
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      // res.json function handsets the content-type header to application/JSON so that the client treats the response string as a valid JSON object
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      // 400 = 'Bad Request'
      res.sendStatus(400);
    });
});

app.get('/lyrics', async (req, res)=>{
  const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "Woops there's no lyrics for this song sorry!"
  res.json({ lyrics })
})
app.listen(3001);
// hardcoding port to run on
