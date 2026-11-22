
import { moodMelodies } from './moodMelodies.js';

let audioContext;
let oscillators = [];
let timer = null;
let currentMood = 'happy';
let currentSong = null;
let isPaused = false;

export function setMood(mood) {
  if (moodMelodies[mood]) {
    currentMood = mood;
    currentSong = null;
    stopSong();
  }
}

export function setCurrentSong(song) {
  currentSong = song;
  stopSong();
}

export async function playSong(song = currentSong) {
  if (song) currentSong = song;

  audioContext ??= new AudioContext();

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  stopSong();

  const notes = moodMelodies[currentMood];
  if (!notes?.length) return;

  let index = 0;
  isPaused = false;

  function playNote() {
    if (isPaused) return;
    if (index >= notes.length) index = 0;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = notes[index];

    gain.gain.setValueAtTime(0.12, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.45
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);

    oscillators.push(oscillator);
    index++;
  }

  playNote();
  timer = setInterval(playNote, 500);
}

export function pauseSong() {
  isPaused = true;

  if (timer) clearInterval(timer);
  timer = null;

  if (audioContext?.state === 'running') {
    audioContext.suspend();
  }
}

export async function resumeSong() {
  if (audioContext?.state === 'suspended') {
    await audioContext.resume();
  }

  isPaused = false;

  if (!timer && audioContext) {
    // 실제 이어듣기는 아래 재생 버튼으로 다시 시작
  }
}

export function stopSong() {
  if (timer) clearInterval(timer);
  timer = null;

  oscillators.forEach(o => {
    try { o.stop(); } catch {}
  });

  oscillators = [];
  isPaused = false;
}
