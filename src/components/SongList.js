import React, {Fragment} from 'react';
import Song from "./Song";

const SongList = ({songs, playSong, currentList}) => {
  return (
    <table className="song-list">
      <tbody>
        <tr>
          <th>Title</th>
          <th>Singer</th>
          {(currentList==="songs") && <Fragment>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Plays</th>
          <th>▶</th>
          </Fragment>}
        </tr>

        {songs.map(song=><Song key={song.id} song={song} playSong={playSong} currentList={currentList}/>)}
        
      </tbody>
    </table>
  )
}

export default SongList;
