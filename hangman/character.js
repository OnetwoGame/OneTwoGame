// 캐릭터 리스트 생성
var characterList = {
    starBunch: { fileName: 'hanastar1.png' },
    starMan: { fileName: 'hanastar2.png' },
    starFriend: { fileName: 'hanastar3.png' },
    starNuri: { fileName: 'hanastar4.png' },
    starSpring: { fileName: 'hanastar5.png' },
    starGeneral: { fileName: 'hanastar6.png' },
    starPro: { fileName: 'hanastar7.png' },
    starNim: { fileName: 'hanastar8.png' },
    starWoong: { fileName: 'hanastar9.png' },
};

// 선택된 캐릭터 가져오기
function getSelectedCharacter() {
    let selectedCharacterList = [];
    let cnt = 0;
    for (const characterKey in characterList) {
        const item = sessionStorage.getItem(characterKey);

        if (item == 'true') {
            console.log('test : ' + characterKey);
            let character = characterList[characterKey];
            console.log(character.fileName);
            selectedCharacterList.push(characterKey);

            if (cnt == 0) {
                document.getElementById('hangman').setAttribute('src', './img/' + character.fileName);
                cnt++;
            }
        }
    }
}

const selectedCharacterList = getSelectedCharacter();
