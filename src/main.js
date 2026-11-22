
import './style.css';
import './aiMusic.css';
import { getMoodSongs } from './aiMusic.js';
import { createMusicPrompt } from './musicGenerator.js';

const moods = [
  ['happy', '😊 행복'],
  ['sad', '😢 슬픔'],
  ['angry', '🔥 화남'],
  ['calm', '🌿 편안함'],
  ['excited', '💗 설렘'],
  ['tired', '😴 피곤함']
];

document.querySelector('#app').innerHTML = `
  <main class="app">
    <header class="header">
      <div class="logo">🎧 Moodify</div>
      <p>YOUR MOOD, YOUR MUSIC</p>
    </header>

    <h1>나만의 AI 음악 만들기</h1>
    <p>기분을 선택하고 나만의 노래를 만들어 봐!</p>

    <section class="moods">
      ${moods.map(([id, name]) => `
        <button class="mood" data-mood="${id}">${name}</button>
      `).join('')}
    </section>

    <section class="music-creator">
      <h2>🎤 나만의 노래</h2>
      <label for="lyrics">가사</label>
      <textarea id="lyrics" placeholder="노래 가사를 입력하거나 추천 가사를 사용해 봐."></textarea>

      <button id="suggestLyrics">✨ 기분에 맞는 가사 가져오기</button>
      <button id="createMusic">🎵 AI 음악 만들기</button>

      <p id="creationStatus">먼저 기분을 선택해 줘!</p>
      <pre id="musicPrompt"></pre>
    </section>
  </main>
`;

let selectedMood = 'happy';

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    selectedMood = button.dataset.mood;

    document.querySelectorAll('.mood').forEach(item =>
      item.classList.remove('active')
    );

    button.classList.add('active');
    document.querySelector('#creationStatus').textContent =
      `선택한 기분: ${selectedMood}`;
  });
});

document.querySelector('#suggestLyrics').addEventListener('click', () => {
  const songs = getMoodSongs(selectedMood);

  document.querySelector('#lyrics').value =
    songs[0]?.lyrics || '';
});

document.querySelector('#createMusic').addEventListener('click', () => {
  const lyrics = document.querySelector('#lyrics').value.trim();
  const status = document.querySelector('#creationStatus');
  const promptBox = document.querySelector('#musicPrompt');

  if (!lyrics) {
    status.textContent = '먼저 가사를 입력해 줘!';
    return;
  }

  const prompt = createMusicPrompt(selectedMood, lyrics);

  promptBox.textContent = JSON.stringify(prompt, null, 2);

  status.textContent =
    '음악 생성 요청 내용이 준비됐어. 실제 음원 생성 서비스 연결이 필요해.';
});
