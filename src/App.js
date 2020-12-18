import {useState, useRef} from 'react';
//Adding Components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library'
import Nav from './Components/Nav';
//Import Data
import data from './data';

//Adding styles
import './Styles/App.scss'

function App() {
  //Ref
  const audioRef = useRef(null);
  
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className= {`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus} />
      <Song currentSong = {currentSong} />
      <Player isPlaying = {isPlaying} setIsPlaying = {setIsPlaying} currentSong = {currentSong} setCurrentSong = {setCurrentSong} setSongs = {setSongs} audioRef = {audioRef} songs = {songs}/>
      <Library songs = {songs} setCurrentSong = {setCurrentSong} audioRef = {audioRef} isPlaying ={isPlaying} setSongs = {setSongs} libraryStatus = {libraryStatus}/>
    </div>
  );
}

export default App;
