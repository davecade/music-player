import {songsList} from '../data/songs.js';

const Playlist = (() => {
    // -- Cache the DOM
    const playlistEl = document.querySelector(".playlist")

    // -- Set State
    const state = {
        currentlyPlayingIndex: 0,
        isPlaying: false
    }

    // -- Variables
    let songs = songsList;
    let currentSong = new Audio(songs[state.currentlyPlayingIndex].url)

    // -- Event Listeners
    const eventListeners = () => {

        // -- Single Click
        playlistEl.addEventListener('click', (event) => {
            if(event.target.matches(".fas")) {
                let songClicked = event.target.parentNode;
                let indexOfSongClicked = [...event.target.parentNode.parentNode.children].indexOf(songClicked);
                handlePlayPause(indexOfSongClicked)
            } 
        })

        // -- Double Click
        playlistEl.addEventListener('dblclick', (event) => {
            let songClicked
            let indexOfSongClicked
            if(event.target.matches(".playlist-item")) {
                songClicked = event.target;
                indexOfSongClicked = [...event.target.parentNode.children].indexOf(songClicked);
            } else if (event.target.matches(".song-info")) {
                songClicked = event.target.parentNode;
                indexOfSongClicked = [...event.target.parentNode.parentNode.children].indexOf(songClicked);
            } else if (event.target.matches(".song-title") || event.target.matches(".song-artist")) {
                songClicked = event.target.parentNode.parentNode.parentNode;
                indexOfSongClicked = [...event.target.parentNode.parentNode.parentNode.parentNode.children].indexOf(songClicked);
            } else if(event.target.matches(".song-duration")) {
                songClicked = event.target.parentNode.parentNode;
                indexOfSongClicked = [...event.target.parentNode.parentNode.parentNode.children].indexOf(songClicked);
            }

            if(indexOfSongClicked) {
                handlePlayPause(indexOfSongClicked)
            }

        })
    }

    // -- Methods
    const setState = obj => {
        state.isPlaying = obj.isPlaying
    }

    const handlePlayPause = (index) => {
        if(state.currentlyPlayingIndex === index) {
            togglePlayPause();
        } else {
            updateCurrentlyPlayingIndex(index)
            changeSongSrc();
            togglePlayPause();
        }
        render();
    }

    const togglePlayPause = () => {
        if(currentSong.paused) {
            currentSong.play()
            state.isPlaying = true;
        } else {
            currentSong.pause();
            state.isPlaying = false;
        }
    }

    const changeSongSrc = () => {
        currentSong.pause()
        currentSong = new Audio(songs[state.currentlyPlayingIndex].url)
    }

    const updateCurrentlyPlayingIndex = (newIndex) => {
        state.currentlyPlayingIndex = newIndex;
    }

    // -- Initialize
    const init = () => {
        render();
        eventListeners();
    }

    //-- Render the DOM
    const render = () => {
        let markup = '';

        const togglePlayPauseIcon = (index) => {
            if(index === state.currentlyPlayingIndex) {
                return currentSong.paused ? 'play' : 'pause';
            } else {
                return 'play'
            }
        }

        const toggleGreenHighlight = (index) => {
            if(state.currentlyPlayingIndex === index && state.isPlaying) {
                return "playing"
            } else {
                return ''
            }
        }

        songs.forEach((obj, index) => {
            markup += `
                <li class="playlist-item ${toggleGreenHighlight(index)}">
                    <i class="fas fa-${togglePlayPauseIcon(index)}"></i>
                    <div class="song-info">
                        <div>
                            <p class="song-title">${obj.title}</p>
                            <p class="song-artist">${obj.artist}</p>
                        </div>
                        <p class="song-duration">${obj.time}</p>
                    </div>
                </li>
            `
        })

        playlistEl.innerHTML = markup;
    }

    // -- Public Methods
    return {
        init,
        setState
    }
})();

export default Playlist;