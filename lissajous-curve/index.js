const { cos, floor, PI, sin } = Math;
const TWO_PI = 2 * PI;

class Lissajous {
  constructor(
    size = 100,
    width = window.innerWidth,
    height = window.innerHeight,
    cols = floor(width / size),
    rows = floor(height / size)
  ) {
    this.size = size;
    this.width = width;
    this.height = height;
    this.cols = cols;
    this.rows = rows;

    this.angle = 0;
    this.delta_angle = 0.01;
    this.displayLines = true;

    this.curves = [];
  }
}

const app = new Lissajous();

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
    const x = this.r * sin(app.angle * this.a) + this.x;
    const y = this.r * cos(app.angle * this.b) + this.y;

    layer.ellipse(x, y, 5);

    if (this.showY && app.displayLines) {
      layer.line(0, y, app.width, y);
    }
    if (this.showX && app.displayLines) {
      layer.line(x, 0, x, app.height);
    }
  }

  updateCurves(layer) {
    const x = this.r * sin(app.angle * this.a) + this.x;
    const y = this.r * cos(app.angle * this.b) + this.y;

    layer.line(this.lastx, this.lasty, x, y);

    this.lastx = x;
    this.lasty = y;
  }
}

for (let i = 1; i < app.cols; i++) {
  app.curves.push(new Curve(i, i, i * app.size, 0, app.size - 6, true, false));

  for (let j = 1; j < app.rows; j++) {
    if (i === 1) {
      app.curves.push(
        new Curve(j, j, 0, j * app.size, app.size - 6, false, true)
      );
    }
    app.curves.push(new Curve(i, j, i * app.size, j * app.size, app.size - 6));
  }
}

const balls = new p5(BallLayer, byId("balls"));
const curves = new p5(CurveLayer, byId("curves"));

setInterval(() => {
  if (app.angle > TWO_PI) {
    balls.noLoop();
    curves.noLoop();
  }
  app.angle += app.delta_angle;
}, 1000 / 60);

window.addEventListener("keypress", e => {
  if (e.key === " ") {
    app.delta_angle = 0;
  }
});
window.addEventListener("keyup", e => {
  if (e.key === " ") {
    app.delta_angle = 0.002;
  }
  if (e.key === "Shift") {
    app.displayLines = true;
  }
});

window.addEventListener("keydown", e => {
  if (e.key === "Shift") {
    app.displayLines = false;
  }

  if (e.key === "Escape") {
    app.angle = 0;
    balls.loop();
    curves.loop();
    curves.background("darkslategray");
    for (let curve of app.curves) {
      curve.reset();
    }
  }
});

function byId(id) {
  return document.getElementById(id);
}

function BallLayer(s) {
  s.setup = () => {
    s.createCanvas(app.width, app.height);
  };

  s.draw = () => {
    s.clear();
    s.fill("white");
    s.stroke("whitesmoke");
    s.strokeWeight(0.1);
    for (curve of app.curves) {
      curve.updateBalls(s);
    }
  };
}

function CurveLayer(s) {
  s.setup = () => {
    s.createCanvas(app.width, app.height);
    s.background("darkslategray");
  };

  s.draw = () => {
    s.fill("white");
    s.stroke("white");
    s.strokeWeight(1);
    for (curve of app.curves) {
      curve.updateCurves(s);
    }
  };
}
