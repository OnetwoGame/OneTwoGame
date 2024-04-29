class TicTacToe {
  constructor() {
    this.player;
    this.board;
    this.flag = 0;
    //게임 플레이 여부
    this.playing = false;
    //각 칸
    this.cells = document.querySelectorAll(".board__cell");
    // 시작 버튼
    this.startButtons = document.querySelectorAll(".btn-start");
    //# 안쓰는 코드
    this.coverContainer = document.querySelector(".cover");
    this.gameContainer = document.querySelector(".game");
    this.playerDisplay = document.querySelector(".player__id");
    this.resultDisplay = document.querySelector(".result");
    this.playAgainDisplay = document.querySelector(".play-again");
    this.againButton = document.querySelector(".again-button");
    this.stopButton = document.querySelector(".stop-button");
    this.info = document.querySelector(".info");
    this.xImg = document.getElementById("x-img");
    this.oImg = document.getElementById("o-img");

    // board cell을 클릭했을 때
    this.cells.forEach((cell) => {
      cell.addEventListener("click", this.cellClickHandler.bind(this));
    });

    //게임 시작, 게임 다시 하기 버튼
    this.startButtons.forEach((btn) => {
      console.log(this.flag + "asfg");
      btn.addEventListener("click", this.startNewGame.bind(this));
    });

    // modal 창에서 "아니오" 버튼 클릭 시
    this.stopButton.addEventListener("click", () => {
      document.querySelector(".play-again").classList.add("hide");
      // resolve를 호출하여 false 반환
    });

    this.init();
  }

  init() {
    // x부터 시작
    this.player = "X";
    this.board = Array.from({ length: 3 }, () => {
      return Array.from({ length: 3 }, () => null);
    });
    this.playing = true;
    this.cells.forEach((cell) => (cell.textContent = ""));
  }

  //game 새로 시작
  startNewGame() {
    console.log(this.flag);
    //게임 modal 창
    //만약 이미 게임을 실행했다면?
    if (this.flag === 1) {
      //재시작 modal 띄우기
      this.playAgainDisplay.classList.remove("hide");

      // again button 클릭 시
      const playAgainHandler = () => {
        console.log("play again");
        // 모달 창 숨기기
        this.playAgainDisplay.classList.add("hide");
        // 다시 게임을 하지 않는다면?
        this.hidePlayerImages();
        this.resultDisplay.classList.add("hide");
        this.gameContainer.classList.remove("hide");
        this.init();
        document.querySelector(".player2-full").classList.add("opacity");

        this.startButtons.forEach((btn) => {
          this.flag = 1;
          // 게임 다시시작 버튼
          btn.innerHTML =
            '<img src="./img/restart_button.png" alt="game restart image" class="game-button1">';
        });
      };

      // again button 이벤트 리스너 등록

      this.againButton.addEventListener("click", playAgainHandler);

      // stop button 클릭 시
      const stopButtonClickHandler = () => {
        console.log("stop game");
        // 모달 창 숨기기
        this.playAgainDisplay.classList.add("hide");
        // 함수 종료
        return;
      };

      // stop button 이벤트 리스너 등록
      this.stopButton.addEventListener("click", stopButtonClickHandler);

      return;
    }

    //처음 시작한다면 if문 실행하지 않고 바로 밑 코드부터 실행
    this.hidePlayerImages();
    this.resultDisplay.classList.add("hide");
    this.gameContainer.classList.remove("hide");
    this.init();
    document.querySelector(".player2-full").classList.add("opacity");

    this.startButtons.forEach((btn) => {
      this.flag = 1;
      // 게임 다시시작 버튼
      btn.innerHTML =
        '<img src="./img/restart_button.png" alt="game restart image" class="game-button1">';
    });
  }

  //game 재시작 -> 비동기 처리 에러로 사용 X
  playAgain() {
    return new Promise((resolve, reject) => {
      // "네" 버튼 클릭 시
      document
        .querySelector(".again-button")
        .addEventListener("click", function () {
          document.querySelector(".play-again").classList.add("hide");
          // resolve를 호출하여 true 반환
          resolve(true);
        });

      // "아니오" 버튼 클릭 시
      const stopButtonClickHandler = () => {
        document.querySelector(".play-again").classList.add("hide");
        // resolve를 호출하여 false 반환
        resolve(false);
        // 이벤트 핸들러 제거
        this.stopButton.removeEventListener("click", stopButtonClickHandler);
      };
      this.stopButton.addEventListener("click", stopButtonClickHandler);
    });
  }

  hidePlayerImages() {
    const xImg = document.getElementById("x-img");
    const oImg = document.getElementById("o-img");
    xImg.style.display = "none";
    oImg.style.display = "none";
  }

  finishGame() {
    this.flag = 1;
    this.playing = false;
    // this.coverContainer.classList.remove("hide");
    this.gameContainer.classList.add("hide");
  }

  cellClickHandler(e) {
    if (this.playing === false) {
      return;
    }
    const el = e.target;
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    if (this.isEmptyCell({ row, col })) {
      this.markCell({ row, col, el });
      if (this.isCurrentPlayerWin()) {
        // 3칸이 이어진 경우 해당 플레이어 승리
        if (this.player === "X") {
          this.displayText(`Player1 Win!`);
        } else {
          this.displayText(`Player2 Win!`);
        }
        // this.displayText(`${this.player}의 승리!`);
        this.finishGame();
      } else if (this.isEveryCellMarked()) {
        // 3칸을 잇지 못했지만 모든 칸이 찬 경우 비김
        this.displayText("DRAW");
        this.finishGame();
      } else {
        // 누구도 3칸을 잇지 못하고, 남은 칸이 있는 경우
        this.changePlayer();
      }
    }
  }
  // 턴 변경 => 플레이어 변경
  changePlayer() {
    this.player = this.player === "X" ? "O" : "X";
    // this.playerDisplay.textContent = this.player;
    // character 투명도 처리
    if (this.player === "X") {
      // 'X'인 경우
      // 'player1-full' 클래스를 가진 이미지는 100% 투명도로 유지하고, 'player2-full' 클래스를 가진 이미지는 50% 투명도로 변경
      document.querySelector(".player2-full").classList.add("opacity");
      document.querySelector(".player1-full").classList.remove("opacity");
    } else {
      // 'O'인 경우
      // 'player2-full' 클래스를 가진 이미지는 100% 투명도로 유지하고, 'player1-full' 클래스를 가진 이미지는 50% 투명도로 변경
      document.querySelector(".player1-full").classList.add("opacity");
      document.querySelector(".player2-full").classList.remove("opacity");
    }
  }

  displayText(text) {
    // cover 에 표시
    this.resultDisplay.querySelector(".result-text").textContent = text;
    this.resultDisplay.classList.remove("hide");
    this.info.classList.add("blur");
    // console.log(text);
  }

  isEmptyCell({ row, col }) {
    return this.board[row][col] === null;
  }

  isEveryCellMarked() {
    for (let i = 0; i < 3; i++) {
      const row = this.board[i];
      for (let j = 0; j < 3; j++) {
        if (row[j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  isCurrentPlayerWin() {
    // 3칸이 이어졌는지 확인
    // 가로줄
    if (
      this.board[0].every((mark) => mark === this.player) ||
      this.board[1].every((mark) => mark === this.player) ||
      this.board[2].every((mark) => mark === this.player)
    ) {
      return true;
    }
    // 세로줄
    for (let i = 0; i < this.board.length; i++) {
      if (
        this.board[0][i] == this.player &&
        this.board[1][i] == this.player &&
        this.board[2][i] == this.player
      ) {
        return true;
      }
    }
    // 대각선
    if (
      this.board[0][0] == this.player &&
      this.board[1][1] == this.player &&
      this.board[2][2] == this.player
    ) {
      return true;
    }
    if (
      this.board[2][0] == this.player &&
      this.board[1][1] == this.player &&
      this.board[0][2] == this.player
    ) {
      return true;
    }
    return false;
  }

  markCell({ row, col, el }) {
    if (this.playing) {
      const img = this.player === "X" ? this.xImg : this.oImg;
      const cloneImg = img.cloneNode(true);
      el.appendChild(cloneImg);
      cloneImg.style.display = "block";

      this.board[row][col] = this.player;
    }
  }
}

const t = new TicTacToe();
