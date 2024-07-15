// Initialize a variable to track whether the audio is currently playing.
let isPlaying = false;

// Get a reference to the audio element in the HTML.
const audio = document.getElementById('audio-player');

// Get references to the rewind, play/pause, and forward buttons.
const rewindBtn = document.getElementById('rewind-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const forwardBtn = document.getElementById('forward-btn');

// Add an event listener to the rewind button to skip backward 5 seconds.
rewindBtn.addEventListener('click', () => {
    audio.currentTime -= 5;
});

// Add an event listener to the play/pause button to control audio playback.
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        // If audio is currently playing, pause it.
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
    } else {
        // If audio is not playing, start playing it.
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = 'Pause';
    }
});

// Add an event listener to the audio element for when it starts playing.
audio.addEventListener("play", function() {
    // Update the isPlaying variable and button text when audio starts playing.
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
});

// Add an event listener to the audio element for when it is paused.
audio.addEventListener("pause", function() {
    // Update the isPlaying variable and button text when audio is paused.
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
});

// Add an event listener to the forward button to skip forward 5 seconds.
forwardBtn.addEventListener('click', () => {
    audio.currentTime += 5;
});
