
import { generateMusic } from './musicGenerator.js';
import { setSongs, playSong } from './player.js';

document.querySelector('#createMusic').addEventListener('click', async () => {
  const lyrics = document.querySelector('#lyrics').value.trim();
  const status = document.querySelector('#creationStatus');

  if (!lyrics) {
    status.textContent = '먼저 가사를 입력해 줘!';
    return;
  }

  status.textContent = '🎵 AI 음악 생성 요청 중...';

  try {
    const song = await generateMusic(
      {
        title: 'Moodify Original',
        lyrics,
        audioUrl: ''
      },
      selectedMood
    );

    currentSongs = [song];
    currentIndex = 0;
    setSongs(currentSongs);

    status.textContent = '음악 생성 완료! 재생할게.';

    await playSong(0);
  } catch (error) {
    status.textContent = `음악 생성 실패: ${error.message}`;
  }
});
