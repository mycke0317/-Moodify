
const API_URL = '/api/generate-music';

export async function generateAIMusic({
  mood,
  title,
  lyrics,
  style
}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mood,
      title,
      lyrics,
      style,
      instrumental: false
    })
  });

  if (!response.ok) {
    throw new Error('AI 음악 생성에 실패했어.');
  }

  const result = await response.json();

  if (!result.audioUrl) {
    throw new Error('생성된 음악 주소가 없어.');
  }

  return result.audioUrl;
}
