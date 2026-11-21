
class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.currentSong = null;
    this.isPlaying = false;

    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      this.updateUI();
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      this.updateUI();
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      this.updateUI();
      window.dispatchEvent(new Event("songended"));
    });

    this.audio.addEventListener("error", () => {
      console.error("음악 파일을 재생할 수 없습니다.");
    });
  }

  play(url, title = "Music") {
    if (!url) {
      console.error("음악 주소가 없습니다.");
      return;
    }

    if (this.currentSong === url) {
      return this.resume();
    }

    this.currentSong = url;
    this.audio.src = url;
    this.audio.load();

    this.audio.play().catch(error => {
      console.error("재생 오류:", error);
    });

    window.dispatchEvent(new CustomEvent("songchange", {
      detail: { url, title }
    }));
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    if (!this.audio.src) return;
    return this.audio.play().catch(console.error);
  }

  toggle() {
    if (this.audio.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  seek(seconds) {
    this.audio.currentTime = seconds;
  }

  setVolume(volume) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  updateUI() {
    document.querySelectorAll("[data-player-toggle]").forEach(button => {
      button.textContent = this.isPlaying ? "⏸" : "▶";
    });
  }
}

const player = new MusicPlayer();

window.musicPlayer = player;
window.playMusic = (url, title) => player.play(url, title);
window.pauseMusic = () => player.pause();
window.resumeMusic = () => player.resume();
window.toggleMusic = () => player.toggle();

document.addEventListener("click", event => {
  const button = event.target.closest("[data-audio-src]");
  if (!button) return;

  player.play(
    button.dataset.audioSrc,
    button.dataset.title || "Music"
  );
});
