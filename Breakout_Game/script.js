var canvas, canvasContext;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = 'white';
  canvasContext.beginPath();
  canvasContext.arc(100, 100, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
};
