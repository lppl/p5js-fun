class SegmentDisplay {
  constructor(shorter = 20, longer = 80) {
    this.shorter = shorter;
    this.longer = longer;

    this.width = 2 * shorter + longer;
    this.height = 3 * shorter + 2 * longer;

    this.definition = {
      "0": [on, on, on, on, on, on, off],
      "1": [off, on, on, off, off, off, off],
      "2": [on, on, off, on, on, off, on],
      "3": [on, on, on, on, off, off, on],
      "4": [off, on, on, off, off, on, on],
      "5": [on, off, on, on, off, on, on],
      "6": [on, off, on, on, on, on, on],
      "7": [on, on, on, off, off, off, off],
      "8": [on, on, on, on, on, on, on],
      "9": [on, on, on, on, off, on, on],
      A: [on, on, on, off, on, on, on],
      B: [off, off, on, on, on, on, on],
      C: [on, off, off, on, on, on, off],
      D: [off, on, on, on, on, off, on],
      E: [on, off, off, on, on, on, on],
      F: [on, off, off, off, on, on, on]
    };

    this.displays = {
      a: move(shorter, 0, horizontal),
      b: move(longer + shorter, shorter, vertical),
      c: move(longer + shorter, shorter * 2 + longer, vertical),
      d: move(shorter, shorter * 2 + longer * 2, horizontal),
      e: move(0, shorter * 2 + longer, vertical),
      f: move(0, shorter, vertical),
      g: move(shorter, shorter + longer, horizontal)
    };

    function move(x, y, fn) {
      return function() {
        translate(x, y);
        fn.apply(arguments);
        resetMatrix();
      };
    }

    function horizontal() {
      rect(0, 0, longer, shorter);
    }

    function vertical() {
      rect(0, 0, shorter, longer);
    }
  }

  print(n) {
    const d = Object.values(this.displays);
    for (let [i, v] of this.definition[n].entries()) {
      if (v) {
        d[i]();
      }
    }
  }
}
