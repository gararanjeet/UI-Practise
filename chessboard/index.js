const board = document.querySelector(".board");

for (let i = 0; i < 64; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("id", i);
  board.appendChild(cell);
}

const updateBoard = (e) => {
  clearBoard();
  fillBoard(e);
};

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", updateBoard);
});

const clearBoard = () => {
  const colored = document.querySelectorAll(".color");
  if (colored.length == 0) return;
  colored.forEach((cell) => {
    cell.classList.remove("color");
  });
};

const fillBoard = (e) => {
  const index = Number(e.target.id);
  row = Math.floor(index / 8);
  column = index % 8;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (Math.abs(row - i) === Math.abs(j - column)) {
        let position = String(i * 8 + j);
        const ele = document.getElementById(position);
        ele.classList.add("color");
      }
    }
  }
};
