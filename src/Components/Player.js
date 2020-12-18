import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying, audioRef}) => {

    
    //Event Handlers
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);   
        }
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //Calculate percentage
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)

        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage});
    }

    const getTime = (time) => {
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        );
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipTrackHandler = async(direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex+1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex+1) % songs.length]);
        }
        if(direction === 'skip-back') {
            if(((currentIndex-1) % songs.length) === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            } 
            await setCurrentSong(songs[(currentIndex-1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex-1) % songs.length]);                           
            
        }
        if(isPlaying) audioRef.current.play();
    }

    const songEndHandler = async() => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
            await setCurrentSong(songs[(currentIndex+1) % songs.length]);
            if(isPlaying) audioRef.current.play();
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
                return {
                    ...song, 
                    active:true,
                }
            }
            else {
                return {
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSongs);
    }

    //State

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    })

    //Add Styles

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    }

    return (
        <div className = "player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,}} className="track">
                    <input value={songInfo.currentTime} type="range" max={songInfo.duration || 0} min={0} onChange={dragHandler}/>
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{ songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick = {() => skipTrackHandler('skip-back')} className = 'skip-back' icon = {faAngleLeft} size = '2x'/>
                <FontAwesomeIcon onClick = {playSongHandler} className = 'play' icon = {isPlaying ? faPause : faPlay} size = '2x' />
                <FontAwesomeIcon onClick = {() => skipTrackHandler('skip-forward')} className = 'skip-forward' icon = {faAngleRight} size = '2x' />
            </div>
            <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} onEnded={songEndHandler} ></audio>
        </div>
    );
}

export default Player;