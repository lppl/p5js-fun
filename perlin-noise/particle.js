class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.lastPos = createVector(x+1, y+1);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
  }

  update() {
    this.lastPos = createVector(this.pos.x, this.pos.y);
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxspeed);

    //if(this.vel.x > 0 && (this.pos.x === this.lastPos.x)) {
    //  console.log(this.lastPos)
    //  console.log(this.pos)
    //  console.log(this.pos.add(this.vel))
    //  throw Error();
    //}
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(10, 20);
    strokeWeight(1);
    if (this.pos.dist(this.lastPos) <= this.maxspeed + 1) {
      line(this.pos.x, this.pos.y, this.lastPos.x, this.lastPos.y);
    }
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x -= width;
    }
    if (this.pos.x < 0) {
      this.pos.x += width;
    }
    if (this.pos.y > height) {
      this.pos.y -= width;
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
    }
  }

  follow(vector) {
    this.applyForce(vector.mult(1));
  }
}
