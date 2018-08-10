import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import Filter from '../components/Filter';
import SongList from '../components/SongList';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchQuery: "",
            currentList: "songs"
         }
    }

    setSearchQuery = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    applySearchFilter = () => {
        return ((this.state.currentList === "songs") ? this.props.allSongs : this.props.songQueue).filter(
            song => song.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        )
    }

    changeView = ()=>{
        (this.state.currentList==="songs")
            ?this.setState({currentList:"queue"}) : this.setState({currentList:"songs"})
    }

    render() { 
        return (
        <div className="sidebar">
            <NavBar showSongs={this.changeView} showQueue={this.changeView}/>
            <Filter onSearchChange={this.setSearchQuery} currentSearch={this.state.searchQuery}/>
            <SongList songs={this.applySearchFilter()} playSong={this.props.addToQueue} currentList={this.state.currentList} />     
        </div>);
    }
}
 
export default SideBar;