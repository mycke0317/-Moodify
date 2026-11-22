
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Moodify',
    musicGeneration: 'not-connected'
  });
});

app.post('/api/music/generate', async (req, res) => {
  const { title, lyrics, style } = req.body;

  if (!title || !lyrics || !style) {
    return res.status(400).json({
      error: '제목, 가사, 음악 스타일이 필요해.'
    });
  }

  if (!process.env.MUSIC_API_URL || !process.env.MUSIC_API_KEY) {
    return res.status(503).json({
      error: 'AI 음악 생성 서비스가 아직 연결되지 않았어.'
    });
  }

  return res.status(501).json({
    error: '실제 음악 생성 API 규격 연결이 필요해.'
  });
});

app.listen(PORT, () => {
  console.log(`Moodify server running on port ${PORT}`);
});
