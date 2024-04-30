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

    // 세션에 추가
    sessionStorage.setItem(characterKey, character.active);
}

const modal = document.querySelector('.modal'); // 모달

// 행맨 캐릭터 수 검증
function validateHangman() {
    playTinyButtonSound();
    var cnt = 0;

    for (const characterKey in characterList) {
        const character = characterList[characterKey];
        if (character.active == true) {
            cnt++;
        }
    }

    if (cnt != hangmanActiveCnt) {
        modal.querySelector('h4').innerText = 'Notice'; // 모달 제목 변경
        modal.querySelector('p').innerHTML = '<b>' + hangmanCntErrorMessage + '</b>'; // 모달 텍스트 변경

        // "Play Again" 버튼 추가
        const playAgainButton = document.createElement('button');
        playAgainButton.innerText = 'Play Again';
        playAgainButton.classList.add('restart-button');
        playAgainButton.addEventListener('click', () => {
            window.location.reload(); // 페이지 다시 로드하여 게임 다시 시작
        });

        const buttonsContainer = document.createElement('div'); // 새로운 요소 생성
        buttonsContainer.classList.add('modal-buttons-container');
        buttonsContainer.appendChild(playAgainButton);

        modal.querySelector('.content').appendChild(buttonsContainer); // 버튼 컨테이너 모달에 추가

        modal.classList.add('show'); // 모달 창 보이기
    } else {
        /**
         * css와 다르게 location.href는 현재 문서의 위치를 기준으로 URL을 설정함
         */
        location.href = mainToHangmanURL;
    }
}

// 틱택토 캐릭터 수 검증
function validateTicTacToe() {
    playTinyButtonSound();
    var cnt = 0;

    for (const characterKey in characterList) {
        const character = characterList[characterKey];
        if (character.active == true) {
            cnt++;
        }
    }

    if (cnt != tictactoeActiveCnt) {
        modal.querySelector('h4').innerText = 'Notice'; // 모달 제목 변경
        modal.querySelector('p').innerHTML = '<b>' + tictactoeCntErrorMessage + '</b>'; // 모달 텍스트 변경

        // "Play Again" 버튼 추가
        const playAgainButton = document.createElement('button');
        playAgainButton.innerText = 'Play Again';
        playAgainButton.classList.add('restart-button');
        playAgainButton.addEventListener('click', () => {
            window.location.reload(); // 페이지 다시 로드하여 게임 다시 시작
        });

        const buttonsContainer = document.createElement('div'); // 새로운 요소 생성
        buttonsContainer.classList.add('modal-buttons-container');
        buttonsContainer.appendChild(playAgainButton);

        modal.querySelector('.content').appendChild(buttonsContainer); // 버튼 컨테이너 모달에 추가

        modal.classList.add('show'); // 모달 창 보이기
    } else {
        /**
         * css와 다르게 location.href는 현재 문서의 위치를 기준으로 URL을 설정함
         */
        location.href = mainToTictactoeURL;
    }
}
