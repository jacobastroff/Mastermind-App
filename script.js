//Variable initialization - DOM elements
const codeGuesses = Array.from(
  document.querySelectorAll(".guess-and-color-selection")
);
//Array containing all Mastermind colors
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
const containerColors = document.querySelector(".container-colors");
let pastGuesses = [];
const errorContainer = document.getElementById("error-container");
const successContainer = document.getElementById("success-container");
const hintElementContainer = document.querySelector(".hint-information");
const sidebarRules = document.querySelector(".rules");
const submitBtn = document.querySelector(".submit-button");
const toggleSidebarBtn = document.querySelector(".toggle-sidebar");
const resetBtn = document.querySelector(".reset");
const pastGuessesContainer = document.querySelector(".past-guesses");
//Flags
let guessesLeft = 10;
let playerWon = false;
//Guess object blueprint
class Guess {
  //Variable init
  // guess;
  // allColors;
  #parentElement = document.querySelector(".past-guesses");
  #hintElementContainer = document.querySelector(".hint-information");
  #rightColorRightSpot;
  #rightColorWrongSpot;
  #wrongColor;
  //Function that runs for every instance of Guess blueprint
  constructor(guess, rightColorRightSpot, rightColorWrongSpot, wrongColor) {
    this.guess = [...guess];
    this.#rightColorRightSpot = rightColorRightSpot;
    this.#rightColorWrongSpot = rightColorWrongSpot;
    this.#wrongColor = wrongColor;
    this.allColors = this.guess.join(",");
  }
  //Function to render the guess on the guess log sidebar
  renderGuess() {
    //HTML to be rendered is saved into variable
    const htmlGuessLog = `<div data-id = "${
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
    //Add the HTML to the sidebar
    this.#parentElement.insertAdjacentHTML("afterbegin", htmlGuessLog);
  }
  //Function to render the hint box under the buttons
  renderHintBox() {
    //HTML to be rendered is saved into a variable
    const htmlHintBox = `<li class="clue right-color-right-spot">
    <div
      class="hint-icon spot-icon right-color-right-spot-icon"
    ></div>
    <p class="guess-infomation">
      ${this.#rightColorRightSpot} color${
      this.#rightColorRightSpot > 1 || this.#rightColorRightSpot === 0
        ? "s are"
        : " is"
    } in the code, and in the right spot
    </p>
    </li>
    <li class="clue right-color-wrong-spot">
    <div
      class="hint-icon spot-icon right-color-wrong-spot-icon"
    ></div>
    <p class="guess-infomation">
      ${this.#rightColorWrongSpot} color${
      this.#rightColorWrongSpot > 1 || this.rightColorWrongSpot === 0
        ? "s are"
        : " is"
    } in the code, but in the wrong spot
    </p>
    </li>
    <li class="clue wrong-color">
    <div class="hint-icon spot-icon wrong-color-icon"></div>
    <p class="guess-infomation">
      ${this.#wrongColor} color${
      this.#wrongColor > 1 || this.#wrongColor === 0 ? "s are" : " is"
    } not in the code at all
    </p>
    </li>
    <li class="guesses-remaining">
    <p class="guess-information guesses-left">You have ${
      guessesLeft - 1
    } guess${guessesLeft - 1 > 1 ? "es" : ""} remaining</p>
    </li>
    
    </ul>`;
    //Hint box is rendered
    this.#hintElementContainer.classList.remove("deleted");
    //Delete the previous hint box and add the new one
    this.#hintElementContainer.innerHTML = "";
    this.#hintElementContainer.insertAdjacentHTML("afterbegin", htmlHintBox);
  }
}
//Function to initialize and return the code to be guesses
const initializeCode = function () {
  //Make sure all values in the code are unique and random
  const uniqueCode = new Set();
  while (uniqueCode.size < 4) {
    uniqueCode.add(colors[Math.floor(Math.random() * colors.length)]);
  }
  return [...uniqueCode];
};
//Function to initialize the game itself
const gameInit = function () {
  //Add custom color selector to each guess circle
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
};
//Create a code
const code = initializeCode();
gameInit();
//Initialize the color selector and submit button and return the guess that the submit button catches
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
    if (e.target.closest(".color")) {
      const guessPosition = e.target.parentElement.dataset.guessNum;
      const color = e.target.dataset.color;
      guess[guessPosition - 1] = color;
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
      const pastGuessedColors = container.querySelectorAll(".past-guess-color");
      pastGuessedColors.forEach(function (passedGuessedColorEl, i) {
        const color = passedGuessedColorEl.dataset.color;
        guess[i] = color;
        // pastGuesses[id - 1].guess[id - 1] = color;
        document.querySelectorAll(".color-guess")[i].style.backgroundColor =
          color;
      });
    }
  });
  toggleSidebarBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sidebarRules.classList.toggle("hidden-sidebar");
    const status = sidebarRules.classList.contains("hidden-sidebar")
      ? "hidden"
      : "showing";
    toggleSidebarBtn.textContent = `${
      status === "hidden" ? "Show" : "Hide"
    } Rules!`;
  });

  return guess;
};
//create a new guess
const guess = guessInit();
//IF the code is broken, the correct guess is rendered on the sidebar with different styling
const renderCorrectGuess = function () {
  const html = `<div data-id = "${
    pastGuesses.length - 1
  }"class="past-guess past-guess-correct">
     
      <div data-id = "${pastGuesses.length - 1}"class="black-box-code">
          <div data-id = "${pastGuesses.length - 1}"class="past-guess-colors">
              <div class="past-guess-color color-${code[0]}" data-id = "${
    pastGuesses.length - 1
  }"data-color = "${code[0]}"></div>
              <div class="past-guess-color color-${code[1]}" data-id = "${
    pastGuesses.length - 1
  }"data-color = "${code[1]}"></div>
              <div class="past-guess-color color-${code[2]}" data-id = "${
    pastGuesses.length - 1
  }"data-color = "${code[2]}"></div>
              <div class="past-guess-color color-${code[3]}" data-id = "${
    pastGuesses.length - 1
  }"data-color = "${code[3]}"></div>
          </div>
      </div>


</div>`;
  pastGuessesContainer.insertAdjacentHTML("afterbegin", html);
};
//Function that will check the guess, some some actions but ultimately will will return true or false based on whether the user got the code right or not
const checkGuess = function (guess, code) {
  let rightColorWrongSpot = 0;
  let rightColorRightSpot = 0;
  let wrongColor = 0;
  try {
    if (guessesLeft < 1)
      throw new Error(
        `Error: No guesses remaining. To start over, click the "Start Over" button`
      );
    if (playerWon)
      throw new Error(
        'You have already guessed the code! Please click the "Start Over" button to play again!'
      );
    if (guess.includes("_"))
      throw new Error("Error: Some guesses have not been assigned a color");
    if (
      pastGuesses.some(
        (pastGuess) => pastGuess.guess.join("") === guess.join("")
      )
    )
      throw new Error("Error : Sequence has already been guessed");
    if (new Set(guess).size < 4)
      throw new Error("Error: No duplicate colors allowed");
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
      pastGuesses[pastGuesses.length - 1].renderHintBox();
      guessesLeft--; //MOVE TO DIFFERENT FUNCTION AFTERWARDS
      if (guessesLeft < 1) {
        throw new Error(
          `Sorry, you have run out of guesses! The correct guess was:`
        );
      }
      guess.fill("_");
      document
        .querySelectorAll(".color-guess")
        .forEach((el) => (el.style.backgroundColor = "white"));
    } else {
      successContainer.classList.remove("deleted");
      successContainer.querySelector(".message-text").textContent =
        'You guessed the code! Congratulations! If you want to play again, click the "Start Over" button!';
      playerWon = true;
      hintElementContainer.classList.add("deleted");
      renderCorrectGuess();
    }
  } catch (err) {
    successContainer.classList.add("deleted");
    // document.querySelector('.header-mastermind').style.marginBotton = '12.8rem'
    errorContainer.classList.remove("deleted");
    hintElementContainer.classList.add("deleted");
    errorContainer.querySelector(".message-text").textContent = err.message;
    if (
      err.message.startsWith("Sorry,") &&
      !errorContainer.querySelector(".error-black-box")
    ) {
      document.querySelector(".message-box").insertAdjacentHTML(
        "beforeend",
        `<div class="black-box-code error-black-box">
      <div class="past-guess-colors">
          <div class="past-guess-color color-${code[0]}" data-color="${code[0]}" ></div>
          <div class="past-guess-color color-${code[1]}" data-color="${code[1]}" ></div>
          <div class="past-guess-color color-${code[2]}" data-color="${code[2]}" ></div>
          <div class="past-guess-color color-${code[3]}" data-color="${code[3]}" ></div>
      </div></div>`
      );
    } else {
      document.querySelector(".error-black-box")?.remove();
    }
  }
};
//Function to reset the page and start a new game with a new code
const resetPage = function () {
  pastGuessesContainer.innerHTML = "";
  pastGuesses = [];
  guess.fill("_");
  document
    .querySelectorAll(".color-guess")
    .forEach((el) => (el.style.backgroundColor = "white"));
  guessesLeft = 10;
  errorContainer.classList.add("deleted");
  successContainer.classList.add("deleted");
  hintElementContainer.classList.add("deleted");

  playerWon = false;
  const uniqueCode = new Set();
  while (uniqueCode.size < 4) {
    uniqueCode.add(colors[Math.floor(Math.random() * colors.length)]);
  }
  code.forEach((_, i) => (code[i] = [...uniqueCode][i]));
};
const submitInit = function () {
  submitBtn.addEventListener("click", checkGuess.bind(null, guess, code)); //PUT INTO FUNCTION LATER
};
const resetInit = function () {
  resetBtn.addEventListener("click", resetPage);
};
//Call the functions
submitInit();
resetInit();
