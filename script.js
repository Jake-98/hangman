const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

//add fetch api to word database
const words = [
  "abruptly",
  "absurd",
  "abyss",
  "alligator",
  "askew",
  "avenue",
  "awkward",
  "axiom",
  "bagpipes",
  "bandwagon",
  "banjo",
  "bayou",
  "beekeeper",
  "blizzard",
  "boggle",
  "bookworm",
  "boxcar",
  "buffalo",
  "buzzing",
  "cobweb",
  "crypt",
  "cycle",
  "dirndl",
  "disavow",
  "duplex",
  "dwarves",
  "embezzle",
  "equip",
  "espionage",
  "exodus",
  "faking",
  "fishhook",
  "fixable",
  "flopping",
  "fluffiness",
  "funny",
  "galaxy",
  "galvanize",
  "gazebo",
  "guitar",
  "gossip",
  "gnarly",
  "grogginess",
  "haiku",
  "haphazard",
  "hyphen",
  "icebox",
  "injury",
  "ivory",
  "ignite",
  "jackpot",
  "jaundice",
  "jawbreaker",
  "jaywalk",
  "jelly",
  "jigsaw",
  "jockey",
  "jogging",
  "joking",
  "joyful",
  "juicy",
  "jukebox",
  "jumbo",
  "kayak",
  "keyhole",
  "khaki",
  "kiosk",
  "knapsack",
  "larynx",
  "lengths",
  "lucky",
  "luxury",
  "matrix",
  "mother",
  "microwave",
  "mystify",
  "nightclub",
  "oxidize",
  "oxygen",
  "pajama",
  "pixel",
  "pneumonia",
  "polka",
  "puppy",
  "puzzling",
  "quartz",
  "queue",
  "quiz",
  "quizzes",
  "rhubarb",
  "rhythm",
  "scratch",
  "snazzy",
  "squawk",
  "staff",
  "strength",
  "stretch",
  "subway",
  "swivel",
  "syndrome",
  "transcript",
  "transplant",
  "twenty",
  "unknown",
  "unworthy",
  "universe",
  "vaporize",
  "vortex",
  "waltz",
  "wave",
  "whomever",
  "water",
  "wizard",
  "wristwatch",
  "xylophone",
  "yacht",
  "yellow",
  "youthful",
  "zebra",
  "zigzag",
  "zipper",
  "zodiac",
  "zombie",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
      )
      .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "YOU WON! ✅";
    popup.style.display = "flex";
  }
}

// Update wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong Letters</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;

    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "YOU LOSE! ❌ ";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Play again button
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
