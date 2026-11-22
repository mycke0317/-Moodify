
import './aiMusic.css';
import {
  setMood,
  playSong,
  pauseSong,
  resumeSong,
  stopSong
} from './player.js';

import {
  getMoodSongs,
  getMoodName
} from './aiMusic.js';

document.querySelector('#app').innerHTML = `
  <main class="app">
    <h1>Moodify</h1>
    <p>당신의 기분에 맞는 음악</p>

    <section class="moods">
      <button data-mood="happy">😊 행복</button>
      <button data-mood="sad">😢 슬픔</button>
      <button data-mood="angry">😡 화남</button>
      <button data-mood="calm">🌿 차분함</button>
      <button data-mood="excited">🔥 신남</button>
      <button data-mood="tired">😴 피곤함</button>
    </section>

    <h2 id="selectedMood">기분을 선택해 줘</h2>
    <h3 id="songTitle">아직 선택한 음악이 없어</h3>
    <p id="lyrics">기분을 선택하면 가사가 표시돼.</p>

    <section class="player">
      <button id="play">▶ 재생</button>
      <button id="pause">⏸ 일시정지</button>
      <button id="resume">▶ 이어듣기</button>
      <button id="stop">■ 정지</button>
    </section>

    <p id="status">Moodify에 오신 걸 환영해!</p>
  </main>
`;

let selectedMood = 'happy';
let songs = [];

function selectMood(mood) {
  selectedMood = mood;
  setMood(mood);

  songs = getMoodSongs(mood);

  const song = songs[0];

  document.querySelector('#selectedMood').textContent =
    getMoodName(mood) + ' 음악';

  document.querySelector('#songTitle').textContent =
    song.title;

  document.querySelector('#lyrics').textContent =
    song.lyrics;

  document.querySelector('#status').textContent =
    '기분에 맞는 멜로디를 준비했어!';
}

document.querySelectorAll('[data-mood]').forEach(button => {
  button.addEventListener('click', () => {
    selectMood(button.dataset.mood);
  });
});

document.querySelector('#play').addEventListener('click', async () => {
  try {
    await playSong();
    document.querySelector('#status').textContent = '재생 중';
  } catch (error) {
    document.querySelector('#status').textContent =
      '재생 오류: ' + error.message;
  }
});

document.querySelector('#pause').addEventListener('click', pauseSong);
document.querySelector('#resume').addEventListener('click', resumeSong);

document.querySelector('#stop').addEventListener('click', () => {
  stopSong();
  document.querySelector('#status').textContent = '정지됨';
});

selectMood('happy');
