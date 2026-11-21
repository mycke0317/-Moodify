
const MOOD_STYLES = {
  happy: 'Upbeat Korean pop, cheerful vocals, bright synths',
  sad: 'Emotional Korean ballad, expressive vocals, piano',
  angry: 'Energetic rock, powerful vocals, electric guitar',
  calm: 'Soft Korean pop, gentle vocals, warm piano',
  excited: 'Sweet catchy pop, bright vocals, sparkling melody',
  tired: 'Dreamy lo-fi pop, mellow vocals, relaxing beat'
};

export async function generateSong(mood, title, lyrics) {
  if (!MOOD_STYLES[mood]) {
    throw new Error('지원하지 않는 감정이야.');
  }

  if (!title || !lyrics) {
    throw new Error('제목과 가사가 필요해.');
  }

  const response = await fetch('/api/generate-music', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mood,
      title,
      lyrics,
      style: MOOD_STYLES[mood]
    })
  });

  if (!response.ok) {
    throw new Error('AI 음악 생성에 실패했어.');
  }

  const result = await response.json();

  if (!result.audioBase64) {
    throw new Error('생성된 음악 데이터가 없어.');
  }

  const binary = atob(result.audioBase64);
  const bytes = Uint8Array.from(
    binary,
    char => char.charCodeAt(0)
  );

  const blob = new Blob([bytes], {
    type: result.mimeType || 'audio/mpeg'
  });

  return {
    title,
    lyrics: result.lyrics || lyrics,
    audioUrl: URL.createObjectURL(blob)
  };
}
