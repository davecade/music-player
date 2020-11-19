const TrackBar = (() => {

    // -- Catch the DOM
    const trackBarEl = document.querySelector('.trackbar-inner');
    const progressEl = document.querySelector('.progress')

    // -- State
    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillwidth: 0
    }
    const setState = obj => {
        state.currentTrackTime = obj.currentTime,
        state.fullTrackTime = obj.duration,
        state.fillwidth = getPercent(state.currentTrackTime, state.fullTrackTime)
        progressEl.value = getPercent(state.currentTrackTime, state.fullTrackTime)
        render()
    }

    const updateSong = (obj) => {
        // -- Converting the progress back from percentage back to equivalent minutes
        obj.currentTime = (progressEl.value * state.fullTrackTime) / 100;
        
      }


    // -- Initialize
    const init = () => {
        render();
    }

    // -- Methods
    const getPercent = (current, full) => {
        return (current/full)*100;
    }

    // -- Render
    const render = () => {
        trackBarEl.style.width = `${state.fillwidth}%`;
    }

    // -- Public Methods
    return {
        init,
        setState,
        updateSong
    }
})();

export default TrackBar;