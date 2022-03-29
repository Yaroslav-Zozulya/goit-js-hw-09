refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.start.addEventListener('click', backgroundColorChanger);
refs.stop.addEventListener('click', stopBackgroundColorChanger);

function backgroundColorChanger() {
  refs.start.setAttribute('disabled', '');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopBackgroundColorChanger() {
  refs.start.removeAttribute('disabled');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
