const codeGuesses = Array.from(
  document.querySelectorAll(".guess-and-color-selection")
);
const containerColors = document.querySelector(".container-colors");
const pastGuesses = [];
const errorContainer = document.querySelector(".error-container");
const submitBtn = document.querySelector(".submit-button");
const pastGuessesContainer = document.querySelector(".past-guesses");
let guessesLeft = 10;
class Guess {
  guess;
  allColors;
  #parentElement = document.querySelector(".past-guesses");
  #rightColorRightSpot;
  #rightColorWrongSpot;
  #wrongColor;
  constructor(guess, rightColorRightSpot, rightColorWrongSpot, wrongColor) {
    this.guess = [...guess];
    this.#rightColorRightSpot = rightColorRightSpot;
    this.#rightColorWrongSpot = rightColorWrongSpot;
    this.#wrongColor = wrongColor;
    this.allColors = this.guess.join(",");
  }
  renderGuess() {
    //EDIT AFTERWARDS TO ADD ICONS
    const html = `<div data-id = "${
      pastGuesses.indexOf(this) + 1
    }"class="past-guess past-guess-${
      (pastGuesses.indexOf(this) + 1) % 2 === 0 ? "even" : "odd"
    }">
        <div data-id = "${
          pastGuesses.indexOf(this) + 1
        }"class="spot-icon right-color-right-spot-icon">${
      this.#rightColorRightSpot
    }</div>
        <div data-id = "${pastGuesses.indexOf(this) + 1}"class="black-box-code">
            <div data-id = "${
              pastGuesses.indexOf(this) + 1
            }"class="past-guess-colors">
                <div class="past-guess-color color-${
                  this.guess[0]
                }" data-id = "${pastGuesses.indexOf(this) + 1}"data-color = "${
      this.guess[0]
    }"></div>
                <div class="past-guess-color color-${
                  this.guess[1]
                }" data-id = "${pastGuesses.indexOf(this) + 1}"data-color = "${
      this.guess[1]
    }"></div>
                <div class="past-guess-color color-${
                  this.guess[2]
                }" data-id = "${pastGuesses.indexOf(this) + 1}"data-color = "${
      this.guess[2]
    }"></div>
                <div class="past-guess-color color-${
                  this.guess[3]
                }" data-id = "${pastGuesses.indexOf(this) + 1}"data-color = "${
      this.guess[3]
    }"></div>
            </div>
        </div>
        <div data-id = "${
          pastGuesses.indexOf(this) + 1
        }"class="spot-icon right-color-wrong-spot-icon">${
      this.#rightColorWrongSpot
    }</div>


</div>`;
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
const gameInit = function () {
  const colors = [
    "blue",
    "grey",
    "yellow",
    "red",
    "orange",
    "green",
    "white",
    "pink",
  ];
  const code = [];
  for (let i = 0; i < 4; i++) {
    code.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  codeGuesses.forEach(function (el, i) {
    el.insertAdjacentHTML(
      "afterbegin",
      `<div class="color-selector hidden" data-guess-num="${i + 1}">
    <button data-color="red"title="color" class="color color-red"></button>
    <button data-color="blue" title="color" class="color color-blue"></button>
    <button data-color="green"title="color" class="color color-green"></button>
    <button data-color="yellow" title="color" class="color color-yellow"></button>
    <button data-color="orange"title="color" class="color color-orange"></button>
    <button data-color="pink"title="color" class="color color-pink"></button>
    <button data-color="grey"title="color" class="color color-grey"></button>
    <button data-color="white"title="color" class="color color-white"></button>

    </button>
</div>`
    );
  });
  return code;
};
const code = gameInit();
console.log(code);

const guessInit = function () {
  const guess = new Array(4);
  guess.fill("_");
  codeGuesses.forEach(function (codeGuess) {
    codeGuess
      .querySelector(".color-guess")
      .addEventListener("mouseenter", function (e) {
        const colorSelector = codeGuess.querySelector(".color-selector");
        colorSelector.classList.remove("hidden");
        if (!errorContainer.classList.contains("deleted")) {
          errorContainer.classList.add("deleted");
        }

        codeGuess.addEventListener("mouseleave", function (e) {
          colorSelector.classList.add("hidden");
        });
      });
  });
  containerColors.addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target.closest(".color")) {
      const guessPosition = e.target.parentElement.dataset.guessNum;
      const color = e.target.dataset.color;
      guess[guessPosition - 1] = color;
      console.log(guess);
      e.target.parentElement.parentElement.querySelector(
        ".color-guess"
      ).style.backgroundColor = color;
    }
    //FIX AFTERWARDS TO ADD CLICK EVENT

    //     if (e.target.closest('color-guess')) {
    //        //CODE GOES HERE
    //     }
  });
  pastGuessesContainer.addEventListener("click", function (e) {
    const clickTarget = e.target;
    if (e.target.closest(".past-guess")) {
      const id = clickTarget.dataset.id;
      const container = Array.from(
        document.querySelectorAll(".past-guess")
      ).reduce(
        (containerEl, curEl) => (curEl.dataset.id === id ? curEl : containerEl),
        ""
      );
      console.log(container);
      const pastGuessedColors = container.querySelectorAll(".past-guess-color");
      console.log(pastGuessedColors);
      pastGuessedColors.forEach(function (passedGuessedColorEl, i) {
        console.log("Hello");
        const color = passedGuessedColorEl.dataset.color;
        guess[i] = color;
        console.log(guess);
        // pastGuesses[id - 1].guess[id - 1] = color;
        document.querySelectorAll(".color-guess")[i].style.backgroundColor =
          color;
      });
    }
  });

  return guess;
};
const guess = guessInit();

//Function that will check the guess, some some actions but ultimately will will return true or false based on whether the user got the code right or not
const checkGuess = function (guess, code) {
  let rightColorWrongSpot = 0;
  let rightColorRightSpot = 0;
  let wrongColor = 0;
  try {
    if (guess.includes("_"))
      throw new Error("Error: Some guesses have not been assigned a color");
    if (
      pastGuesses.some(
        (pastGuess) => pastGuess.guess.join("") === guess.join("")
      )
    )
      throw new Error("Error : Sequence has already been guessed");
    guess.forEach(function (color, i) {
      if (code.includes(color)) {
        if (code[i] === color) {
          rightColorRightSpot++;
        } else {
          rightColorWrongSpot++;
        }
      } else {
        wrongColor++;
      }
    });
    if (rightColorRightSpot < 4) {
      pastGuesses.push(
        new Guess(
          [...guess],
          rightColorRightSpot,
          rightColorWrongSpot,
          wrongColor
        )
      );
      pastGuesses[pastGuesses.length - 1].renderGuess();
      guessesLeft--; //MOVE TO DIFFERENT FUNCTION AFTERWARDS
      console.log(pastGuesses, guessesLeft);

      return false;
    } else {
      //END GAME - PROMPT USER TO CLICK A NEW BUTTON TO START OVER
      return true;
    }
  } catch (err) {
    console.error(err);
    // document.querySelector('.header-mastermind').style.marginBotton = '12.8rem'
    errorContainer.classList.remove("deleted");
    document.querySelector(".error-text").textContent = err.message;
  }
};

const submitInit = function () {
  submitBtn.addEventListener("click", checkGuess.bind(null, guess, code)); //PUT INTO FUNCTION LATER
};
submitInit();
// guess goes here

/*
let gameOver = false;
let playerWon = false;
let playerLost = false;
let guessesLeft = 10;
const checkGuess = function (guess) {
    let rightColorRightSpot = 0;
    let rightColorWrongSpot = 0;
    let wrongColor = 0;
    guessColors = guess.split(', ')
    guessColors.forEach(function (guessColor, i) {
        if (code.includes(color) && code.findIndexOf(guessColor) === i) {
            //Add class to the correct color button with the correct svg symbol
            rightColorRightSpot++;

        }
        else if (code.includes(color)) {
            //Add class to the correct color button with the correct svg symbol
            rightColorWrongSpot++;
        }
        else {
            wrongColorWrongSpot++;
        }

    })
    if (rightColorRightSpot === 4) {
        playerWon = true;
        gameOver = true;
    }
    else {
        if (guessesLeft > 0) guessesLeft--;
        else {
            playerLost = true;
            gameOver = true;
        }
    }
    if (gameOver) {
        if (playerWon) {
            //Put code here
        }
        if (playerLost) {//Put code here
        }
    }
}
*/
