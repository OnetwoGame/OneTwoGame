
const backgroundSound = new Howl({
    src: ['music/hangmaning.mp3'], 
    loop: true, 
    volume: 1 
});

backgroundSound.play();

const victorySound = new Howl({
    src: ['music/victory.mp3'], 
    volume: 1
});

const faulSound = new Howl({
    src: ['music/fail.mp3'], 
    volume: 1
});

function playBackgroundSound() {
    backgroundSound.play();
}

function pauseBackgroundSound() {
    backgroundSound.pause();
}