
let n = 666;

const display = new SegmentDisplay(3, 10, 80, 30);

function setup() {
  createCanvas(display.width, display.height);
  frameRate(1);

  background("darkslategray");
  fill("whitesmoke");
  noStroke();

  display.print(n);
}

function draw() {
  background("darkslategray");

  display.print(Math.max(--n, 0));
}
