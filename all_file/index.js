const boxs = document.querySelectorAll(".box");
const info_game = document.querySelector(".info");
const new_game_btn = document.querySelector(".btn");
console.log(boxs);
let curr_player;
let grid_game;
const winnig_position = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  curr_player = "X";
  grid_game = ["", "", "", "", "", "", "", "", ""];
  boxs.forEach((box, index) => {
    box.innerText = "";
    boxs[index].style.pointerEvents = "all";
    boxs[index].classList.remove("win");
  });
  new_game_btn.classList.remove("active");
  info_game.innerText = `Current Player - ${curr_player}`;
}
initGame();
function swap_player() {
  if (curr_player == "X") {
    curr_player = "O";
  } else {
    curr_player = "X";
  }
  info_game.innerText = `Current Player - ${curr_player}`;
}

function gameOver() {
  let ans = "";
  winnig_position.forEach((position) => {
    if (
      (grid_game[position[0]] != "" ||
        grid_game[position[1]] != "" ||
        grid_game[position[2]] != "") &&
      grid_game[position[0]] == grid_game[position[1]] &&
      grid_game[position[0]] == grid_game[position[2]]
    ) {
      if (grid_game[position[0]] == "X") {
        ans = "X";
      } else {
        ans = "O";
      }
      boxs.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxs[position[0]].classList.add("win");
      boxs[position[1]].classList.add("win");
      boxs[position[2]].classList.add("win");
    }
    if (ans !== "") {
      info_game.innerText = `Winner Player - ${ans}`;
      new_game_btn.classList.add("active");
      return;
    }

    let count1 = 0;
    grid_game.forEach((box) => {
      if (box !== "") {
        count1++;
      }
    });
    if (count1 === 9) {
      info_game.innerText = `Match Tied!`;
      new_game_btn.classList.add("active");
    }
  });
}

function handleClick(index) {
  if (grid_game[index] === "") {
    boxs[index].innerText = curr_player;
    grid_game[index] = curr_player;
    boxs[index].style.pointerEvents = "none";
    swap_player();
    gameOver();
  }
}
boxs.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

new_game_btn.addEventListener("click", initGame);
