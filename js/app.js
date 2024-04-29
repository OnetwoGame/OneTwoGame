// 캐릭터 리스트 생성
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

// 캐릭터 상태 변경
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

// 행맨 캐릭터 수 검증
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
         * css와 다르게 location.href는 현재 문서의 위치를 기준으로 URL을 설정함
         */
        location.href = mainToHangmanURL;
    }
}

// 틱택토 캐릭터 수 검증
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
         * css와 다르게 location.href는 현재 문서의 위치를 기준으로 URL을 설정함
         */
        location.href = mainToTictactoeURL;
    }
}
