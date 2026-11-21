
export let songs = [];

export function setSongs(newSongs) {
  songs = Array.isArray(newSongs) ? newSongs : [];
  window.dispatchEvent(
    new CustomEvent("songsupdated", { detail: songs })
  );
}

export function getSongs() {
  return songs;
}

class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentIndex = -1;
  }

  play(url, title = "Music") {
    if (!url) return;

    this.audio.src = url;

    this.audio.play().catch(error => {
      console.error("Music playback error:", error);
    });

    window.dispatchEvent(
      new CustomEvent("songchange", {
        detail: { url, title }
      })
    );
  }

  playSong(index) {
    if (index < 0 || index >= songs.length) return;

    this.currentIndex = index;
    const song = songs[index];

    this.play(
      song.url || song.audioUrl || song.src,
      song.title || song.name || "Music"
    );
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    return this.audio.play().catch(console.error);
  }

  toggle() {
    return this.audio.paused
      ? this.resume()
      : this.pause();
  }

  next() {
    if (this.currentIndex < songs.length - 1) {
      this.playSong(this.currentIndex + 1);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.playSong(this.currentIndex - 1);
    }
  }

  setVolume(value) {
    this.audio.volume = Math.max(0, Math.min(1, value));
  }
}

const player = new MusicPlayer();

export default player;
export const playMusic = (url, title) => player.play(url, title);
export const pauseMusic = () => player.pause();
export const resumeMusic = () => player.resume();
export const toggleMusic = () => player.toggle();
export const nextSong = () => player.next();
export const previousSong = () => player.previous();

window.musicPlayer = player;
window.playMusic = playMusic;
window.pauseMusic = pauseMusic;
window.toggleMusic = toggleMusic;
