
import {
  setPlaylist,
  playSong
} from './player.js'

export async function recommendMusic(mood, container) {
  container.innerHTML = '<p>음악을 찾는 중...</p>'

  try {
    const response = await fetch('/music/playlist.json')

    if (!response.ok) {
      throw new Error('Playlist not found')
    }

    const data = await response.json()
    const songs = data.songs.filter(song => song.mood === mood)

    setPlaylist(songs)

    if (!songs.length) {
      container.innerHTML = '<p>아직 추천 음악이 없어!</p>'
      return
    }

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
  } catch (error) {
    container.innerHTML = '<p>음악 목록을 불러오지 못했어.</p>'
  }
}
