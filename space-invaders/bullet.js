class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y -= 10;
  }

  show() {
    fill('white');
    ellipse(this.x, this.y, 4, 10);
  }

  hits(alien) {
    if (this.x >= alien.x && this.x <= alien.x + 40) {
      if (this.y >= alien.y && this.y <= alien.y + 40) {
        return true;
      }
    }
  }

  hit(alien) {
    alien.life -= 1;
  }
}
