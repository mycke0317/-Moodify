
import { moodMelodies } from './moodMelodies.js';

let audioContext = null;
let oscillators = [];
let timer = null;

let currentMood = 'happy';
let currentSong = null;
let noteIndex = 0;
let isPaused = false;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

export function setMood(mood) {
  if (!moodMelodies[mood]) return;

  stopSong();

  currentMood = mood;
  currentSong = null;
  noteIndex = 0;
}

export function setCurrentSong(song) {
  stopSong();
  currentSong = song;
  noteIndex = 0;
}

function playNote() {
  if (isPaused) return;

  const notes = moodMelodies[currentMood];

  if (!notes || notes.length === 0) return;

  const context = getAudioContext();

  if (noteIndex >= notes.length) {
    noteIndex = 0;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = notes[noteIndex];

  gain.gain.setValueAtTime(0.1, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    context.currentTime + 0.45
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.5);

  oscillators.push(oscillator);

  noteIndex++;
}

export async function playSong(song = currentSong) {
  if (song) {
    currentSong = song;
  }

  const context = getAudioContext();

  if (context.state === 'suspended') {
    await context.resume();
  }

  stopSong();

  noteIndex = 0;
  isPaused = false;

  playNote();

  timer = setInterval(() => {
    playNote();
  }, 500);
}

export async function pauseSong() {
  isPaused = true;

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  if (audioContext?.state === 'running') {
    await audioContext.suspend();
  }
}

export async function resumeSong() {
  if (!audioContext || !currentSong) return;

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  if (!timer) {
    isPaused = false;

    playNote();

    timer = setInterval(() => {
      playNote();
    }, 500);
  }
}

export function stopSong() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  oscillators.forEach(oscillator => {
    try {
      oscillator.stop();
    } catch {
      // 이미 종료된 소리는 무시
    }
  });

  oscillators = [];
  isPaused = false;
  noteIndex = 0;
}
