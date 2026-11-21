
let audio = new Audio()
let playlist = []
let currentIndex = 0

export function setPlaylist(songs) {
  playlist = songs
  currentIndex = 0
}

export function playSong(index) {
  if (!playlist.length) return

  currentIndex = (index + playlist.length) % playlist.length
  const song = playlist[currentIndex]

  if (!song.file) {
    alert('아직 음악 파일이 등록되지 않았어!')
    return
  }

  audio.src = song.file
  audio.play().catch(() => {
    alert('음악을 재생할 수 없어. 음원 파일을 확인해 줘.')
  })
}

export function pauseSong() {
  audio.pause()
}

export function nextSong() {
  playSong(currentIndex + 1)
}

export function previousSong() {
  playSong(currentIndex - 1)
}

export function getAudio() {
  return audio
}

audio.addEventListener('ended', nextSong)
