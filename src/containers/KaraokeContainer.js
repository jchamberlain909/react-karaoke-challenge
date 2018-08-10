import React, { Component } from 'react';

import KaraokeDisplay from '../components/KaraokeDisplay';

import SideBar from './SideBar';

class KaraokeContainer extends Component {
  
  state={
    currentSong:null,
    allSongs: [],
    songQueue:[]
  }

  addToQueue= (song) => {
    if (this.state.currentSong===null) {
      this.playSong(song)
    } else {
      // check to see if song is in queue or playing
      if ((this.state.currentSong.id!==song.id && !this.state.songQueue.includes(song))) {
        this.setState({
          songQueue:[...this.state.songQueue,song]
        })
      }
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users/1/songs')
    .then(res=>res.json())
    .then(songData=>{
      this.setState(
        {
          allSongs:songData
        })
    })
  }

  incrementValue = (song_id, value) =>{
    fetch(`http://localhost:3000/users/1/songs/${song_id}/${value}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res=>res.json())
    .then(song=>{
      let foundSongIndex = this.state.allSongs.findIndex(s=>song.id===s.id)
      let newSongs = [...this.state.allSongs]
      newSongs.splice(foundSongIndex,1,song)
      this.setState({allSongs:newSongs})
    })
  }
  

  playSong = (song)=>{
    this.incrementValue(song.id,'play')
    this.setState({currentSong:song})
  }

  // setSearchQuery = (e) =>{
  //   this.setState({searchQuery: e.target.value})
  // }

  // applySearchFilter = () => {
  //   return ((this.state.currentList==="songs")?this.state.allSongs:this.state.songQueue).filter(
  //       song=>song.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
  //     )
  // }

  onFinish = ()=>{
    let newQueue = [...this.state.songQueue]
    let newCurrentSong = newQueue.shift()
    this.setState({
      songQueue:newQueue,
      currentSong:newCurrentSong
    })
  }

  changeView = ()=>{
    (this.state.currentList==="songs")?this.setState({currentList:"queue"}) : this.setState({currentList:"songs"})
  }

  render() {
    return (
      <div className="karaoke-container">
        <SideBar allSongs={this.state.allSongs} songQueue={this.state.songQueue} addToQueue={this.addToQueue}/>
        <KaraokeDisplay song={this.state.currentSong} incrementValue={this.incrementValue} onFinish={this.onFinish}/>
      </div>
    );
  }
}

export default KaraokeContainer;
