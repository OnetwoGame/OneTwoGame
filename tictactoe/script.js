class TicTacToe {
  constructor() {
    this.player;
    this.board;
    this.flag = 0;
    //게임 플레이 여부
    this.playing = false;
    //각 칸
    this.cells = document.querySelectorAll(".board__cell");
    // document
    this.startButtons = document.querySelectorAll(".btn-start");
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
      cell.addEventListener("mouseenter", this.cellHoverHandler.bind(this));
      cell.addEventListener("mouseleave", this.cellLeaveHandler.bind(this));
      // cell.addEventListener("click", this.cellClickHandler.bind(this));
    });

    this.cells.forEach((cell) => {
      cell.addEventListener("click", this.cellClickHandler.bind(this));
    });

    //게임 시작, 게임 다시 하기 버튼
    this.startButtons.forEach((btn) => {
      btn.addEventListener("click", this.startNewGame.bind(this));
    });

    // modal 창에서 "아니오" 버튼 클릭 시
    this.stopButton.addEventListener("click", () => {
      document.querySelector(".play-again").classList.add("hide");
      // resolve를 호출하여 false 반환
    });
    //초기화
    this.init();
  }

  init() {
    // x부터 시작
    this.player = "X";
    // 게임 보드 초기화
    this.board = Array.from({ length: 3 }, () => {
      return Array.from({ length: 3 }, () => null);
    });
    // 게임 실행
    this.playing = true;

    this.cells.forEach((cell) => (cell.textContent = ""));
  }

  //game 새로 시작
  startNewGame() {
    console.log(this.flag);
    //게임 modal 창]
    //게임을 재시작했을 경우
    //만약 이미 게임을 실행했다면 조건문 실행
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
        // 결과창 숨기기
        this.resultDisplay.classList.add("hide");
        // 게임창 숨김 취소
        this.gameContainer.classList.remove("hide");
        // 게임 초기화
        this.init();
        //player1부터 시작 player2의 opacity를 낮추기
        document.querySelector(".player2-full").classList.add("opacity");

        this.startButtons.forEach((btn) => {
          // 게임 다시시작 버튼
          btn.innerHTML =
            '<img src="./img/restart_button.png" alt="game restart image" class="game-button1">';
        });
      };

      // again button 이벤트 리스너 등록 -> 다시 게임을 시작
      this.againButton.addEventListener("click", playAgainHandler);

      // stop button 클릭 시 -> 다시 시작 취소
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

    //처음 시작한다면 if문 실행하지 않고 바로 밑 코드부터 실행 -> flag = 0
    this.hidePlayerImages();
    this.resultDisplay.classList.add("hide");
    this.gameContainer.classList.remove("hide");
    this.init();
    document.querySelector(".player2-full").classList.add("opacity");

    this.startButtons.forEach((btn) => {
      // 게임 실행되어 flag =1로 변경
      this.flag = 1;
      // 게임 다시시작 버튼
      btn.innerHTML =
        '<img src="./img/restart_button.png" alt="game restart image" class="game-button1">';
    });
  }
  // 기존 캐릭터 이미지 div에서 숨김
  hidePlayerImages() {
    const xImg = document.getElementById("x-img");
    const oImg = document.getElementById("o-img");
    xImg.style.display = "none";
    oImg.style.display = "none";
  }
  //게임 종료
  finishGame() {
    this.flag = 1;
    //플레이 종료
    this.playing = false;
    this.gameContainer.classList.add("hide");
  }
  // 보드 호버 handler
  cellHoverHandler(e) {
    const el = e.target;
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    if (this.isEmptyCell({ row, col })) {
      const img = this.player === "X" ? this.xImg : this.oImg;
      const cloneImg = img.cloneNode(true);
      cloneImg.classList.add("hover");
      cloneImg.style.display = "block";
      el.appendChild(cloneImg);
    }
  }

  cellLeaveHandler(e) {
    const el = e.target;
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    el.removeChild(el.querySelector(".hover"));
  }
  // 보드 셀 클릭 handler
  cellClickHandler(e) {
    if (this.playing === false) {
      return;
    }
    const el = e.target;
    const row = Number(el.parentNode.dataset.row);
    const col = Number(el.parentNode.dataset.col);

    if (this.isEmptyCell({ row, col })) {
      this.markCell({ row, col, el });
      if (this.isCurrentPlayerWin()) {
        // 3칸이 이어진 경우 해당 플레이어 승리
        //현재 플레이어가 X라면
        if (this.player === "X") {
          this.displayText(`Player1 Win!`);
        } else {
          this.displayText(`Player2 Win!`);
        }
        //게임 종료
        this.finishGame();
      } else if (this.isEveryCellMarked()) {
        // 3칸을 잇지 못했지만 모든 칸이 찬 경우 비김
        this.displayText("DRAW");
        this.finishGame();
      } else {
        // 누구도 3칸을 잇지 못하고, 남은 칸이 있는 경우
        // 턴 변경
        this.changePlayer();
      }
    }
  }
  // 턴 변경 => 플레이어 변경
  changePlayer() {
    this.player = this.player === "X" ? "O" : "X";

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
  //result modal 표시
  displayText(text) {
    // cover 에 표시
    this.resultDisplay.querySelector(".result-text").textContent = text;
    this.resultDisplay.classList.remove("hide");
    this.info.classList.add("blur");
    // console.log(text);
  }
  // 게임 보드에서 비어있는 칸
  isEmptyCell({ row, col }) {
    return this.board[row][col] === null;
  }
  //모든 칸이 채워져 있는지
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

  // 현재 플레이어가 승리했는지
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
  // cell에 이미지 채워넣기
  markCell({ row, col, el }) {
    if (this.playing) {
      const img = this.player === "X" ? this.xImg : this.oImg;
      const cloneImg = img.cloneNode(true);
      cloneImg.style.display = "block";
      el.parentNode.appendChild(cloneImg);
      // display를 block으로 변경
      // 현재 플레이어 칸 채우기
      this.board[row][col] = this.player;
    }
  }
}

const t = new TicTacToe();
