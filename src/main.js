
import './aiMusic.css';
import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong
} from './player.js';

document.querySelector('#app').innerHTML = `
  <main class="app">
    <h1>Moodify</h1>
    <p>나의 기분에 맞는 음악</p>

    <div class="moods">
      <button data-mood="happy">😊 행복</button>
      <button data-mood="sad">😢 슬픔</button>
      <button data-mood="angry">😡 화남</button>
      <button data-mood="calm">🌿 차분함</button>
      <button data-mood="excited">🔥 신남</button>
      <button data-mood="tired">😴 피곤함</button>
    </div>

    <h2 id="selectedMood">기분을 선택해 줘</h2>

    <div class="player">
      <button id="play">▶ 재생</button>
      <button id="pause">⏸ 일시정지</button>
      <button id="resume">▶ 이어듣기</button>
      <button id="stop">■ 정지</button>
    </div>

    <p id="status">기분을 선택하고 재생을 눌러 봐.</p>
  </main>
`;

let selected = 'happy';

document.querySelectorAll('[data-mood]').forEach(button => {
  button.addEventListener('click', () => {
    selected = button.dataset.mood;
    document.querySelector('#selectedMood').textContent =
      button.textContent + ' 음악';
  });
});

document.querySelector('#play').addEventListener('click', async () => {
  try {
    await playSong();
    document.querySelector('#status').textContent =
      '음악을 재생하고 있어!';
  } catch (error) {
    document.querySelector('#status').textContent =
      '재생 오류: ' + error.message;
  }
});

document.querySelector('#pause').addEventListener('click', pauseSong);
document.querySelector('#resume').addEventListener('click', resumeSong);
document.querySelector('#stop').addEventListener('click', stopSong);
