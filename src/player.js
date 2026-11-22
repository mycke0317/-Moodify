
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
    alert('아직 이 노래의 음원이 생성되지 않았어.');
    return;
  }

  audio.src = song.audioUrl;
  audio.load();

  audio.play().catch(error => {
    console.error(error);
    alert('음악 재생에 실패했어.');
  });
}

export function pauseSong() {
  audio.pause();
}

export function resumeSong() {
  if (audio.src) {
    audio.play();
  }
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
