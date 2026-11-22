
const moods = {
  happy: {
    name: '행복',
    titles: ['햇살 가득한 날', '오늘은 좋은 날', '웃음이 피어나', '반짝이는 하루'],
    lines: [
      '햇살이 창문을 두드려\n새로운 하루가 시작돼\n작은 바람에도 웃음이 나\n오늘은 좋은 날이야',
      '하늘 위로 손을 뻗어\n반짝이는 꿈을 따라가\n걱정은 잠시 내려놓고\n이 순간을 노래할래'
    ]
  },
  sad: {
    name: '슬픔',
    titles: ['비 오는 창가', '그리운 계절', '조용한 밤', '마음의 편지'],
    lines: [
      '창밖에는 비가 내려\n생각이 조금 많아져\n괜찮아질 거라 믿으며\n천천히 걸어가',
      '흐린 하늘 너머에는\n작은 빛이 기다리고\n오늘의 마음을 안고서\n내일을 맞이할래'
    ]
  },
  angry: {
    name: '분노',
    titles: ['다시 일어나', '멈추지 않아', '나의 목소리', '뜨거운 순간'],
    lines: [
      '가슴속에 힘을 모아\n내 목소리를 외쳐 봐\n넘어져도 다시 일어나\n나만의 길을 걸어가',
      '더는 망설이지 않아\n새로운 길을 찾아가\n뜨거운 마음을 따라서\n끝까지 달려갈 거야'
    ]
  },
  calm: {
    name: '차분함',
    titles: ['고요한 숲', '느린 오후', '평온한 하루', '바람의 노래'],
    lines: [
      '바람이 천천히 불어와\n나뭇잎이 조용히 춤춰\n잠시 눈을 감아 보면\n평온함이 찾아와',
      '햇살 아래 쉬어 가며\n작은 숨을 고르고\n흘러가는 시간 속에\n나를 맡겨 볼래'
    ]
  },
  excited: {
    name: '신남',
    titles: ['오늘 밤', '반짝이는 순간', '더 높이', '멈출 수 없어'],
    lines: [
      '두근거리는 이 순간\n리듬에 몸을 맡겨 봐\n오늘은 멈추지 않을래\n더 높이 날아갈 거야',
      '하나 둘 셋 시작해\n온 세상이 빛나 보여\n우리만의 박자 속에\n신나게 달려가자'
    ]
  },
  tired: {
    name: '피곤함',
    titles: ['쉬어 가도 돼', '포근한 밤', '잠깐의 휴식', '느린 걸음'],
    lines: [
      '오늘 하루 수고했어\n이제는 쉬어도 괜찮아\n천천히 숨을 고르면서\n편안한 밤을 맞이해',
      '조용한 불빛 아래서\n따뜻한 시간을 보내\n서두르지 않아도 돼\n오늘은 여기까지'
    ]
  }
};

export function getMoodSongs(mood) {
  const data = moods[mood];
  if (!data) return [];

  return Array.from({ length: 100 }, (_, i) => ({
    id: `${mood}-${i + 1}`,
    title: `${data.titles[i % data.titles.length]} ${Math.floor(i / data.titles.length) + 1}`,
    mood,
    lyrics: data.lines[i % data.lines.length],
    audioUrl: ''
  }));
}

export function getAllMoodSongs() {
  return Object.keys(moods).flatMap(getMoodSongs);
}

export function getMoodName(mood) {
  return moods[mood]?.name ?? '알 수 없음';
}
