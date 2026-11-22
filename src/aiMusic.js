
import { setSongs } from './player.js';

const moods = {
  happy: ['행복','햇살','웃음','무지개','축제','별빛','설렘','미소','꿈','여행'],
  sad: ['그리움','눈물','추억','이별','새벽','비','편지','기억','마음','고백'],
  angry: ['폭발','질주','불꽃','반항','번개','외침','분노','심장','열정','도전'],
  calm: ['바람','휴식','구름','바다','숲','달빛','산책','평온','새벽','노을'],
  excited: ['두근','첫사랑','고백','분홍빛','만남','기대','봄날','반짝','심쿵','약속'],
  tired: ['잠든','포근','밤하늘','휴식','꿈결','느린','달빛','고요','이불','새벽']
};

const lyrics = {
  happy: '오늘은 마음껏 웃어 봐. 우리의 하루가 반짝여. 새로운 꿈을 향해 달려가.',
  sad: '조용한 밤에 너를 떠올려. 지나간 추억을 노래해. 언젠가는 웃을 수 있겠지.',
  angry: '가슴속 불꽃을 깨워 봐. 멈추지 않고 앞으로 가. 우리의 목소리를 높여.',
  calm: '부드러운 바람이 불어와. 잠시 눈을 감아 봐. 오늘은 편안하게 쉬어.',
  excited: '너를 보면 심장이 뛰어. 설레는 마음을 안고서. 새로운 순간을 기다려.',
  tired: '조용히 눈을 감아 봐. 하루의 무게를 내려놔. 포근한 꿈속으로 떠나.'
};

export function getMoodSongs(mood) {
  const words = moods[mood];
  if (!words) return [];

  const songs = Array.from({ length: 100 }, (_, i) => ({
    id: `${mood}-${i + 1}`,
    title: `${words[i % 10]} ${words[Math.floor(i / 10)]} ${i + 1}`,
    lyrics: lyrics[mood],
    audioUrl: ''
  }));

  setSongs(songs);
  return songs;
}
