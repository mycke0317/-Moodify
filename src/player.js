
let audio = new Audio();
let currentSong = null;

export function setMood(mood) {
  stopSong();
}

export function setCurrentSong(song) {
  stopSong();
  currentSong = song;
}

export async function playSong(song = currentSong) {
  if (song) {
    currentSong = song;
  }

  if (!currentSong || !currentSong.audioUrl) {
    throw new Error('아직 이 노래의 실제 음원 파일이 연결되지 않았어.');
  }

  audio.pause();
  audio.src = currentSong.audioUrl;
  audio.currentTime = 0;

  await audio.play();
}

export function pauseSong() {
  audio.pause();
}

export async function resumeSong() {
  if (!audio.src) return;

  await audio.play();
}

export function stopSong() {
  audio.pause();
  audio.currentTime = 0;
}
