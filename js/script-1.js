//for find typing text div
const typingText = document.querySelector(".typing_text p"),
  inpField = document.querySelector(".input-field"),
  timeTag = document.querySelector(".timer p span"),
  accuracyTag = document.querySelector(".accuracy span b"),
  wpmTag = document.querySelector(".Wpm span b"),
  resetbtn = document.querySelector("button");

let charIndex = 0,
  mistake = 0,
  time = 0,
  max_time = 60,
  left_time = max_time,
  isTyping = false;

function randomParagraphs() {
  //for writing the paragraph in spilt form (one one word ) in p tag
  paragraphs[0].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  //for chack paragraph word
  const characters = typingText.querySelectorAll("span");

  //focus on the input when key press
  document.addEventListener("keydown", () => inpField.focus());
}

function initTyping() {
  //time
  if (!isTyping) {
    //it will start only first time user type
    time = setInterval(initTimer, 1000);
    isTyping = true;
  }

  //for chack typed word
  let typeChar = inpField.value.split("")[charIndex];
  //chack if Esc pressed
  if (typeChar == null) {
    charIndex--;
    //romove accuracy
    if (characters[charIndex].classList.contains("incorrect")) {
      mistake--;
    }
    //highligth
    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    //chack if type charactor is same or not
    if (characters[charIndex].innerText === typeChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistake++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }
  //to show accuracy
  accuracyTag.innerText = Math.round(((charIndex - mistake) / charIndex) * 100);
  //to show active place on paragraph
  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  let wpm = Math.round(
    ((charIndex - mistake) / 4.7 / (max_time - left_time)) * 60
  );
  //if value less then 0 or null or infinty it set it to 0
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  wpmTag.innerText = wpm;
}

//for time conuting
function initTimer() {
  if (left_time > 0) {
    left_time--;
    timeTag.innerText = left_time;
  } else {
    clearInterval(time);
  }
}

function resettext() {
  paragraphs[0].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  document.addEventListener("keydown", () => inpField.focus());
  //show reset value
  charIndex = 0;

  left_time = 60;
  timeTag.innerText = "60";
  wpm = 0;
  wpmTag.innerText = "0";
  mistake = 0;
  accuracyTag.innerText = "100";
  let word_intext = document.querySelectorAll(".correct");
  word_intext.forEach((span) => span.classList.remove("correct"));
  word_intext = document.querySelectorAll(".incorrect");
  word_intext.forEach((span) => span.classList.remove("incorrect"));
}

randomParagraphs();
//chack the input
inpField.addEventListener("input", initTyping);
resetbtn.addEventListener("click", resettext);
