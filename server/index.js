
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Moodify',
    generator: 'Suno-style'
  });
});

app.post('/api/music/generate', async (req, res) => {
  try {
    const { title, lyrics, style, mood } = req.body;

    if (!lyrics || !style) {
      return res.status(400).json({
        error: '가사와 음악 스타일을 입력해 줘.'
      });
    }

    const apiUrl = process.env.MUSIC_API_URL;
    const apiKey = process.env.MUSIC_API_KEY;

    if (!apiUrl || !apiKey) {
      return res.status(503).json({
        error: '실제 AI 음악 생성 엔진이 연결되지 않았어.'
      });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        title: title || 'Moodify Original',
        lyrics,
        style,
        mood,
        instrumental: false
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.message || '음악 생성 요청에 실패했어.'
      });
    }

    if (!result.audioUrl) {
      return res.status(502).json({
        error: '생성 엔진에서 음원 주소를 반환하지 않았어.'
      });
    }

    res.json({
      success: true,
      audioUrl: result.audioUrl,
      title: result.title || title
    });

  } catch (error) {
    console.error('Music generation error:', error);

    res.status(500).json({
      error: '음악 생성 서버 오류가 발생했어.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Moodify server running on port ${PORT}`);
});
