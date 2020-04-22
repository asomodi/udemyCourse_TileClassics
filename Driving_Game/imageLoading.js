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

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLAunchIfReady;
  imgVar.src = fileName;
}

function loadImages() {
  beginLoadingImage(carPic, 'player1car.png');
  beginLoadingImage(roadPic, 'track_road.png');
  beginLoadingImage(wallPic, 'track_wall.png');
}
