
const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs}) => {

    const songSelectHandler = async() =>{
        const selectedSong = songs.filter((state) => state.id === id);
        await setCurrentSong(selectedSong[0]);
        //Add active state
        const newSongs = songs.map((song) => {
            if(song.id === id) {
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
        //check if the song is Playing
        if(isPlaying) audioRef.current.play();
    }

    return (
        <div className={`library-song ${song.active ? 'selected' : ""}` } onClick = {songSelectHandler} >
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3> {song.name} </h3>
                <h4> {song.artist} </h4>
            </div>
        </div>
    )
}

export default LibrarySong;