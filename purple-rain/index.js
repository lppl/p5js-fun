const width = window.innerWidth;
const height = window.innerHeight;

const drops = [];

function setup() {
  createCanvas(width, height);
  background('white');

  for (let i = 0; i < 400; i++) {
    drops.push(new Drop(random(width), random(height), random(4, 10)));
  }
}

function draw() {
  background(230, 230, 250);

  for (let drop of drops) {
    drop.update();
    drop.show();
  }
}
