const on = true;
const off = false;

const definition = {
  '0': [on, on, on, on, on, on, off],
  '1': [off, on, on, off, off, off, off],
  '2': [on, on, off, on, on, off, on],
  '3': [on, on, on, on, off, off, on],
  '4': [off, on, on, off, off, on, on],
  '5': [on, off, on, on, off, on, on],
  '6': [on, off, on, on, on, on, on],
  '7': [on, on, on, off, off, off, off],
  '8': [on, on, on, on, on, on, on],
  '9': [on, on, on, on, off, on, on],
  'A': [on, on, on, off, on, on, on],
  'B': [off, off, on, on, on, on, on],
  'C': [on, off, off, on, on, on, off],
  'D': [off, on, on, on, on, off, on],
  'E': [on, off, off, on, on, on, on],
  'F': [on, off, off, off, on, on, on]
};

function move(x, y, fn) {
  return function() {
    translate(x, y);
    fn.apply(arguments);
    resetMatrix();
  }
}

const shorter = 20;
const longer = 80;

function horizontal() {
  rect(0, 0, longer, shorter);
}

function vertical() {
  rect(0, 0, shorter, longer);
}

const displays = {
  'a': move( shorter, 0, horizontal),
  'b': move( longer + shorter, shorter, vertical),
  'c': move( longer + shorter, shorter * 2 + longer, vertical),
  'd': move( shorter, shorter * 2 + longer * 2, horizontal),
  'e': move( 0, shorter * 2 + longer, vertical),
  'f': move( 0, shorter, vertical),
  'g': move( shorter, shorter + longer, horizontal),
};


let n = 0;
function setup() {
  createCanvas(2 * shorter + longer, 3* shorter + 2* longer)
  frameRate(1)

  background('darkslategray')
  fill('whitesmoke');
  noStroke();
}

function draw() {
  const d = Object.values(displays)
  background('darkslategray')
  for(let [i, v] of definition[n % 10].entries()) {
    if (v) {
      d[i]();
    }
  }

  n += 1;
}
