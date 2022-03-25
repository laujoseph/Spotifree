import React, { useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback"

const MusicPlayer = ({ accessToken , trackUri}) => {
    const [play, setPlay] =useState(false)

    useEffect(()=> setPlay(true), [trackUri])
    if (!accessToken) return null
    return (
       <SpotifyPlayer 
        token={accessToken}
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        // have to pass in trackUri to show which track to play
        uris={trackUri? [trackUri] : []}
        play={play}
        // showSaveIcon
       />
    );
};

export default MusicPlayer;