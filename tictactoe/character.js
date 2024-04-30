// 캐릭터 리스트 생성
var characterList = {
    starBunch: { fileName: 'hanastar1.png', fileHeadName: 'hanastar1_h.png' },
    starMan: { fileName: 'hanastar2.png', fileHeadName: 'hanastar2_h.png' },
    starFriend: { fileName: 'hanastar3.png', fileHeadName: 'hanastar3_h.png' },
    starNuri: { fileName: 'hanastar4.png', fileHeadName: 'hanastar4_h.png' },
    starSpring: { fileName: 'hanastar5.png', fileHeadName: 'hanastar5_h.png' },
    starGeneral: { fileName: 'hanastar6.png', fileHeadName: 'hanastar6_h.png' },
    starPro: { fileName: 'hanastar7.png', fileHeadName: 'hanastar7_h.png' },
    starNim: { fileName: 'hanastar8.png', fileHeadName: 'hanastar8_h.png' },
    starWoong: { fileName: 'hanastar9.png', fileHeadName: 'hanastar9_h.png' },
};

// 선택된 캐릭터 가져오기
function getSelectedCharacter() {
    let selectedCharacterList = [];
    let cnt = 0;
    for (const characterKey in characterList) {
        const item = sessionStorage.getItem(characterKey);

        if (item == 'true') {
            let character = characterList[characterKey];
            console.log(character.fileName);
            selectedCharacterList.push(characterKey);

            if (cnt == 0) {
                document.getElementById('player1-full').setAttribute('src', './img/' + character.fileName);
                document.getElementById('x-img').setAttribute('src', './img/' + character.fileHeadName);

                cnt++;
            } else {
                document.getElementById('player2-full').setAttribute('src', './img/' + character.fileName);
                document.getElementById('o-img').setAttribute('src', './img/' + character.fileHeadName);
            }
        }
    }
}

const selectedCharacterList = getSelectedCharacter();
