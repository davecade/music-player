import {songsList} from '../data/songs.js';

const Playlist = (() => {
    // -- Cache the DOM
    const playlistEl = document.querySelector(".playlist")

    // -- Set State
    const state = {
        isPlaying: false
    }

    const setState = obj => {
        state.isPlaying = obj.isPlaying
    }

    // -- Initialize
    const init = () => {
        render();
    }

    //-- Render the DOM
    const render = () => {
        let markup = '';
    }

    // -- Public Methods
    return {
        init,
        setState
    }
})();

export default Playlist;