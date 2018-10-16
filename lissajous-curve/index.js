const { floor, PI } = Math;
const TWO_PI = 2 * PI;

import { Curve, BallLayer, CurveLayer } from "./lissajous.js";

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

    this.ballsLayer = new p5(BallLayer, byId("balls"));
    this.curvesLayer = new p5(CurveLayer, byId("curves"));

    this.ballsLayer.app = this;
    this.curvesLayer.app = this;
  }

  init() {
    this.setupCurves();
    this.setupEvents();
  }

  setupCurves() {
    for (let i = 1; i < this.cols; i++) {
      this.curves.push(
        new Curve(i, i, i * this.size, 0, this.size - 6, true, false)
      );

      for (let j = 1; j < this.rows; j++) {
        if (i === 1) {
          this.curves.push(
            new Curve(j, j, 0, j * this.size, this.size - 6, false, true)
          );
        }
        this.curves.push(
          new Curve(i, j, i * this.size, j * this.size, this.size - 6)
        );
      }
    }
  }

  setupEvents() {
    setInterval(() => {
      if (this.angle > TWO_PI) {
        this.ballsLayer.noLoop();
        this.curvesLayer.noLoop();
      }
      this.angle += this.delta_angle;
    }, 1000 / 60);

    window.addEventListener("keypress", e => {
      if (e.key === " ") {
        this.delta_angle = 0;
      }
    });

    window.addEventListener("keyup", e => {
      if (e.key === " ") {
        this.delta_angle = 0.002;
      }
      if (e.key === "Shift") {
        this.displayLines = true;
      }
    });

    window.addEventListener("keydown", e => {
      if (e.key === "Shift") {
        this.displayLines = false;
      }

      if (e.key === "Escape") {
        this.angle = 0;
        this.ballsLayer.loop();
        this.curvesLayer.loop();
        this.curvesLayer.background("darkslategray");
        for (let curve of this.curves) {
          curve.reset();
        }
      }
    });
  }
}

const app = new Lissajous();

export default app;

function byId(id) {
  return document.getElementById(id);
}
