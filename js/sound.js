function activeSound() {
  console.log("check");
  const audio = new Audio(musicURL);
  audio.muted = true;
  audio
    .play()
    .then(() => {
      audio.muted = false;
    })
    .catch((error) => {
      console.error(failMusicMessage, error);
    });
}

window.addEventListener(keyDown, activeSound);
