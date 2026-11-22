
import './style.css';
import './aiMusic.css';
import { getMoodSongs } from './aiMusic.js';
import {
  playSong,
  pauseSong,
  resumeSong,
  nextSong,
  previousSong
} from './player.js';

const moods = [
  { id: 'happy', name: '😊 행복' },
  { id: 'sad', name: '😢 슬픔' },
  { id: 'angry', name: '🔥 화남' },
  { id: 'calm', name: '🌿 편안함' },
  { id: 'excited', name: '💗 설렘' },
  { id: 'tired', name: '😴 피곤함' }
];

let currentSongs = [];
let currentIndex = 0;

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

    <section class="music-player">
      <h2 id="nowPlaying">재생할 노래를 선택해 줘</h2>
      <div class="player-controls">
        <button id="previous">⏮</button>
        <button id="play">▶</button>
        <button id="pause">⏸</button>
        <button id="next">⏭</button>
      </div>
      <p id="playerStatus">Moodify Player</p>
    </section>
  </main>
`;

const songsContainer = document.querySelector('#songs');
const nowPlaying = document.querySelector('#nowPlaying');
const playerStatus = document.querySelector('#playerStatus');

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mood').forEach(item =>
      item.classList.remove('active')
    );

    button.classList.add('active');

    currentSongs = getMoodSongs(button.dataset.mood);
    currentIndex = 0;

    songsContainer.innerHTML = `
      <h2>🎤 추천 노래</h2>
      ${currentSongs.map((song, index) => `
        <button class="ai-song" data-index="${index}">
          🎵 ${song.title}
          <p>${song.lyrics}</p>
        </button>
      `).join('')}
    `;

    songsContainer.querySelectorAll('.ai-song').forEach(songButton => {
      songButton.addEventListener('click', async () => {
        currentIndex = Number(songButton.dataset.index);
        await playSelectedSong();
      });
    });

    playerStatus.textContent = `${currentSongs.length}곡 준비됨`;
  });
});

async function playSelectedSong() {
  const song = currentSongs[currentIndex];
  if (!song) return;

  nowPlaying.textContent = song.title;
  await playSong(currentIndex);
}

document.querySelector('#play').addEventListener('click', async () => {
  if (!currentSongs.length) {
    alert('먼저 기분을 선택해 줘!');
    return;
  }
  await playSelectedSong();
});

document.querySelector('#pause').addEventListener('click', () => {
  pauseSong();
});

document.querySelector('#next').addEventListener('click', async () => {
  if (!currentSongs.length) return;
  currentIndex = (currentIndex + 1) % currentSongs.length;
  await playSelectedSong();
});

document.querySelector('#previous').addEventListener('click', async () => {
  if (!currentSongs.length) return;
  currentIndex =
    (currentIndex - 1 + currentSongs.length) % currentSongs.length;
  await playSelectedSong();
});
