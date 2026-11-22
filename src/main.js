
import './aiMusic.css';

import {
  getMoodSongs,
  getMoodName,
  getAllMoodSongs
} from './aiMusic.js';

import {
  setMood,
  playSong,
  pauseSong,
  resumeSong,
  stopSong
} from './player.js';

const allSongs = getAllMoodSongs();
let selectedMood = 'happy';
let selectedSong = null;

document.querySelector('#app').innerHTML = `
  <main class="app">
    <h1>Moodify</h1>
    <p class="subtitle">Your mood, your music.</p>

    <h2>오늘의 기분</h2>
    <section class="moods">
      <button data-mood="happy">😊 행복</button>
      <button data-mood="sad">😢 슬픔</button>
      <button data-mood="angry">😡 분노</button>
      <button data-mood="calm">🌿 차분함</button>
      <button data-mood="excited">🔥 신남</button>
      <button data-mood="tired">😴 피곤함</button>
    </section>

    <h2 id="moodTitle">행복 음악</h2>
    <p id="songCount">100곡</p>

    <section id="songList" class="song-list"></section>

    <section class="song-card">
      <h2 id="currentTitle">노래를 선택해 줘</h2>
      <p id="currentLyrics" class="lyrics">가사가 여기에 표시돼.</p>

      <div class="player">
        <button id="play">▶ 재생</button>
        <button id="pause">⏸ 일시정지</button>
        <button id="resume">▶ 이어듣기</button>
        <button id="stop">■ 정지</button>
      </div>
      <p id="status">Moodify</p>
    </section>

    <p>전체 음악 ${allSongs.length}곡</p>
  </main>
`;

function showSongs(mood) {
  selectedMood = mood;
  setMood(mood);

  const songs = getMoodSongs(mood);

  document.querySelector('#moodTitle').textContent =
    getMoodName(mood) + ' 음악';

  document.querySelector('#songCount').textContent =
    songs.length + '곡';

  document.querySelectorAll('[data-mood]').forEach(button => {
    button.classList.toggle('active', button.dataset.mood === mood);
  });

  document.querySelector('#songList').innerHTML =
    songs.map(song => `
      <article class="song-card">
        <h3>${song.title}</h3>
        <p class="lyrics">${song.lyrics}</p>
        <button data-song="${song.id}">이 노래 선택</button>
      </article>
    `).join('');

  document.querySelectorAll('[data-song]').forEach(button => {
    button.addEventListener('click', () => {
      selectedSong = songs.find(song => song.id === button.dataset.song);

      document.querySelector('#currentTitle').textContent =
        selectedSong.title;

      document.querySelector('#currentLyrics').textContent =
        selectedSong.lyrics;

      document.querySelector('#status').textContent =
        '선택한 노래: ' + selectedSong.title;
    });
  });
}

document.querySelectorAll('[data-mood]').forEach(button => {
  button.addEventListener('click', () => showSongs(button.dataset.mood));
});

document.querySelector('#play').addEventListener('click', async () => {
  if (!selectedSong) {
    document.querySelector('#status').textContent = '먼저 노래를 선택해 줘.';
    return;
  }

  try {
    await playSong();
    document.querySelector('#status').textContent = '재생 중';
  } catch (error) {
    document.querySelector('#status').textContent = error.message;
  }
});

document.querySelector('#pause').addEventListener('click', pauseSong);
document.querySelector('#resume').addEventListener('click', resumeSong);
document.querySelector('#stop').addEventListener('click', stopSong);

showSongs('happy');
