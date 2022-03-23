import React from 'react';
import SpotifyPlayer from "react-spotify-web-playback"

const MusicPlayer = ({ accessToken , trackUri}) => {
    if (!accessToken) return null
    return (
       <SpotifyPlayer 
        token={accessToken}
        // have to pass in trackUri to show which track to play
        uris={trackUri? [trackUri] : []}
        play={true}
        // showSaveIcon
       />
    );
};

export default MusicPlayer;