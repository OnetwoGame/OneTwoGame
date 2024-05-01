const wd = document.querySelector(".display"); // 단어 표시 영역
const gt = document.querySelector(".guesses b"); // 추측 횟수 표시 영역
const kd = document.querySelector(".keyboard"); // 키보드 영역
const hi = document.querySelector(".hangman-box img"); // 매달린 사람 이미지
const wi = document.querySelector(".waterBallon-box img"); // 매달린 사람 이미지
const gm = document.querySelector(".modal"); // 게임 종료 모달
const pb = gm.querySelector("button"); // "Play Again" 버튼
const victory = document.querySelector(".new");
const balloon = document.querySelector(".wrap"); // 물풍선
const balloonBox = document.querySelector(".waterBallon-box");
const waveBox = document.querySelector(".wave-box");

var characterList = {
  starBunch: { fileName: "hanastar1.png" },
  starMan: { fileName: "hanastar2.png" },
  starFriend: { fileName: "hanastar3.png" },
  starNuri: { fileName: "hanastar4.png" },
  starSpring: { fileName: "hanastar5.png" },
  starGeneral: { fileName: "hanastar6.png" },
  starPro: { fileName: "hanastar7.png" },
  starNim: { fileName: "hanastar8.png" },
  starWoong: { fileName: "hanastar9.png" },
};

console.log(hi);
// 메인 페이지로 이동
const goToMainPage = () => {
  window.location.href = "../index.html";
};

// 단어 목록
const wl = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "peach",
  "mango",
  "pear",
  "cherry",
  "lemon",
  "lime",
  "coconut",
  "apricot",
  "plum",
  "fig",
  "papaya",
  "table",
  "chair",
  "brush",
  "river",
  "snake",
  "paper",
  "smile",
  "queen",
  "clock",
  "laugh",
  "happy",
  "ocean",
  "stone",
  "horse",
  "plant",
  "mouse",
  "eagle",
  "water",
  "guitar",
  "monkey",
  "donkey",
];

// 게임 변수 초기화
let cw = ""; // 현재 단어
let cl = []; // 맞춘 글자들을 저장하는 배열
let wc; // 틀린 추측 횟수
const mg = 6; // 최대 틀린 추측 횟수

// 세션 스토리지에서 파일 가져오기
const filename = (function getSelectedCharacter() {
  for (const characterKey in characterList) {
    const item = sessionStorage.getItem(characterKey);
    if (item == "true") {
      let character = characterList[characterKey];
      return character.fileName;
    }
  }
})();

// 게임 초기화 함수
const rg = () => {
  // 게임 변수 및 UI 요소 초기화
  cl = [];
  wc = 0;
  // hi.src = "./img" + filename; // 초기 이미지/
  gt.innerText = `${wc} / ${mg}`; // 추측 횟수 표시
  // 현재 단어를 글자 하나씩 나눠서 단어 표시 영역에 추가
  wd.innerHTML = cw
    .split("")
    .map(
      () =>
        `<li class="letter" style="color:white;text-shadow: 5px 5px #2D63A7;  font-size: 6rem;"></li>`
    )
    .join("");
  // 모든 키보드 버튼 활성화
  kd.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  // 모달 창 숨기기
  gm.classList.remove("show");

  // 풍선 초기화
  (function resetBalloon() {
    balloon.classList.remove("burst");
    balloon.style.width = "110px";
    balloon.style.height = "150px";
    waveBox.style.width = "98px";
    waveBox.style.height = "98px";
  })();
};

// 랜덤 단어 선택 함수
const gr = () => {
  // 단어 목록에서 랜덤하게 단어 선택
  cw = wl[Math.floor(Math.random() * wl.length)];
  console.log(cw);
  rg(); // 게임 초기화
};

// 게임 종료 함수
const go = (iv) => {
  // 게임 종료 후 모달에 관련 정보 표시
  const mt = iv ? `You found the word:` : "The correct word was:";
  if (iv) {
    victorySound.play(); // 성공했을 때 음악 재생
    pauseBackgroundSound(); // 배경음악 일시정지

    let particles = [];
    const colors = ["#eb6383", "#fa9191", "#ffe9c5", "#b4f2e1"];

    // 파티클을 생성하고 초기화하는 함수
    function pop() {
      // 150개의 파티클 생성
      for (let i = 0; i < 150; i++) {
        const p = document.createElement("particule");
        // 초기 위치 설정
        p.x = window.innerWidth * 0.5;
        p.y = window.innerHeight + Math.random() * window.innerHeight * 0.3;
        // 초기 속도 설정
        p.vel = {
          x: (Math.random() - 0.5) * 10,
          y: Math.random() * -20 - 15,
        };
        // 질량 설정
        p.mass = Math.random() * 0.2 + 0.8;
        // 생성된 파티클 요소 스타일 설정
        p.style.transform = `translate(${p.x}px, ${p.y}px)`;
        const size = Math.random() * 15 + 5;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        // 파티클을 문서에 추가
        document.body.appendChild(p);
        // 생성된 파티클을 배열에 추가
        particles.push(p);
      }
    }

    // 애니메이션 렌더링 함수
    function render() {
      // 모든 파티클에 대해 반복
      for (let i = particles.length - 1; i--; i > -1) {
        const p = particles[i];
        // 파티클 위치 업데이트
        p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;
        p.x += p.vel.x;
        p.y += p.vel.y;
        // 중력 적용
        p.vel.y += 0.5 * p.mass;
        // 화면을 벗어난 파티클 제거
        if (p.y > window.innerHeight * 2) {
          p.remove();
          particles.splice(i, 1);
        }
      }
      // 다음 프레임 요청하여 애니메이션 반복
      requestAnimationFrame(render);
    }

    // 폭죽 효과 시작
    pop();
    // 지정 시간 지난 후에 애니메이션 렌더링 시작
    window.setTimeout(render, 500);

    const victoryImg = document.createElement("img");
    if (filename === "hanastar2.png") {
      victoryImg.src = "img/victoryhanastar2.png";
    } else {
      victoryImg.src = "img/" + filename; //"img/victory.png";
    }
    victoryImg.className = "victory-image";
    document.body.appendChild(victoryImg);

    const hangmanImg = document.querySelector(".hangman-box img");
    hangmanImg.remove(); // hangman 이미지 삭제
    balloonBox.remove(); // balloon 삭제
    const nulll = document.querySelector(".game");
    nulll.remove();

    setTimeout(() => {
      victoryImg.remove(); // 이미지를 5초 후에 삭제
      showGameOverModal({ iv, mt }); // 모달을 표시하는 함수 호출
    }, 3000); // 5초 후에 실행
  } else {
    if (filename === "hanastar2.png") {
      hi.src = "img/failhanastar2.png";
    }

    failSound.play(); // 성공했을 때 음악 재생
    pauseBackgroundSound(); // 배경음악 일시정지
    showGameOverModal({ iv, mt });
  }
};

// 게임 종료 후 모달 표시 함수
const showGameOverModal = ({ iv, mt }) => {
  gm.querySelector("h4").innerText = iv ? "Congrats!" : "Game Over!"; // 모달 제목 변경
  gm.querySelector("p").innerHTML = `${mt} <b>${cw}</b>`; // 모달 텍스트 변경
  console.log("모달로 들어옴");

  // "Play Again" 버튼 추가
  const playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Play Again";
  playAgainButton.classList.add("restart-button");
  playAgainButton.addEventListener("click", () => {
    playBlopSound();
    window.location.reload(); // 페이지 다시 로드하여 게임 다시 시작
  });

  // "Main Page" 버튼 추가
  const mainPageButton = document.createElement("button");
  mainPageButton.innerText = "Main Page";
  mainPageButton.classList.add("main-page-link");
  mainPageButton.addEventListener("click", goToMainPage);

  const buttonsContainer = document.createElement("div"); // 새로운 요소 생성
  buttonsContainer.classList.add("modal-buttons-container");
  buttonsContainer.appendChild(playAgainButton);
  buttonsContainer.appendChild(mainPageButton);

  gm.querySelector(".content").appendChild(buttonsContainer); // 버튼 컨테이너 모달에 추가

  gm.classList.add("show"); // 모달 창 보이기
};

// 이미지에 맞는 클래스를 결정합니다.
const changeImage = function (newSrc) {
  hi.src = newSrc;
  const fileName = newSrc.substring(newSrc.lastIndexOf("/") + 1);
  const newClass = fileName.replace("sad", "").replace(".png", "");
  hi.className = newClass;
};

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
    const newImageURL = "./img/sad" + filename;
    changeImage(newImageURL);
    if (wc <= 5) {
      setTimeout(() => {
        const newImageURL = "./img/" + filename;
        changeImage(newImageURL);
      }, 700);
    }
    if (wc <= 5) {
      var newWidth = 98 + wc * 40; // 물풍선 크기 증가
      var newHeight = 150 + wc * 60;
      balloon.style.width = newWidth + "px";
      balloon.style.height = newHeight + "px";

      var newWidth2 = 98 + wc * 40; // 물풍선 물줄기 크기 증가
      var newHeight2 = 98 + wc * 40;
      waveBox.style.width = newWidth2 + "px";
      waveBox.style.height = newHeight2 + "px";
    } else {
      balloon.classList.add("burst"); // 풍선 터지는 애니메이션
      const waterFallImg = document.createElement("div");
      waterFallImg.className = "waterfall";
      document.querySelector(".container").appendChild(waterFallImg);
      setTimeout(function () {
        // waterfall div 제거
        waterFallImg.remove();
      }, 2000);
    }
  }

  button.disabled = true; // 클릭한 버튼 비활성화
  gt.innerText = `${wc} / ${mg}`; // 추측 횟수 갱신

  // 게임 종료 조건 확인
  if (wc === mg) {
    console.log("게임종료");
    return go(false);
  }
  if (cl.length === cw.length) return go(true);
};

// 키보드 버튼 생성 및 이벤트 리스너 추가
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i); // ASCII 코드를 문자로 변환하여 버튼에 추가
  kd.appendChild(button);
  button.addEventListener("click", (e) => {
    ig(e.target, String.fromCharCode(i));
    playBlopSound();
  }); // 클릭 시 ig 함수 호출
}

// reset 버튼
const resetButton = document.querySelector(" .reset-button");
resetButton.addEventListener("click", () => {
  gr();
  playBlopSound();
});

gr(); // 초기 단어 선택

pb.addEventListener("click", gr);

const restartButton = document.querySelector(".restart-button");

// 재시작 버튼 클릭 시 이벤트 처리
restartButton.addEventListener("click", () => {
  gr(); // 새로운 단어 선택
});
