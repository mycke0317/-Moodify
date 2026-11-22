
let audio = new Audio();
let currentSongs = [];
let currentIndex = 0;

export function setSongs(songs) {
  currentSongs = songs;
  currentIndex = 0;
}

export async function playSong(index) {
  if (!currentSongs.length) return;

  currentIndex =
    (index + currentSongs.length) % currentSongs.length;

  const song = currentSongs[currentIndex];

  if (!song.audioUrl) {
    alert('이 노래의 MP3 음원이 아직 연결되지 않았어.');
    return;
  }

  try {
    audio.pause();
    audio.src = song.audioUrl;
    audio.load();
    await audio.play();
  } catch (error) {
    console.error(error);
    alert('음악 재생에 실패했어.');
  }
}

export function pauseSong() {
  audio.pause();
}

export function resumeSong() {
  if (audio.src) audio.play();
}

export function nextSong() {
  return playSong(currentIndex + 1);
}

export function previousSong() {
  return playSong(currentIndex - 1);
}

export function getAudio() {
  return audio;
}

audio.addEventListener('ended', nextSong);
