var characterList = {
    starMan: { active: false },
    starFriend: { active: false },
    starBunch: { active: false },
    starNuri: { active: false },
    starSpring: { active: false },
    starGeneral: { active: false },
    starPro: { active: false },
    starNim: { active: false },
    starWoong: { active: false },
};

function activeToggle(characterKey) {
    const characterImg = document.getElementById(characterKey);

    let character = characterList[characterKey];

    if (characterImg.classList.contains(activeClass)) {
        characterImg.classList.remove(activeClass);
        character.active = false;
    } else {
        characterImg.classList.add(activeClass);
        character.active = true;
    }
}

function validateHangman() {
    var cnt = 0;

    for (const characterKey in characterList) {
        const character = characterList[characterKey];
        if (character.active == true) {
            cnt++;
        }
    }

    if (cnt != hangmanActiveCnt) {
        alert(hangmanCntErrorMessage);
    } else {
        /**
         * TODO: 추후 해당하는 행맨 페이지 확인 필요.
         * css와 다르게 location.href는 현재 문서의 위치를 기준으로 URL을 설정함
         */
        location.href = mainToHangmanURL;
    }
}

function validateTicTacToe() {
    var cnt = 0;

    for (const characterKey in characterList) {
        const character = characterList[characterKey];
        if (character.active == true) {
            cnt++;
        }
    }

    if (cnt != tictactoeActiveCnt) {
        alert(tictactoeCntErrorMessage);
    } else {
        /**
         * TODO: 추후 해당하는 페이지 확인 필요
         * css와 다르게 location.href는 현재 문서의 위치를 기준으로 URL을 설정함
         */
        location.href = mainToTictactoeURL;
    }
}
