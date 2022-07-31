const gamebox = document.querySelector(".gamebox");
const cards = document.querySelectorAll(".card-inner");
const gameoverScreen = document.querySelector(".gameover");
const tryAgain = document.querySelector("#tryAgain");
const textbox = document.querySelector(".textbox");
let chances = 5;
let random = "";

const random25 = function () {
  random = Math.floor(Math.random() * 25 + 1);
  console.log(random);
};

const gameover = function () {
  if (chances === 0) {
    console.log("gameover");
    gameoverScreen.classList.add("showLose");
    textbox.textContent = `Sorry!`;
  }
};

const reset = function () {
  for (let i = 0; i < 25; i++) {
    const newCard = document.createElement("div");
    newCard.classList.add("card-container");
    newCard.dataset.number = i + 1;
    newCard.textContent = i;
    gamebox.append(newCard);
  }
  const cardContainer = document.querySelectorAll(".card-container");

  //   const inner = `<div class="card-inner">${index}
  // <div class="card-front"></div>
  // <div class="card-back"></div>
  // </div>`;

  cardContainer.forEach(function (card, index) {
    card.innerHTML = `<div class="card-inner">
    <div class="card-front tabs">${index + 1}</div>
    <div class="card-back"></div>
    </div>`;

    setTimeout(function () {
      setTimeout(function () {
        card.classList.add("show");
      }, 150 * index);
    }, 500);
  });
  random25();
  chances = 5;
};

reset();

gamebox.addEventListener("click", function (e) {
  const clicked = e.target.closest(".card-inner");
  if (!clicked) return;
  clicked.classList.add("flip-card");
  console.log(clicked.closest(".card-container").getAttribute("data-number"));
  if (
    random ===
    Number(clicked.closest(".card-container").getAttribute("data-number"))
  ) {
    clicked.querySelector(".card-back").style.backgroundColor = "#8ac926";
    console.log("You win!");
    gameoverScreen.classList.add("showLose");
    textbox.textContent = `Winner!!!`;
  }
  chances--;
  gameover();
});

tryAgain.addEventListener("click", function () {
  gamebox.textContent = "";
  reset();
  gameoverScreen.classList.remove("showLose");
});
