import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import MusicPlayer from "./MusicPlayer";
import axios from "axios";
import Greeting from "./Greeting";
import FadeIn from "react-fade-in";

const spotifyApi = new SpotifyWebApi({
  clientId: "1a9068e5a02c4897adb142f295edfe75",
});

const MainPage = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [lyrics, setLyrics] = useState();
  const [showGreeting, setShowGreeting] = useState(true);

  const chooseTrack = (track) => {
    setCurrentTrack(track);
    // when choosing track, empty the search
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    setInterval(() => {
      setShowGreeting(!showGreeting);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!currentTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: currentTrack.title,
          artist: currentTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [currentTrack]);
  // console.log(searchResults);

  // whenever accesstoken changes, set token on spotifyAPI
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Get the authenticated user
  // spotifyApi.getMe()
  // .then(function(data) {
  //   console.log('Some information about the authenticated user', data.body);
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      //info i want: artist name, album image, track name, URI
      setSearchResults(
        res.body.tracks.items.map((track) => {
          // compares the image height and grabs the smallest image
          const smallestAlbumImage = track.album.images.reduce(
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
        {showGreeting && <Greeting />}

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
    </div>
  );
};

export default MainPage;
