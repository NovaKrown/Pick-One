const gamebox = document.querySelector(".gamebox");
const cards = document.querySelectorAll(".card-inner");
const gameoverScreen = document.querySelector(".gameover");
const tryAgain = document.querySelector("#tryAgain");
const textbox = document.querySelector(".textbox");
const counterText = document.querySelector(".counterText");
let chances = 5;
let random = "";

counterText.innerHTML = `Chances left: ${chances}`;

const random25 = function () {
  random = Math.floor(Math.random() * 25 + 1);
  console.log(random);
};

const refreshCounter = function () {
  counterText.innerHTML = `Chances left : ${chances}`;
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

  cardContainer.forEach(function (card, index) {
    card.innerHTML = `<div class="card-inner">
    <div class="card-front tabs">${index + 1}</div>
    <div class="card-back"></div>
    </div>`;

    setTimeout(function () {
      setTimeout(function () {
        card.classList.add("show");
      }, 150 * index);
      chances = 5;
      refreshCounter();
    }, 500);
  });
  random25();
};

reset();

const winner = function (numberClicked, clicked) {
  if (random === numberClicked) {
    const cardBack = clicked.querySelector(".card-back");
    cardBack.style.background = `linear-gradient(135deg, rgba(90,218,158,1) 33%, rgba(169,237,131,1) 66%)`;
    cardBack.classList.add("textbox");
    console.log("You win!");
    cardBack.textContent = `Winner!!`;
    cardBack.classList.add("blinking");
    setTimeout(function () {
      cardBack.textContent = "Play Again?";
      cardBack.classList.remove("blinking");
      cardBack.addEventListener("click", function () {
        gamebox.textContent = "";
        reset();
      });
    }, 2000);
    chances = 0;
  }
};

gamebox.addEventListener("click", function (e) {
  const clicked = e.target.closest(".card-inner");
  if (!clicked) return;
  const numberClicked = Number(
    clicked.closest(".card-container").getAttribute("data-number")
  );

  if (chances > 0) {
    clicked.classList.add("flip-card");
  }
  console.log(numberClicked);

  winner(numberClicked, clicked);

  if (random !== numberClicked && chances !== 0) {
    const cardBack = clicked.querySelector(".card-back");
    if (chances > 0) {
      chances = chances - 1;
    }
    cardBack.style.background = `linear-gradient(
      135deg,
      rgba(158, 86, 152, 1) 33%,
      rgba(175, 70, 121, 1) 66%
    )`;
    if (chances === 0) {
      cardBack.classList.add("textbox");
      console.log("Sorry!");
      cardBack.textContent = `Sorry!!`;
      cardBack.classList.add("blinking");
      setTimeout(function () {
        cardBack.textContent = "Play Again?";
        cardBack.classList.remove("blinking");
        cardBack.addEventListener("click", function () {
          gamebox.textContent = "";
          reset();
        });
      }, 2000);
    }
  }
  refreshCounter();
});
