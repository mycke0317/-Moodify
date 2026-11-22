
const moodData = {
  happy: {
    name: '행복',
    titles: ['오늘은 좋은 날', '햇살 가득', '웃음이 피어나'],
    lyrics: [
      '햇살이 내 창문을 두드려\n오늘은 왠지 좋은 예감이 들어\n작은 바람에도 웃음이 나와\n이 순간을 기억할 거야'
    ]
  },

  sad: {
    name: '슬픔',
    titles: ['비 오는 밤', '그리운 순간', '조용한 마음'],
    lyrics: [
      '창밖에 비가 내리고\n조용히 하루를 돌아봐\n괜찮아질 거라고 믿으며\n내일을 기다려 볼게'
    ]
  },

  angry: {
    name: '화남',
    titles: ['멈추지 않아', '다시 일어나', '나의 목소리'],
    lyrics: [
      '가슴속에 뜨거운 바람\n더 이상 물러서지 않아\n내 목소리를 크게 외쳐\n다시 앞으로 나아가'
    ]
  },

  calm: {
    name: '차분함',
    titles: ['고요한 숲', '느린 오후', '평온한 하루'],
    lyrics: [
      '바람이 천천히 지나가\n모든 것이 조용해지고\n잠시 눈을 감아 보면\n평온함이 찾아와'
    ]
  },

  excited: {
    name: '신남',
    titles: ['오늘 밤', '반짝이는 순간', '더 높이'],
    lyrics: [
      '두근거리는 이 순간\n리듬에 몸을 맡겨 봐\n오늘은 멈추지 않을래\n세상 끝까지 달려가'
    ]
  },

  tired: {
    name: '피곤함',
    titles: ['쉬어 가도 돼', '포근한 밤', '잠깐의 휴식'],
    lyrics: [
      '오늘 하루 수고했어\n이제는 쉬어도 괜찮아\n천천히 숨을 고르면서\n편안한 밤을 맞이해'
    ]
  }
};

export function getMoodSongs(mood) {
  const data = moodData[mood];

  if (!data) return [];

  return data.titles.map((title, index) => ({
    id: `${mood}-${index + 1}`,
    title,
    mood,
    lyrics: data.lyrics[index % data.lyrics.length],
    audioUrl: ''
  }));
}

export function getAllMoodSongs() {
  return Object.keys(moodData).flatMap(getMoodSongs);
}

export function getMoodName(mood) {
  return moodData[mood]?.name ?? '알 수 없음';
}
