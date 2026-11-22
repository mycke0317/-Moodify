
let audio = new Audio();

let currentSongs = [];
let currentIndex = 0;

export function setSongs(songs) {
  audio.pause();
  audio.currentTime = 0;
  currentSongs = songs;
  currentIndex = 0;
}

export async function playSong(index) {
  if (!currentSongs.length) return;

  currentIndex = (index + currentSongs.length) % currentSongs.length;

  const song = currentSongs[currentIndex];

  if (!song.audioUrl) {
    alert('아직 이 곡의 AI 음원이 생성되지 않았어.');
    return;
  }

  try {
    audio.pause();
    audio.src = song.audioUrl;
    audio.load();
    await audio.play();
  } catch (error) {
    console.error('재생 오류:', error);
    alert('음악 재생에 실패했어.');
  }
}

export function pauseSong() {
  audio.pause();
}

export async function resumeSong() {
  if (!audio.src) {
    await playSong(currentIndex);
    return;
  }

  try {
    await audio.play();
  } catch (error) {
    console.error(error);
    alert('음악을 다시 재생하지 못했어.');
  }
}

export function nextSong() {
  return playSong(currentIndex + 1);
}

export function previousSong() {
  return playSong(currentIndex - 1);
}

export function getCurrentSong() {
  return currentSongs[currentIndex] || null;
}

export function getAudio() {
  return audio;
}

audio.addEventListener('ended', nextSong);
