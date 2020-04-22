var carPic = document.createElement('img');
var wallPic = document.createElement('img');
var roadPic = document.createElement('img');

var picsToLoad = 3;

function countLoadedImagesAndLAunchIfReady() {
  picsToLoad--;
  // console.log(picsToLoad);
  if (picsToLoad == 0) {
    imageLoadingDoneSoStartGame();
  }
}

function carImageLoad() {
  carPic.onload = countLoadedImagesAndLAunchIfReady;
  carPic.src = 'player1car.png';
}

function trackLoadImages() {
  roadPic.onload = countLoadedImagesAndLAunchIfReady;
  wallPic.onload = countLoadedImagesAndLAunchIfReady;
  roadPic.src = 'track_road.png';
  wallPic.src = 'track_wall.png';
}

function loadImages() {
  carImageLoad();
  trackLoadImages();
}
