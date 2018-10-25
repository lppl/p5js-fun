class Alien {
  constructor(x, y, w = 40, h = 20) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.life = 2;
    this.speed = 2;
  }

  update() {
    this.x += this.speed;
  }

  shiftDown() {
    this.y += this.h * 1.5;
    this.speed *= -1;
  }

  show() {
    fill('white');
    ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
  }
}
