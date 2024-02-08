import palette from './palette.js';
import size from './size.js';
import border from './border.js';
import shadow from './shadow.js';
import mask from './mask.js';
import last from './last.js';

var computed = {}

for (var prop in palette) {
  computed[prop] = palette[prop]
}

for (var prop in size) {
  computed[prop] = size[prop]
}

for (var prop in border) {
  computed[prop] = border[prop]
}
for (var prop in shadow) {
  computed[prop] = shadow[prop]
}

for (var prop in mask) {
  computed[prop] = mask[prop]
}

for (var prop in last) {
  computed[prop] = last[prop]
}

export default computed
