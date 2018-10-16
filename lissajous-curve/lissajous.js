const { cos, floor, sin } = Math;

export class Curve {
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

  updateBalls(app) {
    const x = this.r * sin(app.angle * this.a) + this.x;
    const y = this.r * cos(app.angle * this.b) + this.y;
    const layer = app.ballsLayer;

    layer.ellipse(x, y, 5);

    if (this.showY && app.displayLines) {
      layer.line(0, y, app.width, y);
    }
    if (this.showX && app.displayLines) {
      layer.line(x, 0, x, app.height);
    }
  }

  updateCurves(app) {
    const x = this.r * sin(app.angle * this.a) + this.x;
    const y = this.r * cos(app.angle * this.b) + this.y;
    const layer = app.curvesLayer;

    layer.line(this.lastx, this.lasty, x, y);

    this.lastx = x;
    this.lasty = y;
  }
}

export function BallLayer(s) {
  s.setup = () => {
    s.createCanvas(s.app.width, s.app.height);
  };

  s.draw = () => {
    s.clear();
    s.fill("white");
    s.stroke("whitesmoke");
    s.strokeWeight(0.1);
    for (let curve of s.app.curves) {
      curve.updateBalls(s.app);
    }
  };
}

export function CurveLayer(s) {
  s.setup = () => {
    s.createCanvas(s.app.width, s.app.height);
    s.background("darkslategray");
  };

  s.draw = () => {
    s.fill("white");
    s.stroke("white");
    s.strokeWeight(1);
    for (let curve of s.app.curves) {
      curve.updateCurves(s.app);
    }
  };
}
