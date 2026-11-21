
import './style.css'

const moods = ['행복', '슬픔', '화남', '편안함', '설렘', '피곤함']

document.querySelector('#app').innerHTML = `
  <main class="app">
    <header class="header">
      <div class="logo">🎧 Moodify</div>
      <p>YOUR MOOD, YOUR MUSIC</p>
    </header>

    <h1>오늘 기분은 어때?</h1>
    <p>기분을 선택하면 어울리는 음악을 추천해 줄게.</p>

    <section class="moods">
      ${moods.map(mood =>
        `<button class="mood" data-mood="${mood}">${mood}</button>`
      ).join('')}
    </section>

    <section class="recommend">
      <h2>🎵 추천 음악</h2>
      <p id="message">기분을 선택해 줘!</p>
      <div id="songs"></div>
    </section>

    <section class="player">
      <p id="nowPlaying">노래를 선택해 줘</p>
      <audio id="audio" controls></audio>
    </section>
  </main>
`

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mood').forEach(item =>
      item.classList.remove('active')
    )
    button.classList.add('active')

    document.querySelector('#message').textContent =
      `${button.dataset.mood} 기분을 선택했어! 어울리는 음악을 준비할게.`
  })
})
