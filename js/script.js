const typingText = document.querySelector(".typing_text p"),
  timeTag = document.querySelector(".timer p span"),
  inpField = document.querySelector(".input-field"),
  wpmTag = document.querySelector(".wpm span b"),
  accuracyTag = document.querySelector(".accuracy span b"),
  resetbtn = document.querySelector("button");

let charIndex = 0,
  mistake = 0,
  //max time
  left_time = 60,
  time = 0,
  characters = 0,
  isTyping = false;

//generate a random paragraph and focus on input
randomParagraphs();

//start timing when first input
inpField.addEventListener("input", initTime);

//if word press increade positon / if backspace then decrese position
inpField.addEventListener("input", changeColor);

function randomParagraphs() {
  //if we reset so new paragraph not add to old just replace it
  typingText.innerHTML = "";

  //new paragraph added
  paragraphs[Math.floor(Math.random() * paragraphs.length)]
    .split("")
    .forEach((span) => (typingText.innerHTML += `<span>${span}</span>`));

  //save charactor in random paragraph
  characters = typingText.querySelectorAll("span");

  //focus on input when key press
  document.addEventListener("keydown", () => inpField.focus());
}

function initTime() {
  //for only one time running fuction
  if (!isTyping) {
    //run every 1 sec
    time = setInterval(clock, 1000);

    //it only decrease in one second so this function should only call one time
    isTyping = true;
  }
}

function clock() {
  if (left_time > 0) {
    //decrease time in every 1 sec
    left_time--;

    //show on screen
    timeTag.innerText = left_time;
  } else {
    clearInterval(time);
    typingText.classList.add("remove_ops");
  }
}

function changeColor() {
  //chack what charactor input
  let typedChar = inpField.value.split("")[charIndex];

  //when backspace press do this
  if (typedChar == null && charIndex > 0) {
    //move to back index
    charIndex--;

    //if remove mistake
    if (characters[charIndex].classList.contains("incorrect")) {
      mistake--;
    }

    //remove color when backspace press
    characters[charIndex].classList.remove("correct", "incorrect");
  }

  //when normal word press do this
  else {
    //color change according to right or wrong
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      characters[charIndex].classList.add("incorrect");

      //add mistake
      mistake++;
    }
    //move to next index
    charIndex++;
  }

  //show accuracy
  accuracyTag.innerText = Math.round(((charIndex - mistake) / charIndex) * 100);

  //show Word per second
  let wpm = Math.round(((charIndex - mistake) / 4.7 / (60 - left_time)) * 60);

  //if value less then 0 or null or infinty it set it to 0
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  wpmTag.innerText = wpm;

  //remove active class to all word on paragraph
  characters.forEach((span) => span.classList.remove("active"));

  //add active class to word that have index
  characters[charIndex].classList.add("active");
}

//reset button
resetbtn.addEventListener("click", reset);
function reset() {
  //opacity 100
  typingText.classList.remove("remove_ops");
  //random paragraph
  randomParagraphs();

  //set input value null
  inpField.value = "";

  //reset some value
  charIndex = 0;
  mistake = 0;
  accuracyTag.innerText = "Nah";
  left_time = 60;
  time = 0;
  timeTag.innerText = "60";
  isTyping = false;
  wpm = 0;
  wpmTag.innerText = "Nah";

  //reset colors
  let word_intext = document.querySelectorAll(".correct");
  word_intext.forEach((span) => span.classList.remove("correct"));
  word_intext = document.querySelectorAll(".incorrect");
  word_intext.forEach((span) => span.classList.remove("incorrect"));
}
