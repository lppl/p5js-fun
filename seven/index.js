const on = true;
const off = false;

let n = 0;
const display = new SegmentDisplay(10, 80);
function setup() {
  createCanvas(display.width, display.height);
  frameRate(1);

  background("darkslategray");
  fill("whitesmoke");
  noStroke();

  display.print(n++)
}

function draw() {
  background("darkslategray");
  display.print(n % 10)
  n += 1;
}
