
import { setSongs } from './player.js';

export async function getMoodSongs(mood) {
  try {
    const response = await fetch('/music/ai-songs.json');

    if (!response.ok) {
      throw new Error('노래 목록을 불러오지 못했어.');
    }

    const data = await response.json();

    const selectedMood = data.moods.find(
      item => item.id === mood
    );

    const songs = selectedMood?.songs || [];

    setSongs(songs);

    return songs;
  } catch (error) {
    console.error('Moodify 음악 오류:', error);
    return [];
  }
}
