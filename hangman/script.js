const wd = document.querySelector(".word-display"); // 단어 표시 영역
const gt = document.querySelector(".guesses-text b"); // 추측 횟수 표시 영역
const kd = document.querySelector(".keyboard"); // 키보드 영역
const hi = document.querySelector(".hangman-box img"); // 매달린 사람 이미지
const gm = document.querySelector(".game-modal"); // 게임 종료 모달
const pb = gm.querySelector("button"); // "Play Again" 버튼

// 단어 목록
const wl = [
    "apple", "banana", "orange", "grape", "watermelon", "strawberry",
    "kiwi", "pineapple", "blueberry", "peach", "mango", "pear",
    "cherry", "lemon", "lime", "coconut", "apricot", "plum",
    "fig", "papaya"
];

// 게임 변수 초기화
let cw = ""; // 현재 단어
let cl = []; // 맞춘 글자들을 저장하는 배열
let wc; // 틀린 추측 횟수
const mg = 6; // 최대 틀린 추측 횟수

// 게임 초기화 함수
const rg = () => {
    // 게임 변수 및 UI 요소 초기화
    cl = [];
    wc = 0;
    hi.src = "img/hangman-0.jpg"; // 초기 이미지
    gt.innerText = `${wc} / ${mg}`; // 추측 횟수 표시
    // 현재 단어를 글자 하나씩 나눠서 단어 표시 영역에 추가
    wd.innerHTML = cw.split("").map(() => `<li class="letter" style="color:white;text-shadow: 5px 5px #2D63A7;"></li>`).join("");
    // 모든 키보드 버튼 활성화
    kd.querySelectorAll("button").forEach(btn => btn.disabled = false);
    // 모달 창 숨기기
    gm.classList.remove("show");
}

// 랜덤 단어 선택 함수
const gr = () => {
    // 단어 목록에서 랜덤하게 단어 선택
    cw = wl[Math.floor(Math.random() * wl.length)];
    console.log(cw);
    rg(); // 게임 초기화
}

// 게임 종료 함수
const go = (iv) => {
    // 게임 종료 후 모달에 관련 정보 표시
    const mt = iv ? `You found the word:` : 'The correct word was:';
    // gm.querySelector("img").src = `images/${iv ? 'victory' : 'lost'}.gif`; // 모달 이미지 변경
    gm.querySelector("h4").innerText = iv ? 'Congrats!' : 'Game Over!'; // 모달 제목 변경
    gm.querySelector("p").innerHTML = `${mt} <b>${cw}</b>`; // 모달 텍스트 변경
    console.log("모달로 들어옴");
    gm.classList.add("show"); // 모달 창 보이기
}


// 게임 초기화 함수
const ig = (button, clickedLetter) => {
    // 현재 단어가 정의되었는지 확인
    if (!cw) {
        console.error("cw is not defined!"); // 콘솔에 오류 메시지 출력
        return;
    }

    // 현재 단어에 클릭한 글자가 포함되어 있는지 확인
    if (cw.includes(clickedLetter)) {
        // 모든 맞춘 글자를 단어 표시 영역에 표시
        [...cw].forEach((letter, index) => {
            if (letter === clickedLetter) {
                cl.push(letter);
                wd.querySelectorAll("li")[index].innerText = letter;
                wd.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // 틀린 추측 횟수 증가 물풍선 크기 증가로 이미지 변경
        wc++; 
        hi.src = `images/hangman-${wc}.svg`; 
    }

    button.disabled = true; // 클릭한 버튼 비활성화
    gt.innerText = `${wc} / ${mg}`; // 추측 횟수 갱신

    // 게임 종료 조건 확인
    if (wc === mg) {
        console.log("게임종료");
        return go(false);
    }
    if (cl.length === cw.length) return go(true);
}

// 키보드 버튼 생성 및 이벤트 리스너 추가
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i); // ASCII 코드를 문자로 변환하여 버튼에 추가
    kd.appendChild(button);
    button.addEventListener("click", (e) => ig(e.target, String.fromCharCode(i))); // 클릭 시 ig 함수 호출
}

gr(); // 초기 단어 선택
pb.addEventListener("click", gr); 