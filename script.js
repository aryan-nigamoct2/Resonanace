let playlist = [];
let currentIndex = 0;
let current;
let playBtn = document.getElementById("play-btn");

function songMethods(song) {
    song.addEventListener("play", () => {
        playBtn.src = "icons/pause.svg";
    })
    song.addEventListener("pause", () => {
        playBtn.src = "icons/play.svg";
    })
    song.addEventListener("timeupdate", () => {
        document.getElementById("progress-bar").value = (song.currentTime / song.duration) * 100;
    })
    document.getElementById("progress-bar").addEventListener("change", e => {
        song.currentTime = e.target.value * song.duration / 100;
    })
}

function changeTrack(index){
    if(index>=0 && index<playlist.length){
        current.pause();
        current.currentTime = 0;
        currentIndex = index;
        current = playlist[currentIndex];
        current.play();
        songMethods(current);
    }
}

function addSongToUI(audio, songName){
    const li = document.createElement("li");
    li.textContent = songName;
    li.className = "music-li";
    document.getElementById("music-list").appendChild(li);

    li.addEventListener("click", ()=>{
        changeTrack(playlist.indexOf(audio));
    })
}

// upload file feature
const uploadFiles = document.getElementById("upload-folder");

document.getElementById("upload-btn").addEventListener("click", ()=>{
    uploadFiles.click();
})

uploadFiles.addEventListener("change", ()=>{
    const files = Array.from(uploadFiles.files);
    const audioFiles = files.filter(file=> file.type.startsWith("audio/"));
    audioFiles.forEach((audio)=>{
        const audioUrl = URL.createObjectURL(audio);
        const audioObj = new Audio(audioUrl)
        playlist.push(audioObj);
        const songName = audio.name.replace(/\.[^/.]+$/, "");
        addSongToUI(audioObj, songName);
    })
    current = playlist[0];
    currentIndex = 0;
    document.getElementById("upload-btn").style.display = "none";
})

// event listeners for next, pause and previous buttons
document.getElementById("previous-btn").addEventListener("click", ()=>{
    changeTrack(currentIndex - 1);
})

document.getElementById("play-btn").addEventListener("click", ()=>{
    if(current.currentTime == 0)
        changeTrack(currentIndex);
    else if(current.paused)
        current.play();
    else
        current.pause();
})

document.getElementById("next-btn").addEventListener("click", ()=>{
    changeTrack(currentIndex + 1);
})