class TicTacToe {
  constructor() {
    this.player;
    this.board;
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
    this.info = document.querySelector(".info");
    this.xImg = document.getElementById("x-img");
    this.oImg = document.getElementById("o-img");

    // board cell을 클릭했을 때
    this.cells.forEach((cell) => {
      cell.addEventListener("click", this.cellClickHandler.bind(this));
    });

    //게임 시작, 게임 다시 하기 버튼
    this.startButtons.forEach((btn) => {
      btn.addEventListener("click", this.startNewGame.bind(this));
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

  startNewGame() {
    this.hidePlayerImages();
    this.resultDisplay.classList.add("hide");
    this.gameContainer.classList.remove("hide");
    this.init();
    document.querySelector(".player2-full").classList.add("opacity");

    this.startButtons.forEach((btn) => {
      // 게임 다시시작 버튼
      btn.innerHTML =
        '<img src="./img/restart_button.png" alt="game restart image" class="game-button1">';
    });
  }
  hidePlayerImages() {
    const xImg = document.getElementById("x-img");
    const oImg = document.getElementById("o-img");
    xImg.style.display = "none";
    oImg.style.display = "none";
  }

  finishGame() {
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
        this.displayText(`${this.player}의 승리!`);
        this.finishGame();
      } else if (this.isEveryCellMarked()) {
        // 3칸을 잇지 못했지만 모든 칸이 찬 경우 비김
        this.displayText("비겼습니다");
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
    console.log(text);
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
