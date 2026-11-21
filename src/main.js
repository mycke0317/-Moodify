
import './style.css';
import './aiMusic.css';
import { getMoodSongs } from './aiMusic.js';

const moods = [
  { id: 'happy', name: '😊 행복' },
  { id: 'sad', name: '😢 슬픔' },
  { id: 'angry', name: '🔥 화남' },
  { id: 'calm', name: '🌿 편안함' },
  { id: 'excited', name: '💗 설렘' },
  { id: 'tired', name: '😴 피곤함' }
];

document.querySelector('#app').innerHTML = `
  <main class="app">
    <header class="header">
      <div class="logo">🎧 Moodify</div>
      <p>YOUR MOOD, YOUR MUSIC</p>
    </header>

    <h1>오늘 기분은 어때?</h1>
    <section class="moods">
      ${moods.map(mood => `
        <button class="mood" data-mood="${mood.id}">
          ${mood.name}
        </button>
      `).join('')}
    </section>

    <section id="songs" class="ai-music">
      <h2>🎵 AI 추천 음악</h2>
      <p>기분을 선택해 줘!</p>
    </section>
  </main>
`;

const songsContainer = document.querySelector('#songs');

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', async () => {
    document.querySelectorAll('.mood').forEach(item =>
      item.classList.remove('active')
    );

    button.classList.add('active');

    const songs = await getMoodSongs(button.dataset.mood);

    songsContainer.innerHTML = `
      <h2>🎤 추천 노래</h2>
      ${songs.map(song => `
        <div class="ai-song">
          🎵 ${song.title}
          <p>${song.lyrics}</p>
        </div>
      `).join('')}
    `;
  });
});
