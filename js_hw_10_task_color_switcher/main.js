const colors = [
  'red',
  'green',
  'violet',
  'gray',
  'blue',
  'yellow',
];

const refs = {
  body: document.querySelector("body"),
  start: document.querySelector('button[data-action="start"]'),
  stop: document.querySelector('button[data-action="stop"]')
}

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let intervalId;

const colorSwitch = () => {
  let color = randomIntegerFromInterval(0, colors.length - 1);
  refs.body.style.background = colors[color];
}

const startSwitch = () => {
  refs.start.disabled = true;
  intervalId = setInterval(colorSwitch, 1000);
}

const stopSwitch = () => {
  clearInterval(intervalId);
  refs.start.disabled = false;
}

refs.start.addEventListener('click', startSwitch);
refs.stop.addEventListener('click', stopSwitch);
