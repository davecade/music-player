import {songsList} from '../data/songs.js';
import PlayInfo from './play-info.js'
import TrackBar from './trackbar.js';

const Playlist = (() => {
    // -- Cache the DOM
    const playlistEl = document.querySelector(".playlist")
    const progressEl = document.querySelector('.progress')
    const volumeEl = document.querySelector('.volume')

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
                let indexOfSongClicked = findIndex(event);
                handlePlayPause(indexOfSongClicked)
            } 
        })

        // -- Double Click
        playlistEl.addEventListener('dblclick', (event) => {
            let indexOfSongClicked = findIndex(event);
            if(indexOfSongClicked >= 0) {
                handlePlayPause(indexOfSongClicked)
            }
        })

        // -- Track current time
        currentSong.addEventListener('timeupdate', () => {
            TrackBar.setState(currentSong);
            updateTimeProgress();
        })

        progressEl.addEventListener('change', () => {
            TrackBar.updateSong(currentSong);
        })

        volumeEl.addEventListener('change', ()=> {
            updateVolume();
        })

    }

    // -- Methods
    const setState = obj => {
        state.isPlaying = obj.isPlaying
    }

    const findIndex = (event) => {

        let songClicked
        let indexOfSongClicked

        if(event.target.matches(".playlist-item")) {
            songClicked = event.target;
            indexOfSongClicked = [...event.target.parentNode.children].indexOf(songClicked);
        } else if (event.target.matches(".song-info") || event.target.matches(".fas")) {
            songClicked = event.target.parentNode;
            indexOfSongClicked = [...event.target.parentNode.parentNode.children].indexOf(songClicked);
        } else if (event.target.matches(".song-title") || event.target.matches(".song-artist")) {
            songClicked = event.target.parentNode.parentNode.parentNode;
            indexOfSongClicked = [...event.target.parentNode.parentNode.parentNode.parentNode.children].indexOf(songClicked);
        } else if(event.target.matches(".song-duration")) {
            songClicked = event.target.parentNode.parentNode;
            indexOfSongClicked = [...event.target.parentNode.parentNode.parentNode.children].indexOf(songClicked);
        }

        return indexOfSongClicked
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

    const updateVolume = () => {
        currentSong.volume = volumeEl.value / 100;
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
        // --currentSong.pause()
        // -- currentSong = new Audio(songs[state.currentlyPlayingIndex].url)
        currentSong.src = songs[state.currentlyPlayingIndex].url
    }

    const updateCurrentlyPlayingIndex = (newIndex) => {
        state.currentlyPlayingIndex = newIndex;
    }

    const flip = () => {
        togglePlayPause();
        render();
    }

    // -- Initialize
    const init = () => {
        render();
        eventListeners();
    }

    // -- displays current songs time progress
    const updateTimeProgress = () => {
        const progressTimeEl = document.querySelector(`.timeID${state.currentlyPlayingIndex}`)

        // -- get minutes
        let mins = Math.floor(currentSong.currentTime / 60);
        if (mins < 10) {
            mins = `0${String(mins)}`
        }
    
        // -- get seconds
        let secs = Math.floor(currentSong.currentTime % 60);
        if (secs < 10) {
        secs = `0${String(secs)}`
        }
        
        progressTimeEl.innerHTML = `${mins}:${secs}`
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
                        <p class="song-duration timeID${index}">${obj.time}</p>
                    </div>
                </li>
            `
        })

        playlistEl.innerHTML = markup;

        PlayInfo.render();
        PlayInfo.setState({
            songsLength: songs.length
        })
        
    }

    // -- Public Methods
    return {
        init,
        setState,
        state,
        flip
    }
})();

export default Playlist;