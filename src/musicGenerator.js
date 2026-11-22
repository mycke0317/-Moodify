
export async function generateMusic(song) {
  if (!song) {
    throw new Error('노래 정보가 없어.');
  }

  const response = await fetch('/api/music/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mood: song.mood,
      title: song.title,
      lyrics: song.lyrics
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || '음악 생성에 실패했어.'
    );
  }

  if (!result.audioUrl) {
    throw new Error('생성된 음원 주소가 없어.');
  }

  return {
    ...song,
    audioUrl: result.audioUrl
  };
}
