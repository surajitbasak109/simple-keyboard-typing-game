// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  'Push yourself, because no one else is going to do it for you.',
  'Failure is the condiment that gives success its flavor.',
  'Wake up with determination. Go to bed with satisfaction.',
  "It's going to be hard, but hard does not mean impossible.",
  'Learning never exhausts the mind.',
  'The only way to do great work is to love what you do.',
];

// select required elements
let wpm_text = document.querySelector('.curr_wpm');
let cpm_text = document.querySelector('.curr_cpm');
let error_text = document.querySelector('.curr_errors');
let timer_text = document.querySelector('.curr_time');
let accuracy_text = document.querySelector('.curr_accuracy');
let wpm_group = document.querySelector('.wpm');
let cpm_group = document.querySelector('.cpm');
let error_group = document.querySelector('.errors');
let accuracy_group = document.querySelector('.accuracy');
let quote_text = document.querySelector('.quote');
let input_area = document.querySelector('.input_area');
let restart_btn = document.querySelector('.restart_btn');

// define initial variables
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = '';
let quoteNo = 0;
let timer = null;

function updateQuote() {
  // 1) reset quote text
  quote_text.textContent = null;
  // 2) get quote from the quote array
  current_quote = quotes_array[quoteNo];
  // 3) separate each character and make an element
  // out of each of them to individually style them
  current_quote.split('').forEach((char) => {
    const charSpan = document.createElement('span');
    charSpan.textContent = char;
    quote_text.appendChild(charSpan);
  });
  // 4) roll over to the first quote
  if (quoteNo < quotes_array.length - 1) {
    quoteNo++;
  } else {
    quoteNo = 0;
  }
}

function processCurrentText() {
  // 1) get input values and split it
  let current_input = input_area.value;
  let current_input_array = current_input.split('');

  // 2) increment charactes typed
  characterTyped++;

  // 3) set the errors to 0
  errors = 0;

  // 4) get all the quote spans
  let quoteSpanArray = quote_text.querySelectorAll('span');

  // 4) loop through all the quote spans
  quoteSpanArray.forEach((char, index) => {
    let typedChar = current_input_array[index];

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');
    }
    // correct characters
    else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
    }
    // incorrect characters
    else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
      errors++;
    }
  });

  // 5) show total errors
  error_text.textContent = total_errors + errors;

  // 6) calculate accuracy in percentage
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;

  // 7) show accuracy
  accuracy_text.textContent = Math.round(accuracyVal);

  // 8) if current text is completely typed
  // irrespective of errors
  if (current_input.length === current_quote.length) {
    // update new quote
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear input field
    input_area.value = '';
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the timer
    timeLeft--;

    // increase time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + 's';
  } else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // 1) reset timer
  clearInterval(timer);

  // 2) disable input area
  input_area.disabled = true;

  // 3) show finishing text
  quote_text.textContent = 'Click on restart button to start typing.';

  // 4) display restart button
  restart_btn.style.display = 'block';

  // 5) calculate cpm and wpm
  let cpm = Math.round((characterTyped / timeElapsed) * 60);
  let wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  // 6) update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // 7) display cpm and wpm
  cpm_group.style.display = 'block';
  wpm_group.style.display = 'block';
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  total_errors = 0;
  errors = 0;
  accuracy = 0;
  characterTyped = 0;
  current_quote = '';
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = '';
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = 'none';
  cpm_group.style.display - 'none';
  wpm_group.style.display - 'none';
}

function startGame() {
  resetValues();
  updateQuote();

  // 1) clear old and update the timer
  clearInterval(timer);
  let user_typed = false;
  input_area.addEventListener('input', function () {
    if (!user_typed) {
      timer = setInterval(updateTimer, 1000);
      user_typed = true;
    }
  });
}
