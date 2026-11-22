
const MOOD_STYLES = {
  happy: 'upbeat cheerful pop, bright synths',
  sad: 'emotional piano pop, gentle atmosphere',
  angry: 'powerful rock, energetic drums',
  calm: 'soft lo-fi, peaceful ambient sounds',
  excited: 'romantic synth pop, sparkling melody',
  tired: 'slow ambient, warm relaxing sounds'
};

export async function generateMusic(song, mood) {
  if (!song || !song.lyrics) {
    throw new Error('노래 정보와 가사가 필요해.');
  }

  const apiUrl = import.meta.env.VITE_MUSIC_API_URL;
  const apiKey = import.meta.env.VITE_MUSIC_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error(
      'AI 음악 생성 서비스 연결이 아직 설정되지 않았어.'
    );
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      title: song.title,
      lyrics: song.lyrics,
      style: MOOD_STYLES[mood] || MOOD_STYLES.calm,
      instrumental: false
    })
  });

  if (!response.ok) {
    throw new Error('AI 음악 생성 요청에 실패했어.');
  }

  const result = await response.json();

  if (!result.audioUrl) {
    throw new Error('생성된 음원 주소가 없어.');
  }

  return {
    ...song,
    audioUrl: result.audioUrl
  };
}
