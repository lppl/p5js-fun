let ship,
  aliens = [],
  bullets = [],
  edge = false,
  loose = false;

function setup() {
  createCanvas(600, 400);

  ship = new Ship(width / 2);

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
      aliens.push(new Alien(i * 50, j * 40));
    }
  }
}

function draw() {
  background(51);
  ship.show();

  for (let bullet of bullets) {
    bullet.update();
    bullet.show();

    if (bullet.y < 0) {
      removeBullet(bullet);
    }
  }

  for (let alien of aliens) {
    alien.update();
    if (alien.x < 0 || alien.x > width - 40) {
      edge = true;
    }

    if (alien.y > height - 30) {
      loose = true;
    }
  }

  for (let alien of aliens) {
    if (edge) {
      alien.shiftDown();
    }

    alien.show();
    for (let bullet of bullets) {
      if (bullet.hits(alien)) {
        bullet.hit(alien);
        removeBullet(bullet);
        removeAlien(alien);
      }
    }
  }

  if (aliens.length === 0) {
    alert('You win :D !!!');
    noLoop();
  }

  if (loose) {
    alert('You loose :(');
    noLoop();
  }

  edge = false;
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      ship.right();
      break;
    case LEFT_ARROW:
      ship.left();
      break;
    case UP_ARROW:
      ship.fire(bullets);
      break;
  }
}

function removeAlien(alien) {
  if (alien.life <= 0) {
    aliens = aliens.filter(i => i !== alien);
  }
}

function removeBullet(bullet) {
  bullets = bullets.filter(b => b !== bullet);
}
