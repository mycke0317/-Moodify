
import { moodMelodies } from './moodMelodies.js';

let audioContext;
let oscillators = [];
let timer = null;
let currentMood = 'happy';

export function setMood(mood) {
  if (moodMelodies[mood]) currentMood = mood;
}

export async function playSong() {
  audioContext ??= new AudioContext();

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  stopSong();

  const notes = moodMelodies[currentMood];
  let index = 0;

  function playNote() {
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
  if (audioContext?.state === 'running') {
    audioContext.suspend();
  }
}

export async function resumeSong() {
  if (audioContext?.state === 'suspended') {
    await audioContext.resume();
  }
}

export function stopSong() {
  if (timer) clearInterval(timer);
  timer = null;

  oscillators.forEach(o => {
    try { o.stop(); } catch {}
  });

  oscillators = [];
}
