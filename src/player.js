
let audio = new Audio();
let currentSongs = [];
let currentIndex = 0;

export function setSongs(songs) {
  audio.pause();
  currentSongs = songs;
  currentIndex = 0;
}

export async function playSong(index = currentIndex) {
  if (!currentSongs.length) {
    alert("재생할 음악이 없어!");
    return;
  }

  currentIndex = (index + currentSongs.length) % currentSongs.length;
  const song = currentSongs[currentIndex];

  if (!song.audioUrl) {
    alert("이 곡에는 아직 음악 파일이 없어!");
    return;
  }

  audio.src = song.audioUrl;
  audio.load();

  try {
    await audio.play();
  } catch (error) {
    alert("재생에 실패했어.");
    console.error(error);
  }
}

export function pauseSong() {
  audio.pause();
}

export function resumeSong() {
  return audio.play();
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
