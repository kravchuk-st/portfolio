const video = document.querySelector('.player__video'),
      poster = document.querySelector('.poster'),
      control = document.querySelector('.player__controls'),
      play = document.querySelector('#play'),
      playBtn = document.querySelector('.video-btn'),
      playIcon = document.querySelector('.play-icon'),
      progress = document.querySelector('.progress'),
      time = document.querySelector('.controls-time'),
      allTime = document.querySelector('.controls-allTime'),
      mute = document.querySelector('#mute'),
      controlVol = document.querySelector('.volume'),
      controlMute = document.querySelector('.mute'),
      fullScreen = document.querySelector('.fullscreen-icon');



video.addEventListener('click', toogleVideoStatus);
video.addEventListener('timeupdate', updateProgress);
playBtn.addEventListener('click', toogleVideoStatus);
playIcon.addEventListener('click', toogleVideoStatus);

progress.addEventListener('input', setProgress);
progress.addEventListener('input', updateProgressCSS);
controlVol.addEventListener('input', updateVol);
controlMute.addEventListener('click', updateMute)
fullScreen.addEventListener('click', goFullScreen);


video.addEventListener('loadeddata', function() {
  let allMinutes = Math.floor(video.duration / 60);
    if (allMinutes < 10){
      allMinutes = '0' + allMinutes;
    }

  let allSeconds = Math.floor(video.duration % 60);
    if (allSeconds < 10){
      allSeconds = '0' + allSeconds;
    }

  allTime.innerHTML = `${allMinutes}:${allSeconds}`;
});

function toogleVideoStatus() {
  if (video.paused) {
    video.play();
    playBtn.style.display = "none";
    poster.style.display = "none";
    control.style.display = "flex";
    play.setAttribute("xlink:href", "./assets/svg/player/pause.svg#pause-btn");
  } else {
    video.pause();
    playBtn.style.display = "block";
    play.setAttribute("xlink:href", "./assets/svg/player/play.svg#play-btn");
  };
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10){
      minutes = '0' + minutes;
    }
  let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10){
      seconds = '0' + seconds;
    }
  time.innerHTML = `${minutes}:${seconds}`

  updateProgressCSS();
}

function setProgress() {
  video.currentTime = progress.value * video.duration / 100;
}

let previusVolume = null;

function updateMute() {
  if (previusVolume !== null) {
    video.volume = previusVolume;
    previusVolume = null;
    mute.setAttribute("xlink:href", "./assets/svg/player/volume.svg#volume-btn");
  } else {
    previusVolume = video.volume;
    video.volume = 0;
    mute.setAttribute("xlink:href", "./assets/svg/player/mute.svg#mute-btn");
  }
}

function updateVol(){
  var volume = this.value;
  video.volume = volume;
  controlVol.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volume * 100}%, #fff ${volume * 100}%, white 100%)`;
  if (video.volume != 0) {
    mute.setAttribute("xlink:href", "./assets/svg/player/volume.svg#volume-btn");
  } else {
    mute.setAttribute("xlink:href", "./assets/svg/player/mute.svg#mute-btn");
  }
}
  
function updateProgressCSS(){
  const prog = progress.value;
  progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${Math.ceil(prog * 10 + 1) / 10}%, #fff ${Math.ceil(prog * 10 + 1) / 10}%, white 100%)`;
}

function goFullScreen(){
  if(video.webkitSupportsFullscreen) video.webkitEnterFullScreen();
}
