const { cos, floor, min, PI, sin } = Math;
const TWO_PI = 2 * PI;

const size = 100;
const width = window.innerWidth;
const height = window.innerHeight;
const cols = floor(width / size);
const rows = floor(height / size);
const curvesList = [];

let displayLines = true;

let angle = 0;
let delta_angle = 0.002;

class Curve {
  constructor(a, b, x, y, size, showX = true, showY = true) {
    this.size = size;
    this.r = floor(size / 2);

    this.a = a + 1;
    this.b = b + 1;
    this.x = x + this.r;
    this.y = y + this.r;

    this.lastx = x + this.r;
    this.lasty = y + this.size;

    this.showX = showX;
    this.showY = showY;
  }

  reset() {
    this.lastx = this.x;
    this.lasty = this.y + this.r;
  }

  updateBalls(layer) {
    const x = this.r * sin(angle * this.a) + this.x;
    const y = this.r * cos(angle * this.b) + this.y;

    layer.ellipse(x, y, 5);

    if (this.showY && displayLines) {
      layer.line(0, y, width, y);
    }
    if (this.showX && displayLines) {
      layer.line(x, 0, x, height);
    }
  }

  updateCurves(layer) {
    const x = this.r * sin(angle * this.a) + this.x;
    const y = this.r * cos(angle * this.b) + this.y;

    layer.line(this.lastx, this.lasty, x, y);

    this.lastx = x;
    this.lasty = y;
  }
}

for (let i = 1; i < cols; i++) {
  curvesList.push(new Curve(i, i, i * size, 0, size - 6, true, false));

  for (let j = 1; j < rows; j++) {
    if (i === 1) {
      curvesList.push(new Curve(j, j, 0, j * size, size - 6, false, true));
    }
    curvesList.push(new Curve(i, j, i * size, j * size, size - 6));
  }
}

const balls = new p5(BallLayer, byId("balls"));
const curves = new p5(CurveLayer, byId("curves"));

setInterval(() => {
  if (angle > TWO_PI) {
    balls.noLoop();
    curves.noLoop();
  }
  angle += delta_angle;
}, 1000 / 60);

window.addEventListener("keypress", e => {
  if (e.key === " ") {
    delta_angle = 0;
  }
});
window.addEventListener("keyup", e => {
  if (e.key === " ") {
    delta_angle = 0.002;
  }
  if (e.key === "Shift") {
    displayLines = true;
  }
});

window.addEventListener("keydown", e => {
  if (e.key === "Shift") {
    displayLines = false;
  }

  if (e.key === "Escape") {
    angle = 0;
    balls.loop();
    curves.loop();
    curves.background("darkslategray");
    for (let curve of curvesList) {
      curve.reset();
    }
  }
});

function byId(id) {
  return document.getElementById(id);
}

function BallLayer(s) {
  s.setup = () => {
    s.createCanvas(width, height);
  };

  s.draw = () => {
    s.clear();
    s.fill("white");
    s.stroke("whitesmoke");
    s.strokeWeight(0.1);
    for (curve of curvesList) {
      curve.updateBalls(s);
    }
  };
}

function CurveLayer(s) {
  s.setup = () => {
    s.createCanvas(width, height);
    s.background("darkslategray");
  };

  s.draw = () => {
    s.fill("white");
    s.stroke("white");
    s.strokeWeight(1);
    for (curve of curvesList) {
      curve.updateCurves(s);
    }
  };
}
