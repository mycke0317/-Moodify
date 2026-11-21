
import { music } from './music.js'
import {
  setPlaylist,
  playSong
} from './player.js'

export function recommendMusic(mood, container) {
  const songs = music[mood] || []

  setPlaylist(songs)

  container.innerHTML = `
    <h3>${mood} 기분 추천 음악</h3>
    ${songs.map((song, index) => `
      <button class="song" data-index="${index}">
        🎵 ${song.title} - ${song.artist}
      </button>
    `).join('')}
  `

  container.querySelectorAll('.song').forEach(button => {
    button.addEventListener('click', () => {
      playSong(Number(button.dataset.index))
    })
  })
}
