import React from "react";

const TrackSearchResult = ({track, chooseTrack}) => {
    const handlePlay=()=>{
        chooseTrack(track)
    }

  return (
  <div className="tracklist"onClick={handlePlay}>
        <img
        className="image" 
        src={track.albumUrl}
        
        />
        <div>
        <div className="title" onClick={handlePlay}>{track.title}</div>
        <div className="artist" onClick={handlePlay}>{track.artist}</div>
        </div>
   </div>
   
  )
};

export default TrackSearchResult;
