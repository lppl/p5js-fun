class Drop {
  constructor(x, y, z) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, z);
    this.acc = createVector(0, 0.1);
    this.z = z;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);

    if (this.pos.y > height) {
      this.pos.y = random(-100, -400);
      this.vel = createVector(0, this.z);
    }
  }

  show() {
    stroke(138, 43, 226);
    strokeWeight(this.z / 4);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.z * 1.5);
  }
}
