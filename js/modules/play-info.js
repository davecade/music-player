import Playlist from './playlist.js'

const PlayInfo = (()=> {

    // -- Cache the DOM
    const songCount = document.querySelector('.song-count')
    const mainButtonEl = document.querySelector('.main-button')

    

    // -- State
    const state = {
        songsLength: 0
    }
    const setState = obj => {
        state.songsLength = obj.songsLength
    }

    //  -- Event Listeners
    const eventListeners = () => {
        mainButtonEl.addEventListener('click', ()=> {
            Playlist.flip()
            render();
        })


    }

    const togglePlayPause = () => {
        return Playlist.state.isPlaying ? "PAUSE" : "PLAY"
    }

    // -- Initialize
    const init = () => {
        render();
        eventListeners();
    }

    // -- Render
    const render = () => {
        songCount.innerHTML = `${state.songsLength} songs`;
        mainButtonEl.innerHTML = togglePlayPause();
    }

    // -- public Methods
    return {
        init,
        setState,
        render
    }

})();

export default PlayInfo;