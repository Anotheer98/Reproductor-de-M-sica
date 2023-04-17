/* Variables */

const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');

const tiempoActual = document.getElementById('tiempoActual');
const duracion = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

/* PlayList */

const song = [
    {
        name: 'ZAYN feat. Sia —​ Dusk Till Dawn',
        displayName: 'Dusk Till Dawn ZAYN & SIA',
        Artista: 'Zayn & Sia',
    },
    {
        name: 'Glee - Marry You',
        displayName: 'Marry You - Glee',
        Artista: 'Bruno Mars',
    },
    {
        name: 'Safura Drip Drop (Azerbaijan)',
        displayName: 'Drip Drop Dance - Safura Alizadeh',
        Artista: 'Safura Alizadeh',
    },
    {
        name: 'Sia Dusk Till Dawn',
        displayName: 'Sia - Dusk Till Dawn',
        Artista: 'Sia',
    },
    {
        name: 'Sia  Unstoppable (Lyrics)',
        displayName: 'Unstoppable - Sia',
        Artista: 'Sia',
    },
];

/* Bandera */
let isPlaying = false;

/* Función de play */
function playSong(){
    isPlaying = true;
    playBtn.setAttribute('name', 'pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

/* Función Pause */
function pauseSong(){
    isPlaying = false;
    playBtn.setAttribute('name', 'play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

/* Al hacer click en el botón Play, activa las funciones Play o Pause, dependiendo si está reproduciendo o no */
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

/* Leer canción */
function loadSong(song){
    titulo.textContent = song.displayName;
    artista.textContent = song.Artista; 
    music.src = `../Recursos/Canciones/${song.name}.mp3`;
    image.src = `../Recursos/Imágenes/${song.name}.jpg`;
}

/* Canción actual */
let songIndex = 0;

/* Anterior canción */
function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = song.length - 1;
    }

    loadSong(song[songIndex]);
    playSong();
}

/* Siguiente canción */

function nextSong(){
    songIndex++;

    if(songIndex > song.length - 1){
        songIndex = 0;
    }

    loadSong(song[songIndex]);
    playSong();
}

//al cargar las canciones, se leerá la primera canción.
loadSong(song[songIndex]);

//Actualizar la barra de progreso y el tiempo de la canción

function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100; //Actualiza barra de progreso
        progress.style.width = `${ progressPercent }%`; //Esta línea cambia la propiedad css de progress
        const durationMinutes = Math.floor(duration / 60); //Calcula la duración total en minutos
        let durationSeconds = Math.floor(duration % 60);

        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }

        if(durationSeconds){
            duracion.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }

        if(currentSeconds){
            tiempoActual.textContent = `${currentMinutes} : ${currentSeconds}`;
        }
    }
}

//Mostrar barra de progreso

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

