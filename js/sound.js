// // 키 입력시 BGM 추가
// function activeSound() {
//     const audio = new Audio(musicURL);
//     audio.muted = true;
//     audio
//         .play()
//         .then(() => {
//             audio.muted = false;
//         })
//         .catch((error) => {
//             console.error(failMusicMessage, error);
//         });
// }

// window.addEventListener(keyDown, activeSound);

const backgroundSound = new Howl({
    src: [musicURL],
    loop: true,
    volume: 0.2,
  });
  
  backgroundSound.play();
  
  const victorySound = new Howl({
    src: [victorySoundURL],
    volume: 0.3,
  });
  
  const failSound = new Howl({
    src: [failSoundURL],
    volume: 0.3,
  });
  
  function playBackgroundSound() {
    backgroundSound.play();
  }
  
  function pauseBackgroundSound() {
    backgroundSound.pause();
  }
  
  function playClickSound() {
    // Audio 요소 생성
    const audio = new Audio(clickSoundURL);
    // 효과음 재생
    audio.play();
  }
  
  function playBlopSound() {
    // Audio 요소 생성
    const audio = new Audio(blopSoundURL);
    // 효과음 재생
    audio.play();
  }
  
  function playPopUpSound() {
    // Audio 요소 생성
    const audio = new Audio(popUpSoundURL);
    // 효과음 재생
    audio.play();
  }
  
  function playTinyButtonSound() {
    // Audio 요소 생성
    const audio = new Audio(TinyButtonSoundURL);
    // 효과음 재생
    audio.play();
  }
  