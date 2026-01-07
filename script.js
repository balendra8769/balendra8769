  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const resetBtn = document.getElementById("reset");
  const board = document.getElementById("board");
  const menu = document.getElementById("menu");
  const friendModeBtn = document.getElementById("friendMode");
  const computerModeBtn = document.getElementById("computerMode");

  let currentPlayer = "X";
  let gameActive = false;
  let mode = ""; // "friend" or "computer"

  const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  friendModeBtn.addEventListener("click", () => startGame("friend"));
  computerModeBtn.addEventListener("click", () => startGame("computer"));
  resetBtn.addEventListener("click", resetGame);

  function startGame(selectedMode) {
    mode = selectedMode;
    menu.style.display = "none";
    board.style.display = "grid";
    resetBtn.style.display = "inline-block";
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = mode === "friend" ? "Player X's Turn" : "Your Turn (X)";
  }

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));

  function handleCellClick(e) {
    const cell = e.target;
    const index = [...cells].indexOf(cell);

    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;

    checkWinner();

    if (!gameActive) return;

    if (mode === "friend") {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    } 
    else if (mode === "computer") {
      currentPlayer = "O";
      statusText.textContent = "Computer's Turn 🤖";
      setTimeout(computerMove, 600);
    }
  }

  function computerMove() {
    const emptyCells = [...cells].filter(cell => cell.textContent === "");
    if (emptyCells.length === 0 || !gameActive) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";

    checkWinner();

    if (gameActive) {
      currentPlayer = "X";
      statusText.textContent = "Your Turn (X)";
    }
  }

  function checkWinner() {
    let roundWon = false;

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
      statusText.textContent = "😐 It's a Draw!";
      gameActive = false;
    }
  }

  function resetGame() {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = mode === "friend" ? "Player X's Turn" : "Your Turn (X)";
  }