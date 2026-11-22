
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Moodify'
  });
});

app.post('/api/music/generate', async (req, res) => {
  const { mood, title, lyrics } = req.body;

  if (!mood || !title || !lyrics) {
    return res.status(400).json({
      error: '기분, 제목, 가사가 필요해.'
    });
  }

  return res.status(503).json({
    error: '아직 실제 AI 음악 생성 엔진이 연결되지 않았어.',
    mood,
    title
  });
});

app.listen(PORT, () => {
  console.log(`Moodify server running on port ${PORT}`);
});
