const { floor, PI } = Math;
const TWO_PI = 2 * PI;

import { Curve, BallLayer, CurveLayer } from "./lissajous.js";

class Lissajous {
  constructor(
    size = 100,
    width = window.innerWidth,
    height = window.innerHeight,
    colNum = floor(width / size),
    rowNum = floor(height / size)
  ) {
    this.size = size;
    this.width = width;
    this.height = height;
    this.colNum = colNum;
    this.rowNum = rowNum;

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
    for (let cols = 1; cols < this.colNum; cols++) {
      this.curves.push(
        new Curve(cols, cols, cols * this.size, 0, this.size * .9, true, false)
      );
    }

    for (let rows = 1; rows < this.rowNum; rows++) {
      this.curves.push(
        new Curve(rows, rows, 0, rows * this.size, this.size * .9, false, true)
      );
    }

    for (let a = 1; a < this.colNum; a++) {
      for (let b = 1; b < this.rowNum; b++) {
        this.curves.push(
          new Curve(a, b, a * this.size, b * this.size, this.size * .9)
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
