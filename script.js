let textOnSite = document.querySelector('#textblock_words');
let inputfield = document.querySelector('#textblock #inputfield');
let radio = document.querySelectorAll('input[name="radio"]');
let reset_btn = document.getElementById('reset_btn');
let popup_reset = document.getElementById('statistic_popup_reset');
let btn_res1 = document.getElementById('statistic_popup');
let btn_res2 = document.getElementById('statistic_popup');
let innerWPM = document.getElementById('statistic_popup_count');
let mistakes_result = document.getElementById('mistakes_result');
let time_result = document.getElementById('time_result');
let statisic_record_ls = document.getElementById('statisic_record_ls');
let averageDataInner = document.getElementById('averageData');
let averageMistakesInner = document.getElementById('averageMistakes');
let output_result = document.getElementById('last_wpm');

let totalArray = [];
if (localStorage.getItem('total_key')) {
  totalArray = JSON.parse(localStorage.getItem('total_key'));
}
let resultArr = [];
if (localStorage.getItem('result_key')) {
  resultArr = JSON.parse(localStorage.getItem('result_key'));
}
if (totalArray.length > 0) {
  let wpm_record = totalArray.reduce((a, b) => (a < b ? b : a));
  statisic_record_ls.innerHTML = wpm_record;
}

if (typeof localStorage.result_key == 'undefined') {
} else {
}
let averageData = [];
if (typeof localStorage.averageData == 'undefined') {
  averageDataInner.innerHTML = '0';
} else {
  averageDataInner.innerHTML = localStorage.getItem('averageData');
}
let mistakesArray = [];
if (localStorage.getItem('mistakesArray')) {
  mistakesArray = JSON.parse(localStorage.getItem('mistakesArray'));
}
if (typeof localStorage.mistakesArray == 'undefined') {
  averageMistakesInner.innerHTML = '0';
} else {
  averageMistakesInner.innerHTML = (
    mistakesArray.map((i) => (j += i), (j = 0)).reverse()[0] / mistakesArray.length
  ).toFixed(2);
}
let result_array_out = resultArr;

for (let i = 0; i < result_array_out.length; i++) {
  result_array_out[i] = '<p>' + result_array_out[i] + '</p>';
}
output_result.innerHTML = result_array_out.join(' ');

timer = 0;
msec = sec = min = 0;
function interval() {
  msec++;
  if (msec % 10 === 0) {
    sec++;
  }
  if (sec === 60) {
    min++;
    sec = 0;
  }
}

result = '';
max_lengh_input = inputfield;
max_lengh_input.oninput = function () {
  this.value = this.value.substr(0, result.length);
};

for (let j = 0; j < radio.length; j++) {
  radio[j].onchange = radiovalue;
}
let i = 25;
let i_stop = i;
async function radiovalue() {
  i = this.value;
  i = Number(i);
  i_stop = i;
  clearInterval(timer);
  input_i = msec = sec = min = 0;
  changeCount();
}

reset_btn.addEventListener('click', function () {
  wpm = 0;
  correct_word = 0;
  input_i = msec = sec = min = 0;
  inputfield.value = '';
  while (letterIndex >= 0) {
    const resetLetter = textOnSite.querySelectorAll('span');
    resetLetter[letterIndex].classList.remove('correct', 'incorrect');
    letterIndex--;
  }
  letterIndex = 0;
  clearInterval(timer);
});
popup_reset.addEventListener('click', function () {
  btn_res1.style.opacity = 0;
  btn_res2.style.visibility = 'hidden';
});

function randomWord() {
  wordsArray = [];
  letter_count = [];

  i_letter = 0;
  while (i-- > 0) {
    let rand = Math.floor(Math.random() * words.length);
    wordsArray.push(words[rand]);
  }
  letter_count = wordsArray.map((i_letter) => {
    return i_letter.length;
  });
  result = wordsArray.join(' ');
  result.split('').forEach((span) => {
    let spanTag = document.createElement('span');
    spanTag.innerHTML = span;
    textOnSite.appendChild(spanTag);
  });
}

document.addEventListener('keydown', () => inputfield.focus());
textOnSite.addEventListener('click', () => inputfield.focus());

let mistakes = (mistakesInWords = letterIndex = b = correct_word = 0);
letter_corect = 1;
function wordsOnSite() {
  const letter = textOnSite.querySelectorAll('span');
  let typedLeter = inputfield.value[letterIndex];
  if (typedLeter == null) {
    letterIndex--;
    letter_corect--;
    if (letter[letterIndex].classList.contains('incorrect')) {
      mistakes--;
      mistakesInWords--;
    }
    letter[letterIndex].classList.remove('correct', 'incorrect');
  }
  if (typedLeter != null) {
    if (letter[letterIndex].innerText === typedLeter) {
      letter[letterIndex].classList.add('correct');
    } else {
      mistakes++;
      mistakesInWords++;
      letter[letterIndex].classList.add('incorrect');
    }
    if (letter_corect === letter_count[b]) {
      if (mistakesInWords > 0) {
        mistakesInWords = 0;
      } else {
        correct_word++;
      }
      letter_corect = -1;
      b++;
    }
    letterIndex_stop = letter_count.map((y) => (x += y), (x = 0)).reverse()[0];
    letterIndex_stop += i_stop - 2;

    if (letterIndex == letterIndex_stop) {
      inputfield.setAttribute('disabled', true);
      wpm = Number(((correct_word * 600) / msec).toFixed(2));
      mistakes_result.innerHTML = ((mistakes * 100) / (letterIndex_stop + 1)).toFixed(2);
      time_result.innerText = sec;
      clearInterval(timer);

      mistakesArray.push(Number(((mistakes * 100) / (letterIndex_stop + 1)).toFixed(2)));
      localStorage.setItem('mistakesArray', JSON.stringify(mistakesArray));
      if (resultArr.length == 4) {
        resultArr.pop();
        resultArr.unshift(wpm);
      } else {
        resultArr.unshift(wpm);
      }

      totalArray.unshift(wpm);

      averageData = (
        totalArray.map((y) => (x += y), (x = 0)).reverse()[0] / totalArray.length
      ).toFixed(2);
      localStorage.setItem('averageData', averageData);
      localStorage.setItem('result_key', JSON.stringify(resultArr));
      localStorage.setItem('total_key', JSON.stringify(totalArray));

      setTimeout(() => {
        btn_res1.style.opacity = 1;
        btn_res2.style.visibility = 'visible';
      }, 200);
    }
    letter_corect++;
    letterIndex++;
  }
  wpm = (correct_word * 600) / msec;
  innerWPM.innerHTML = parseFloat(wpm).toFixed(2);
}

function changeCount() {
  textOnSite.innerHTML = '';
  inputfield.value = '';
  letterIndex = 0;
  randomWord();
}

input_i = 0;
randomWord();
inputfield.addEventListener('input', wordsOnSite);
inputfield.addEventListener('input', function () {
  if (input_i <= 0) {
    timer = setInterval(interval, 100);
  }
  input_i++;
});
