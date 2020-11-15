import {songsList} from '../data/songs.js';

const Playlist = (()=> {

    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url)
    let playlistItem;

    // -- Cache the DOM
    const playlistEl = document.querySelector('.playlist')

    // -- State
    const state = {
        isPlaying: false
    }


    return {
        init,
        state
    }

})();

export default Playlist;