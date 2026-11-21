
import './style.css'
import { recommendMusic } from './recommend.js'
import {
  pauseSong,
  nextSong,
  previousSong,
  getAudio
} from './player.js'

const moods = ['행복', '슬픔', '화남', '편안함', '설렘', '피곤함']

document.querySelector('#app').innerHTML = `
  <main class="app">
    <header class="header">
      <div class="logo">🎧 Moodify</div>
      <p>YOUR MOOD, YOUR MUSIC</p>
    </header>

    <section class="welcome">
      <h1>오늘 기분은 어때?</h1>
      <p>기분을 선택하면 어울리는 음악을 추천해 줄게.</p>
    </section>

    <section class="moods">
      ${moods.map(mood => `
        <button class="mood" data-mood="${mood}">
          ${mood}
        </button>
      `).join('')}
    </section>

    <section class="recommend">
      <h2>🎵 추천 음악</h2>
      <div id="songs">
        <p>기분을 선택해 줘!</p>
      </div>
    </section>

    <section class="player">
      <p>🎧 Moodify Music Player</p>
      <audio id="audio" controls></audio>
      <div class="controls">
        <button id="prev">⏮ 이전 곡</button>
        <button id="pause">⏸ 일시정지</button>
        <button id="next">다음 곡 ⏭</button>
      </div>
    </section>

    <footer>Made with 💜 Moodify</footer>
  </main>
`

const songsContainer = document.querySelector('#songs')
const audio = getAudio()

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mood').forEach(item =>
      item.classList.remove('active')
    )

    button.classList.add('active')
    recommendMusic(button.dataset.mood, songsContainer)
  })
})

document.querySelector('#pause').addEventListener('click', pauseSong)
document.querySelector('#next').addEventListener('click', nextSong)
document.querySelector('#prev').addEventListener('click', previousSong)

document.querySelector('#audio').replaceWith(audio)
audio.controls = true
