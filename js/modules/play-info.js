import Playlist from './playlist.js'

const PlayInfo = (()=> {

    // -- Cache the DOM
    const songCount = document.querySelector('.song-count')

    // -- State
    const state = {
        songsLength: 0
    }

    const setState = obj => {
        state.songsLength = obj.songsLength
    }

    //  -- Event Listeners
    const eventListeners = () => {

    }

    // -- Initialize
    const init = () => {
        render();
        eventListeners();
    }

    // -- Render
    const render = () => {
        songCount.innerHTML = `${state.songsLength} songs`;
    }

    // -- public Methods
    return {
        init,
        setState
    }

})();

export default PlayInfo;