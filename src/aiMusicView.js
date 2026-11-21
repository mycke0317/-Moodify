
import { getMoodSongs } from './aiMusic.js';

export async function showMoodSongs(mood, container) {
  const songs = await getMoodSongs(mood);

  if (!songs.length) {
    container.innerHTML = '<p>추천 노래가 없어.</p>';
    return;
  }

  container.innerHTML = `
    <section class="ai-music">
      <h2>🎤 ${mood} AI 노래</h2>
      ${songs.map((song, index) => `
        <button class="ai-song" data-index="${index}">
          🎵 ${song.title}
        </button>
      `).join('')}
    </section>
  `;

  container.querySelectorAll('.ai-song').forEach(button => {
    button.addEventListener('click', () => {
      alert('아직 실제 AI 음원은 생성되지 않았어.');
    });
  });
}
