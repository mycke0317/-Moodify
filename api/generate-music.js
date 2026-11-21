
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'POST 요청만 가능해.'
    });
  }

  try {
    const { mood, title, lyrics, style } = req.body || {};

    const moods = [
      'happy',
      'sad',
      'angry',
      'calm',
      'excited',
      'tired'
    ];

    if (!moods.includes(mood) || !title || !lyrics) {
      return res.status(400).json({
        error: '노래 정보가 올바르지 않아.'
      });
    }

    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    if (!projectId || !accessToken) {
      return res.status(503).json({
        error: 'Google Cloud 인증 설정이 필요해.'
      });
    }

    const prompt = `
Create an original Korean song.
Title: ${title}
Mood: ${mood}
Music style: ${style || 'Korean pop'}
Lyrics:
${lyrics}

Include singing vocals, melody, verses and chorus.
Create original music.
`;

    const response = await fetch(
      `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/interactions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'lyria-3-pro-preview',
          input: [
            {
              type: 'user_input',
              content: [
                {
                  type: 'text',
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(result);
      return res.status(response.status).json({
        error: 'AI 음악 생성 요청이 실패했어.'
      });
    }

    const contents = (result.steps || [])
      .flatMap(step => step.content || []);

    const audio = contents.find(
      item => item.type === 'audio'
    );

    const generatedLyrics = contents.find(
      item => item.type === 'text'
    );

    if (!audio?.data) {
      return res.status(502).json({
        error: '생성된 음악을 찾을 수 없어.'
      });
    }

    return res.status(200).json({
      title,
      lyrics: generatedLyrics?.text || lyrics,
      audioBase64: audio.data,
      mimeType: audio.mime_type || 'audio/mpeg'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: '서버 오류가 발생했어.'
    });
  }
}
