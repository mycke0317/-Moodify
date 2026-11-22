
const moodStyles = {
  happy: '밝고 신나는 팝, 경쾌한 보컬',
  sad: '감성적인 피아노 팝, 부드러운 보컬',
  angry: '강렬한 록, 파워풀한 보컬',
  calm: '잔잔한 로파이, 편안한 보컬',
  excited: '설레는 신스 팝, 달콤한 보컬',
  tired: '느린 앰비언트, 따뜻한 보컬'
};

export function createMusicPrompt(mood, lyrics) {
  return {
    title: 'Moodify Original Music',
    style: moodStyles[mood] || moodStyles.calm,
    lyrics,
    instrumental: false,
    vocal: true
  };
}

export function getMusicStatus() {
  return {
    ready: false,
    message: '실제 AI 음원 생성 서비스 연결이 필요해.'
  };
}
