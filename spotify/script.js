console.log("welcome to spotify")
// initialise the variables
let songIndex=0;
let audioElement = new Audio('audio/1.mpeg');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

 let songs = [
     {name: "Chukkala Chunni",filepath: "audio/1.mpeg",coverpath:"images/1.jpeg"},
      {name: "Malhari",filepath: "audio/2.mpeg",coverpath:"images/2.jpeg"},
     {name: "Harima Harima",filepath: "audio/3.mpeg",coverpath:"images/3.jpeg"},
     {name: "O kalala kathala",filepath: "audio/4.mpeg",coverpath:"images/4.jpeg"},
     {name: "Choosale kallara",filepath: "audio/5.mpeg",coverpath:"images/5.jpeg"},
    {name: "Phir Aur Kya Chahiye",filepath: "audio/6.mpeg",coverpath:"images/6.jpeg"},
    {name: "O Mara Manishi",filepath: "audio/7.mpeg",coverpath:"images/7.jpeg"},
 ]
 songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].name;
 })
 masterPlay.addEventListener('click',()=>{
     if(audioElement.paused || audioElement.currentTime<=0){
         audioElement.play();
         masterPlay.classList.remove('fa-play-circle');
         masterPlay.classList.add('fa-pause-circle');
         gif.style.opacity=1;
     }
     else{
         audioElement.pause();
         masterPlay.classList.remove('fa-pause-circle');
         masterPlay.classList.add('fa-play-circle');
         gif.style.opacity=0;
     }
 })
 audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
 })
 myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value/100)*audioElement.duration;
 })
 const makeAllPlays = () => {
   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
       element.classList.remove('fa-pause-circle');
       element.classList.add('fa-play-circle');
   });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
   element.addEventListener('click', (e) => {
       let clickedIndex = parseInt(e.target.id);

       if (songIndex === clickedIndex && !audioElement.paused) {
           audioElement.pause();
           e.target.classList.remove('fa-pause-circle');
           e.target.classList.add('fa-play-circle');
           masterPlay.classList.remove('fa-pause-circle');
           masterPlay.classList.add('fa-play-circle');
           gif.style.opacity = 0;
       } else {
           makeAllPlays();
           songIndex = clickedIndex;
           e.target.classList.remove('fa-play-circle');
           e.target.classList.add('fa-pause-circle');
           audioElement.src = `audio/${songIndex + 1}.mpeg`;
           masterSongName.innerText = songs[songIndex].name;
           audioElement.currentTime = 0;
           audioElement.play();
           gif.style.opacity = 1;

           masterPlay.classList.remove('fa-play-circle');
           masterPlay.classList.add('fa-pause-circle');
       }
   });
});
masterPlay.addEventListener('click', () => {
   if (audioElement.paused) {
       audioElement.play();
       document.getElementById(songIndex)?.classList.replace('fa-play-circle', 'fa-pause-circle');
       masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
       gif.style.opacity = 1;
   } else {
       audioElement.pause();
       document.getElementById(songIndex)?.classList.replace('fa-pause-circle', 'fa-play-circle');
       masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
       gif.style.opacity = 0;
   }
});

document.getElementById('next').addEventListener('click', () => {
   if (songIndex >= 6) {
       songIndex = 0;
   } else {
       songIndex += 1;
   }

   audioElement.src = `audio/${songIndex + 1}.mpeg`;
   masterSongName.innerText = songs[songIndex].name;
   audioElement.currentTime = 0;
   audioElement.play();

   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');

   makeAllPlays();

   document.getElementById(songIndex).classList.remove('fa-play-circle');
   document.getElementById(songIndex).classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
   if (songIndex <= 0) {
       songIndex = 6;
   } else {
       songIndex -= 1;
   }

   audioElement.src = `audio/${songIndex + 1}.mpeg`;
   masterSongName.innerText = songs[songIndex].name;
   audioElement.currentTime = 0;
   audioElement.play();

   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');

   makeAllPlays();

   document.getElementById(songIndex).classList.remove('fa-play-circle');
   document.getElementById(songIndex).classList.add('fa-pause-circle');
});




