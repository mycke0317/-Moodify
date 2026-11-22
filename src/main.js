
import './style.css';
import './aiMusic.css';
import { getMoodSongs } from './aiMusic.js';
import {
  playSong,
  pauseSong,
  resumeSong,
  nextSong,
  previousSong,
  getAudio
} from './player.js';

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

    <section class="player">
      <p id="nowPlaying">🎧 재생할 노래를 선택해 줘</p>
      <audio id="audioPlayer" controls></audio>
      <div class="controls">
        <button id="previous">이전 곡</button>
        <button id="pause">일시정지</button>
        <button id="play">재생</button>
        <button id="next">다음 곡</button>
      </div>
    </section>
  </main>
`;

const songsContainer = document.querySelector('#songs');
const audioPlayer = document.querySelector('#audioPlayer');
const nowPlaying = document.querySelector('#nowPlaying');

const audio = getAudio();
audioPlayer.src = audio.src;

audio.addEventListener('play', () => {
  audioPlayer.src = audio.src;
});

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mood').forEach(item =>
      item.classList.remove('active')
    );

    button.classList.add('active');

    const songs = getMoodSongs(button.dataset.mood);

    songsContainer.innerHTML = `
      <h2>🎤 추천 노래</h2>
      ${songs.map((song, index) => `
        <button class="ai-song" data-index="${index}">
          🎵 ${song.title}
        </button>
      `).join('')}
    `;

    songsContainer.querySelectorAll('.ai-song').forEach(songButton => {
      songButton.addEventListener('click', () => {
        const index = Number(songButton.dataset.index);
        nowPlaying.textContent = '🎵 ' + songs[index].title;
        playSong(index);
      });
    });
  });
});

document.querySelector('#previous').onclick = previousSong;
document.querySelector('#next').onclick = nextSong;
document.querySelector('#pause').onclick = pauseSong;
document.querySelector('#play').onclick = resumeSong;
