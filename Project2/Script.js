"usestrict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("music_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playBtnEl = document.getElementById("play");
const nextBtnEl = document.getElementById("next");
const songs=[
    {
        path:"Images/2.mp3",
        displayName:"Main Tenu samjhanvan Ki",
        cover:"Images/img_2.jpg",
        artist:"Rahat Fateh Ali Khan",
    },
    {
        path:"Images/3.mp3",
        displayName:"Dekhte Dekhte",
        cover:"Images/img_3.jpg",
        artist:"Rahat Fateh Ali Khan", 
    },
    {
        path:"Images/4.mp3",
        displayName:"AKHIAN",
        cover:"Images/img_4.jpg",
        artist:"Rahat Fateh Ali Khan",  
    },
    {
        path:"Images/5.mp3",
        displayName:"Baddua OST",
        cover:"Images/img_5.jpg",
        artist:"Rahat Fateh Ali Khan", 
    },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================= Play Song True or False ================
function togglePlay() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }
//===============Play Music==================
function playMusic(){
    isPlaying = true;
    playBtnEl.classList.replace("fa-play", "fa-pause");
    playBtnEl.setAttribute("title", "pause");
    music.play();
}
//===============Pause Music=================
function pauseMusic(){
    isPlaying = false;
    playBtnEl.classList.replace("fa-pause", "fa-play");
    playBtnEl.setAttribute("title", "play");
    music.pause();
}
//===============Load Music==================
function loadMusic(songs){
    music.src = songs.path;
    musicTitleEl.textContent = songs.displayName;
    musicArtistEl.textContent = songs.artist;
    imgCoverEl.src = songs.cover;
    imgEl.src = songs.cover;
    music.load();
}
//==============Change Music ================
function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}
//==============Set Progress Bar=============
function setProgressBar(e){
    const width = playerProgressEl.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue / width) * music.duration;
}
//==============Update Progress Bar==========
function updateProgressBar(){
    const {duration, currentTime} = music;
    const ProgressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${ProgressPercent}%`;
    const formattime = (timeRanges) =>
        String(Math.floor(timeRanges)).padStart(2,"0");
    durationEl.textContent = `${formattime(duration / 60)} : ${formattime(duration % 60 ,)}`;
    currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(currentTime % 60 ,)}`;
}
//===============Btn Events=================
const btnEvents = () => {
    playBtnEl.addEventListener("click", togglePlay);
    nextBtnEl.addEventListener("click", ()=> changeMusic(1));
    prevBtnEl.addEventListener("click",() =>changeMusic(-1));
//===============Progressbar Events===========
    music.addEventListener("ended", ()=> changeMusic(1));
    music.addEventListener("timeupdate", updateProgressBar);
    playerProgressEl.addEventListener("click", setProgressBar);


    
};
//===============Btn Events===================
document.addEventListener("DOMContentLoaded",btnEvents);
//===============Calling Load Music
loadMusic(songs[musicIndex]);

