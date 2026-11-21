
let audio = new Audio();
let currentSongs = [];
let currentIndex = 0;

export function setSongs(songs) {
  currentSongs = songs;
  currentIndex = 0;
}

export function playSong(index) {
  if (!currentSongs.length) return;

  currentIndex =
    (index + currentSongs.length) % currentSongs.length;

  const song = currentSongs[currentIndex];

  if (!song.audioUrl) {
    alert('아직 생성된 음악이 없어!');
    return;
  }

  audio.src = song.audioUrl;
  audio.play();
}

export function pauseSong() {
  audio.pause();
}

export function resumeSong() {
  audio.play();
}

export function nextSong() {
  playSong(currentIndex + 1);
}

export function previousSong() {
  playSong(currentIndex - 1);
}

export function getAudio() {
  return audio;
}

audio.addEventListener('ended', nextSong);
