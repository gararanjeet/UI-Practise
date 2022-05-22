const colors = [
  { fill: "#F4B9B8", odd: "#EBBBB0" },
  { fill: "#EC8FD0", odd: "#F2C5E0" },
  { fill: "#00b4d8", odd: "#48cae4" },
  { fill: "#8eecf5", odd: "#98f5e1" },
  { fill: "#ddbdfc", odd: "#e0c3fc" },
];

var score = 0;
var size = 4;
var rowIndex;
var columnIndex;

window.onload = () => {
  getOddIndex();
  createContainer(size);
};

const getOddIndex = () => {
  rowIndex = Math.floor(Math.random() * size);
  columnIndex = Math.floor(Math.random() * size);
};

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const createContainer = (size) => {
  document.getElementsByTagName("span")[0].innerText = score;
  const container = document.querySelector(".container");
  const random = Math.floor(Math.random() * 4);
  if (container.children.length > 0) removeChilds(container);
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add(`${i * size + j}`, "cell");
      cell.addEventListener("click", check);
      cell.style.backgroundColor = colors[random].fill;
      if (rowIndex === i && columnIndex === j) {
        cell.classList.add("odd");
        cell.style.backgroundColor = colors[random].odd;
      }
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
};

const check = (e) => {
  const index = e.target.classList.value.split(" ");
  if (index.includes("odd")) update();
  else reset();
};

const update = () => {
  score += 1;
  size += 1;
  getOddIndex();
  createContainer(size);
};

const reset = () => {
  score = 0;
  size = 4;
  getOddIndex();
  ele = document.querySelector(".container");
  ele.classList.add("shake");
  setTimeout(() => {
    ele.classList.remove("shake");
    createContainer(size);
  }, 800);
};
