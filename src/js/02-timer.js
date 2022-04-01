import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
};

let timeLeft;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finalTimeCalc(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', updateInterface);

function finalTimeCalc([finalTime]) {
  // Cacl how much time left for timer
  timeLeft = finalTime - Date.now();

  if (timeLeft <= 0) {
    alert('Please choose a date in the future');
    return;
  }
}

function updateInterface() {
  // Update  timer interface
  refs.timer.insertAdjacentHTML('beforebegin', `<p class="timer-title">Putin must die :)</p>`);

  setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = minutes;
    refs.secs.textContent = seconds;

    timeLeft -= 1000;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  // Adds 0 if the string is less than two characters
  return String(value).padStart(2, '0');
}
