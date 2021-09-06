/* eslint "ecmaVersion": 6 */
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

let requestID;

/**
 * @name move
 * @description supposedly moves the target object
 *
 */
function move() {
  const target = document.getElementById('target');
  target.style.transform = 'translate(0,10)';
  requestID = requestAnimationFrame(move);
};

startBtn.addEventListener('click', function(e) {
  e.preventDefault();
  requestID = requestAnimationFrame(move);
}, false)

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  cancelAnimationFrame(requestID);

}, false);

move();

