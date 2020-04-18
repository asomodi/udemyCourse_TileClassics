var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

// prettier-ignore
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  /* // cheat / hack to test ball in any position
  ballX = mouseX;
  ballY = mouseY;
  ballSpeedX = 4;
  ballSpeedY = -4;
  */
}

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);

  ballReset();
};

function updateAll() {
  moveAll();
  drawAll();
}

function ballReset() {
  for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] == 2) {
        trackGrid[arrayIndex] = 0;
        ballX = eachCol * TRACK_W + TRACK_W / 2;
        ballY = eachRow * TRACK_H + +TRACK_H / 2;
      }
    }
  }
}

function ballMove() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0 && ballSpeedX < 0.0) {
    // left
    ballSpeedX *= -1;
  }
  if (ballX > canvas.width && ballSpeedX > 0.0) {
    // right
    ballSpeedX *= -1;
  }
  if (ballY < 0 && ballSpeedY < 0.0) {
    // top
    ballSpeedY *= -1;
  }
  if (ballY > canvas.height) {
    // bottom
    ballReset();
    trackReset();
  }
}

// fix bug with hitting bottom tracks
function isTrackAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);

    return trackGrid[trackIndexUnderCoord] == 1;
  } else {
    return false;
  }
}

function ballTrackHandling() {
  var ballTrackCol = Math.floor(ballX / TRACK_W);
  var ballTrackRow = Math.floor(ballY / TRACK_H);
  var trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);

  if (
    ballTrackCol >= 0 &&
    ballTrackCol < TRACK_COLS &&
    ballTrackRow >= 0 &&
    ballTrackRow < TRACK_ROWS
  ) {
    if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {
      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevTrackCol = Math.floor(prevBallX / TRACK_W);
      var prevTrackRow = Math.floor(prevBallY / TRACK_H);

      var bothTestsFailed = true;

      if (prevTrackCol != ballTrackCol) {
        if (isTrackAtColRow(prevTrackCol, ballTrackRow) == false) {
          ballSpeedX *= -1;
          bothTestsFailed = false;
        }
      }
      if (prevTrackRow != ballTrackRow) {
        if (isTrackAtColRow(ballTrackCol, prevTrackRow) == false) {
          ballSpeedY *= -1;
          bothTestsFailed = false;
        }
      }

      if (bothTestsFailed) {
        // armpit case, prevents ball from going through
        ballSpeedX *= -1;
        ballSpeedY *= -1;
      }
    } // end of track found
  } // end of valid col and row
} // end of ballTrackHandling function

function moveAll() {
  // ballMove();
  ballTrackHandling();
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}

function drawTracks() {
  for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex] == 1) {
        colorRect(
          TRACK_W * eachCol,
          TRACK_H * eachRow,
          TRACK_W - TRACK_GAP,
          TRACK_H - TRACK_GAP,
          'blue'
        );
      } // end of is this track here
    } // end of for each track
  }
} // end of drawTracks func

function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); // clear screen
  colorCircle(ballX, ballY, 10, 'white'); // draw ball

  drawTracks();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}
