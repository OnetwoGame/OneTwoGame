// 키 입력시 BGM 추가
function activeSound() {
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
