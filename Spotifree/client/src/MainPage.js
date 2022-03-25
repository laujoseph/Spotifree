import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import MusicPlayer from "./MusicPlayer";
import axios from "axios";
import FadeIn from "react-fade-in";
import UserProfile from "./UserProfile";
import RecentlyPlayed from "./RecentlyPlayed";

const spotifyApi = new SpotifyWebApi({
  clientId: "1a9068e5a02c4897adb142f295edfe75",
});
// const OAuth =
//   "BQCyyWCMzxyJmIBrI8YJFrMFVxkCnFBzO_REMsSUux8dJqj8xf73yHwFyv_dmiH53SF6dUG90vTM5U48_gopjm567ahaS3MF9Voo7n8mCRhnQR-jpb3FCDtltGjI2DPFf9OL1Q5sd5s8c49v2dsX";

const MainPage = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(); //  currentTrack expects an object, inside the object the required things are uri, title, name 
  const [lyrics, setLyrics] = useState();
  const [userInfo, setUserInfo] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  
  
  // Get recently played tracks 
  useEffect(() => {
    if (!accessToken) return;
    // fetching api data every 1000ms

    // const timer = setInterval(() => {
      const fetchRecentlyPlayed = () => {
        axios
          .get("https://api.spotify.com/v1/me/player/recently-played?limit=20", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const recentlyplayedlist = res.data.items;
            console.log(recentlyplayedlist);
            setRecentlyPlayed(recentlyplayedlist);
          });
      };
      fetchRecentlyPlayed();
    // }, 1000);
               // clearing interval
    // return () => clearInterval(timer);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchUserInfo = () => {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data);
          setUserInfo(res.data);
        });
    };
    fetchUserInfo();
  }, [accessToken]);

  const chooseTrack = (track) => {
    setCurrentTrack(track);
    // when choosing track, empty the search
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!currentTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        // to get lyrics for a song, title and artist of track is required
        params: {
          track: currentTrack.title,
          artist: currentTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [currentTrack]);


  // whenever accesstoken changes, set token on spotifyAPI
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      //info required: artist name, album image, track name, URI
      setSearchResults(
        res.body.tracks.items.map((track) => {
          // compares the image height and grabs the smallest image
          const smallestAlbumImage = track.album.images.reduce(
            // previous, current
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="container">
      <div className="container2"></div>
      <FadeIn>
        <form>
          <input
            className="searchbox"
            type="search"
            placeholder="Search Tracks by Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="searchresultslist">
            {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
            {searchResults.length === 0 && (
              <div className="lyricscontainer">{lyrics}</div>
            )}
          </div>
          {/* passing in the access token to enable playback fn*/}
          <div>
            <MusicPlayer
              trackUri={currentTrack?.uri}
              accessToken={accessToken}
            />
          </div>
        </form>
      </FadeIn>
      <UserProfile userInfo={userInfo} />

      <RecentlyPlayed 
      recentlyPlayed={recentlyPlayed}
      chooseTrack={chooseTrack}
      />
    </div>
  );
};

export default MainPage;
