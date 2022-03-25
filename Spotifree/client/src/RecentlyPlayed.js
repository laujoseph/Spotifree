import React from 'react';

const RecentlyPlayed = ({recentlyPlayed, chooseTrack}) => {

    const handlePlay=(track)=>{
        console.log(recentlyPlayed[0])
        // console.log(recentlyPlayed[0].track.name)
        // console.log(recentlyPlayed[0].track.artists[0].name)
          chooseTrack(track)
      }
    // title and artist for lyrics
    return (
        <div className="recentlyplayed">
            <div className="rpheader">Recently Played Tracks</div>
            <div className="rptracks">
            {recentlyPlayed.map((track, index)=>(
                
                <div key={index} className="rpwrap">
                    <img alt="albumimage" onClick={()=>{handlePlay(track.track)}} src={track.track.album.images[2].url}/>
                    <div onClick={()=>{handlePlay(track.track)}} className="rptext">
                    {track.track.name}
                    <br/>
                    <div onClick={()=>{handlePlay(track.track)}} className="grey"> {track.track.artists[0].name} </div>
                    </div>
                </div>
                
            ))}
            
            </div>
        </div>
    );
};

export default RecentlyPlayed;