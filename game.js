// define time limit
let TIME_LIMIT = 60;

// define quotes array
const quotes_array = [
  `'mI selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.`,
  `Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.`,
  `A room without books is like a body without a soul.`,
  `If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.`,
  `I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.`,
];

// select html elements
let wpm_text = document.querySelector('.curr_wpm');
let cpm_text = document.querySelector('.curr_cpm');
let errors_text = document.querySelector('.curr_errors');
let timer_text = document.querySelector('.curr_time');
let accuracy_text = document.querySelector('.curr_accuracy');
let wpm_group = document.querySelector('.wpm');
let cpm_group = document.querySelector('.cpm');
let quote_text = document.querySelector('.quote');
let input_area = document.querySelector('.input_area');
let restart_btn = document.querySelector('.restart_btn');

// define initial variables
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let curr_qoute = '';
let quoteNo = 0;
let timer = null;
let characterTyped = 0;
let accuracy = 0;

const updateQuotes = () => {
  // remove previous text
  quote_text.textContent = null;
  // get the current quote
  curr_qoute = quotes_array[quoteNo];

  // separate each characters and make them element
  // so that we can style them
  curr_qoute.split('').forEach((char) => {
    // create a span
    let charSpan = document.createElement('span');
    charSpan.textContent = char;
    quote_text.appendChild(charSpan);
  });

  // roll over to the zero index, first array element
  if (quoteNo < quotes_array.length - 1) {
    quoteNo++;
  } else {
    quoteNo = 0;
  }
};

const processCurrentInput = () => {
  // get current input
  let curr_input = input_area.value;
  let curr_input_array = curr_input.split('');

  // increment typed characters
  characterTyped++;
  // set the errors to zero
  errors = 0;

  let charSpanArray = quote_text.querySelectorAll('span');

  // loop through the span elements
  charSpanArray.forEach((char, index) => {
    // get the typed character
    let typedChar = curr_input_array[index];

    // character currenlty not typed
    if (typedChar == null) {
      // remove all the incorrect_char and correct_char class
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');
    }
    // correct character
    else if (typedChar === char.innerText) {
      // add correct_char and remove incorrect_char class
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
    }

    // incorrect character
    else {
      // add incorrect_char and remove correct_char class
      char.classList.remove('correct_char');
      char.classList.add('incorrect_char');

      // increment errors
      errors++;
    }
  });

  // update errors text
  errors_text.textContent = total_errors + errors;

  // calculate accuracy
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = Math.round((correctCharacters / characterTyped) * 100);

  // udpate the accuracy text
  accuracy_text.textContent = accuracyVal;

  // if user typed all the text in quote text
  // irrespective to all the errors
  if (curr_input.length == curr_qoute.length) {
    // udpate next quote
    updateQuotes();

    // clear the values
    input_area.value = '';

    // increment total errors
    total_errors += errors;
  }
};

const updateTimer = () => {
  if (timeLeft > 0) {
    // decrement time left
    timeLeft--;

    // increment time elapsed
    timeElapsed++;

    timer_text.textContent = timeLeft + 's';
  } else {
    finishGame();
  }
};

const finishGame = () => {
  // reset the timer
  clearInterval(timer);

  // disable the input field
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = 'Click on restart to start the game.';

  // display restart button
  restart_btn.style.display = 'block';

  // calculate cpm and wpm
  let cpm = Math.floor((characterTyped / timeElapsed) * 60);
  let wpm = Math.floor((characterTyped / 5 / timeElapsed) * 60);

  // udpate cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display wpm and cpm
  wpm_group.style.display = 'block';
  cpm_group.style.display = 'block';
};

const resetValues = () => {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  total_errors = 0;
  errors = 0;
  quoteNo = 0;
  timer = null;
  characterTyped = 0;
  accuracy = 0;

  // enable the input area
  input_area.value = '';
  input_area.disabled = false;

  // update quote text
  quote_text.textContent = 'Click below the area to start the game.';

  accuracy_text.textContent = 100;
  errors_text.textContent = 0;
  timer_text.textContent = timeLeft + 's';

  restart_btn.style.display = 'none';

  wpm_group.style.display = 'none';
  cpm_group.style.display = 'none';
};

const startGame = () => {
  updateQuotes();

  clearInterval(timer);
  let user_typed = false;

  input_area.addEventListener('input', () => {
    if (!user_typed) {
      timer = setInterval(updateTimer, 1000);
      user_typed = true;
    }
  });
};
