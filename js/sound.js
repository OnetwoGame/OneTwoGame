function activeSound() {
    console.log('check');
    const audio = new Audio('./assets/main_bgm.mp3');
    audio.muted = true;
    audio
        .play()
        .then(() => {
            audio.muted = false;
        })
        .catch((error) => {
            console.error('음악 재생에 실패했습니다:', error);
        });
}

window.addEventListener('keydown', activeSound);
