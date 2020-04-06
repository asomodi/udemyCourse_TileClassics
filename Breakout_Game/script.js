var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

var canvas, canvasContext;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  this.setInterval(updateAll, 1000 / framesPerSecond);
};

function updateAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    ballSpeedX *= -1;
  }
  if (ballX > canvas.width) {
    ballSpeedX *= -1;
  }
  if (ballY < 0) {
    ballSpeedY *= -1;
  }
  if (ballY > canvas.height) {
    ballSpeedY *= -1;
  }

  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = 'white';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
}
