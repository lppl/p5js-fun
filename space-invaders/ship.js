class Ship {
  constructor(x) {
    this.x = x;
    this.speed = 20;
  }

  show() {
    fill('white');
    rect(this.x, height - 20, 40, 20);
  }

  left() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  right() {
    this.x += this.speed;
    if (this.x > width - 40) {
      this.x = width - 40;
    }
  }

  fire(bullets) {
    bullets.push(new Bullet(this.x + 20, height - 20));
  }
}
