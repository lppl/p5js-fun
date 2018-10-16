const on = true;
const off = false;

let n = 0;
const display = new SegmentDisplay(10, 80);
function setup() {
  createCanvas(display.width * 3 + 10, display.height + 10);
  frameRate(10);

  background("darkslategray");
  fill("whitesmoke");
  noStroke();

  display.print(n++)
}

function draw() {
  background("darkslategray");

  for (let [i, s] of n.toString().split('').entries()) {
    display.print(s, (3 - n.toString().length + i) * (display.width + 5), 5)
  }
  n += 1;
  if (n > 999) {
    n = 0;
  }
}
