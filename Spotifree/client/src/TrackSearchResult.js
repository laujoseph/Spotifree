import React from "react";

const TrackSearchResult = ({track, chooseTrack}) => {
    const handlePlay=()=>{
      console.log(track)
        chooseTrack(track)
    }
  return (
  <div className="tracklist">
        <img
        alt="albumimage"
        className="image" 
        src={track.albumUrl}
        onClick={handlePlay}
        />
        <div>
        <div className="title" onClick={handlePlay}>{track.title}</div>
        <div className="artist" onClick={handlePlay}>{track.artist}</div>
        </div>
   </div>
   
  )
};

export default TrackSearchResult;
