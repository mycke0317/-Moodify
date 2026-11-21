
export async function getMoodSongs(mood) {
  try {
    const response = await fetch('/music/ai-songs.json');

    if (!response.ok) {
      throw new Error('음악 목록을 불러오지 못했어.');
    }

    const data = await response.json();

    const selectedMood = data.moods.find(
      item => item.id === mood
    );

    return selectedMood ? selectedMood.songs : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
