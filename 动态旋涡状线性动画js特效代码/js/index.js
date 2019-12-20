var ticker = void 0;
var positions = void 0;
var nrOfCircles = void 0;

function setup() {
  noFill();
  ticker = 0;
  positions = [];
  nrOfCircles = 200;
  for (var i = 0; i < nrOfCircles; i++) {
    addPosition();
  }
  createCanvas(windowWidth, windowHeight);
}

function addPosition() {
  var pos = getPosition();
  positions.unshift(pos);
  ticker += 0.01;
}

function getPosition() {
  var xOffset = (noise(ticker) - 0.5) * windowWidth * 0.5;
  var yOffset = (noise(ticker + 1000) - 0.5) * windowHeight * 0.5;
  return [xOffset, yOffset];
}

function draw() {
  clear();
  strokeWeight(1);
  translate(windowWidth / 2, windowHeight / 2);
  var m = max(windowWidth, windowHeight) * 1.8;
  var stepSize = m / nrOfCircles;
  var r = 1;
  positions.forEach(function (p) {
    ellipse(p[0], p[1], r, r);
    r += stepSize;
  });
  addPosition();
  positions.pop();
}

function drawCircle() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}