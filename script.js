console.log("welcome to spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Raataeen Lambiyaan", filePath:"songs/1.mp3", coverPath:"covers/cover1.jpeg"},
    {songName:"Meri duniya", filePath:"songs/2.mp3", coverPath:"covers/cover2.jpeg"},
    {songName:"Apna har din aise", filePath:"songs/3.mp3", coverPath:"covers/cover3.jpeg"},
    {songName:"Shirt da button", filePath:"songs/4.mp3", coverPath:"covers/cover1.jpeg"},
    {songName:"Baari", filePath:"songs/5.mp3", coverPath:"covers/cover1.jpeg"},
    {songName:"Mehabooba", filePath:"songs/6.mp3", coverPath:"covers/cover1.jpeg"},
    {songName:"Soniyee", filePath:"songs/7.mp3", coverPath:"covers/cover1.jpeg"}
    // {songName:"Raataeen Lambiyaan", filePath:"songs/song1.mp3", coverPath:"covers/cover1.jpeg"},
    // {songName:"Raataeen Lambiyaan", filePath:"songs/song1.mp3", coverPath:"covers/cover1.jpeg"},
    // {songName:"Raataeen Lambiyaan", filePath:"songs/song1.mp3", coverPath:"covers/cover1.jpeg"}
]

//cover image and songs name setting
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}) 

//handle progressbar time update

audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdated');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    //console.log(progress);
    myprogressBar.value = progress;
})

myprogressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressBar.value*audioElement.duration/100;
})
//if one song is playing then all play button play me hone chahiye
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `../songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `../songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `../songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})