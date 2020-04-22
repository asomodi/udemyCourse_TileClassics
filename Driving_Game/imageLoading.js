var carPic = document.createElement('img');
var carPicLoaded = false;

var wallPic = document.createElement('img');
var roadPic = document.createElement('img');

function carImageLoad() {
  carPic.onload = function () {
    carPicLoaded = true;
  };
  carPic.src = 'player1car.png';
}

function trackLoadImages() {
  roadPic.src = 'track_road.png';
  wallPic.src = 'track_wall.png';
}

function loadImages() {
  carImageLoad();
  trackLoadImages();
}
