const size = 400
const scale = 20

const particles = [];

const forceField = [];

let fr;

function setup() {
  createCanvas(size, size);
  pixelDensity(1);
  noiseDetail(1, .5);
  background(200);

  frameRate(30);

  fr = createP('');

  for(let i = 0; i < 100; i ++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

let zoff = 0.02

function draw() {
  //background(200);
  const cols = floor(size / scale);
  const rows = floor(size / scale);

  const dimming = 0.8;

  //for(let x = 0; x < width; x++) {
  //  for(let y = 0; y < height; y++) {
  //    const [r, g, b] = get(x, y);
  //    if (r != 0) {
  //      console.log(r,g,b)
  //      throw '';
  //    }
  //    stroke(r*dimming, g*dimming, b*dimming);
  //    point(x, y);
  //  }
  //}

  for (let row = 0, x = 0; row < rows; row++, x += scale) {
    for (let col = 0, y = 0; col < cols; col++, y += scale) {
      const angle = noise(x * .01, y * .01, zoff) * TWO_PI * 2;
      const vec = p5.Vector.fromAngle(angle)
      forceField[row + col * scale] = vec;
    }
  }

  zoff += .02

  for (let particle of particles) {
    particle.update();
    particle.edges();
    particle.show();


    const x = floor(particle.pos.x / scale)
    const y = floor(particle.pos.y / scale)
    particle.follow(forceField[x + y * scale]);
  }

  fr.html(floor(frameRate()))
}

function create2DArray(x, y) {
  const a = []
  for(let i = 0; i < x; i++) {
    a[i] = new Array(y);
  }
  return a;
}
