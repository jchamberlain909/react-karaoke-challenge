import React from 'react';
import Lyrics from './Lyrics';
import VoteBar from "./VoteBar";

const KaraokeDisplay = ({song, incrementValue, onFinish}) => {
  return (
    <div className="karaoke-display">
    
      {song!==null && <React.Fragment>
        <VoteBar upTitle="Like" downTitle="Dislike" 
          voteUp={()=>incrementValue(song.id,'like')} 
          voteDown={()=>incrementValue(song.id,'dislike')} />
      </React.Fragment>}
      <h2>{song===null ? "Choose a Song" : song.title}</h2>
      {song!==null && <Lyrics lyrics={song.lyrics} onFinish={onFinish}/>}
    </div>
  )
}

export default KaraokeDisplay;
