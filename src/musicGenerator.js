
const moodStyles = {
  happy: 'upbeat cheerful pop, bright synths, vocals',
  sad: 'emotional piano pop, gentle vocals',
  angry: 'powerful rock, energetic drums, vocals',
  calm: 'soft lo-fi, peaceful ambient, gentle vocals',
  excited: 'romantic synth pop, sparkling melody, vocals',
  tired: 'slow ambient, warm relaxing vocals'
};

export async function generateMusic(song, mood) {
  if (!song?.lyrics) {
    throw new Error('노래 가사가 필요해.');
  }

  const response = await fetch('/api/music/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: song.title,
      lyrics: song.lyrics,
      style: moodStyles[mood] || moodStyles.calm
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || '음악 생성에 실패했어.');
  }

  if (!result.audioUrl) {
    throw new Error('생성된 음악 주소가 없어.');
  }

  return {
    ...song,
    audioUrl: result.audioUrl
  };
}
