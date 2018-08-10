import React, {Fragment} from 'react';

const Song = ({song, playSong, currentList}) => {
  return (
    <tr className="song">
      <td>{song.title}</td>
      <td>{song.singer}</td>
      {(currentList==="songs") && <Fragment>
      <td>{song.likes}</td>
      <td>{song.dislikes}</td>
      <td>{song.plays}</td>
      <td><button onClick={()=>playSong(song)}>Play</button></td>
      </Fragment>}
    </tr>
  )
}

export default Song;
