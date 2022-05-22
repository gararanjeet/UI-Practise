var score = 0;
var level = 1;
var displayOrder = [];
var userTurn = false;
const notification = document.getElementsByClassName("notify")[0];
const scoreDisplay = document.getElementsByClassName("score")[0];
const levelDisplay = document.getElementsByClassName("level")[0];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const updateScoreLevel = (scr, lvl) => {
  score = scr;
  level = lvl;
  scoreDisplay.innerText = score;
  levelDisplay.innerText = level;
};

const notify = (str) => {
  notification.innerText = str;
};

const showPattern = async () => {
  userTurn = false;
  notify("Watch carefully");
  for (let i = 0; i < level; i++) {
    const index = Math.floor(Math.random() * 5) + 1;
    displayOrder.push(index);
    const ele = document.getElementById(index);
    ele.classList.add("color");
    await sleep(900);
    ele.classList.remove("color");
    await sleep(500);
  }
  userTurn = true;
  notify("You Turn");
};

const listen = async (e) => {
  const ele = e.target;
  if (ele.id != displayOrder[0]) return false;
  ele.classList.add("color");
  displayOrder.shift();
  await sleep(500);
  ele.classList.remove("color");
};

const userInput = async (e) => {
  const value = await listen(e);
  if (value === false) {
    updateScoreLevel(0, 1);
    displayOrder = [];
    const ele = document.querySelector(".memory");
    ele.classList.add("shake");
    notify("YOU LOSE !!!");
    await sleep(800);
    ele.classList.remove("shake");
    userTurn = false;
  } else if (displayOrder.length == 0) {
    updateScoreLevel(score + level, level + 1);
    notify("Congratulation!!! press Start for next level");
    userTurn = false;
  }
};

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mousedown", (e) => {
    if (userTurn === false) return;
    userInput(e);
  });
});

document.querySelector(".btn-strt").addEventListener("mousedown", () => {
  notify("Click Start!!!");
  showPattern();
});
