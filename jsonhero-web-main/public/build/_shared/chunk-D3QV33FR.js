import {
  Compartment,
  Decoration,
  EditorView,
  Facet,
  RangeSetBuilder,
  ViewPlugin,
  darkTheme,
  getPreviewSetup,
  getViewerSetup,
  json,
  lightTheme,
  require_json_source_map,
  useCodeMirror
} from "/build/_shared/chunk-MUQ2Q3OY.js";
import {
  colorForTypeName
} from "/build/_shared/chunk-INLOL6O7.js";
import {
  Title
} from "/build/_shared/chunk-ZOQKLX7S.js";
import {
  useSelectedInfo
} from "/build/_shared/chunk-CCCYTS2U.js";
import {
  Body
} from "/build/_shared/chunk-3VJ35PHZ.js";
import {
  StringIcon,
  formatBytes,
  formatValue,
  inferTemporal,
  init_jwt_decode_esm,
  jwt_decode_esm_default,
  require_lib,
  temporal,
  useHotkeys
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  ArchiveIcon_default,
  AtSymbolIcon_default,
  CalendarIcon_default,
  ChatAlt2Icon_default,
  CheckCircleIcon_default,
  ClipboardIcon_default,
  ClockIcon_default,
  CodeIcon_default,
  CollectionIcon_default,
  ColorSwatchIcon_default,
  CreditCardIcon_default,
  CubeIcon_default,
  CurrencyDollarIcon_default,
  DocumentTextIcon_default,
  EmojiHappyIcon_default,
  EyeOffIcon_default,
  GlobeAltIcon_default,
  GlobeIcon_default,
  HashtagIcon_default,
  IdentificationIcon_default,
  KeyIcon_default,
  PhoneIcon_default,
  PhotographIcon_default
} from "/build/_shared/chunk-7ST6BW3T.js";
import {
  usePreferences
} from "/build/_shared/chunk-CMQL53DO.js";
import {
  useTheme
} from "/build/_shared/chunk-LZBJICSD.js";
import {
  useFetcher
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/simple-swizzle/node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS({
  "node_modules/simple-swizzle/node_modules/is-arrayish/index.js"(exports, module) {
    init_react();
    module.exports = function isArrayish(obj) {
      if (!obj || typeof obj === "string") {
        return false;
      }
      return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
    };
  }
});

// node_modules/simple-swizzle/index.js
var require_simple_swizzle = __commonJS({
  "node_modules/simple-swizzle/index.js"(exports, module) {
    "use strict";
    init_react();
    var isArrayish = require_is_arrayish();
    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;
    var swizzle = module.exports = function swizzle2(args) {
      var results = [];
      for (var i = 0, len = args.length; i < len; i++) {
        var arg = args[i];
        if (isArrayish(arg)) {
          results = concat.call(results, slice.call(arg));
        } else {
          results.push(arg);
        }
      }
      return results;
    };
    swizzle.wrap = function(fn) {
      return function() {
        return fn(swizzle(arguments));
      };
    };
  }
});

// node_modules/color-string/index.js
var require_color_string = __commonJS({
  "node_modules/color-string/index.js"(exports, module) {
    init_react();
    var colorNames = require_color_name();
    var swizzle = require_simple_swizzle();
    var hasOwnProperty = Object.hasOwnProperty;
    var reverseNames = {};
    for (name in colorNames) {
      if (hasOwnProperty.call(colorNames, name)) {
        reverseNames[colorNames[name]] = name;
      }
    }
    var name;
    var cs = module.exports = {
      to: {},
      get: {}
    };
    cs.get = function(string) {
      var prefix = string.substring(0, 3).toLowerCase();
      var val;
      var model;
      switch (prefix) {
        case "hsl":
          val = cs.get.hsl(string);
          model = "hsl";
          break;
        case "hwb":
          val = cs.get.hwb(string);
          model = "hwb";
          break;
        default:
          val = cs.get.rgb(string);
          model = "rgb";
          break;
      }
      if (!val) {
        return null;
      }
      return { model, value: val };
    };
    cs.get.rgb = function(string) {
      if (!string) {
        return null;
      }
      var abbr = /^#([a-f0-9]{3,4})$/i;
      var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
      var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
      var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
      var keyword = /^(\w+)$/;
      var rgb = [0, 0, 0, 1];
      var match;
      var i;
      var hexAlpha;
      if (match = string.match(hex)) {
        hexAlpha = match[2];
        match = match[1];
        for (i = 0; i < 3; i++) {
          var i2 = i * 2;
          rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
        }
        if (hexAlpha) {
          rgb[3] = parseInt(hexAlpha, 16) / 255;
        }
      } else if (match = string.match(abbr)) {
        match = match[1];
        hexAlpha = match[3];
        for (i = 0; i < 3; i++) {
          rgb[i] = parseInt(match[i] + match[i], 16);
        }
        if (hexAlpha) {
          rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
        }
      } else if (match = string.match(rgba)) {
        for (i = 0; i < 3; i++) {
          rgb[i] = parseInt(match[i + 1], 0);
        }
        if (match[4]) {
          if (match[5]) {
            rgb[3] = parseFloat(match[4]) * 0.01;
          } else {
            rgb[3] = parseFloat(match[4]);
          }
        }
      } else if (match = string.match(per)) {
        for (i = 0; i < 3; i++) {
          rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
        }
        if (match[4]) {
          if (match[5]) {
            rgb[3] = parseFloat(match[4]) * 0.01;
          } else {
            rgb[3] = parseFloat(match[4]);
          }
        }
      } else if (match = string.match(keyword)) {
        if (match[1] === "transparent") {
          return [0, 0, 0, 0];
        }
        if (!hasOwnProperty.call(colorNames, match[1])) {
          return null;
        }
        rgb = colorNames[match[1]];
        rgb[3] = 1;
        return rgb;
      } else {
        return null;
      }
      for (i = 0; i < 3; i++) {
        rgb[i] = clamp(rgb[i], 0, 255);
      }
      rgb[3] = clamp(rgb[3], 0, 1);
      return rgb;
    };
    cs.get.hsl = function(string) {
      if (!string) {
        return null;
      }
      var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
      var match = string.match(hsl);
      if (match) {
        var alpha = parseFloat(match[4]);
        var h = (parseFloat(match[1]) % 360 + 360) % 360;
        var s = clamp(parseFloat(match[2]), 0, 100);
        var l = clamp(parseFloat(match[3]), 0, 100);
        var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [h, s, l, a];
      }
      return null;
    };
    cs.get.hwb = function(string) {
      if (!string) {
        return null;
      }
      var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
      var match = string.match(hwb);
      if (match) {
        var alpha = parseFloat(match[4]);
        var h = (parseFloat(match[1]) % 360 + 360) % 360;
        var w = clamp(parseFloat(match[2]), 0, 100);
        var b = clamp(parseFloat(match[3]), 0, 100);
        var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [h, w, b, a];
      }
      return null;
    };
    cs.to.hex = function() {
      var rgba = swizzle(arguments);
      return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
    };
    cs.to.rgb = function() {
      var rgba = swizzle(arguments);
      return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
    };
    cs.to.rgb.percent = function() {
      var rgba = swizzle(arguments);
      var r = Math.round(rgba[0] / 255 * 100);
      var g = Math.round(rgba[1] / 255 * 100);
      var b = Math.round(rgba[2] / 255 * 100);
      return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
    };
    cs.to.hsl = function() {
      var hsla = swizzle(arguments);
      return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
    };
    cs.to.hwb = function() {
      var hwba = swizzle(arguments);
      var a = "";
      if (hwba.length >= 4 && hwba[3] !== 1) {
        a = ", " + hwba[3];
      }
      return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
    };
    cs.to.keyword = function(rgb) {
      return reverseNames[rgb.slice(0, 3)];
    };
    function clamp(num, min, max) {
      return Math.min(Math.max(min, num), max);
    }
    function hexDouble(num) {
      var str = Math.round(num).toString(16).toUpperCase();
      return str.length < 2 ? "0" + str : str;
    }
  }
});

// node_modules/color/node_modules/color-name/index.js
var require_color_name2 = __commonJS({
  "node_modules/color/node_modules/color-name/index.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/color/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color/node_modules/color-convert/conversions.js"(exports, module) {
    init_react();
    var cssKeywords = require_color_name2();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color/node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color/node_modules/color-convert/route.js"(exports, module) {
    init_react();
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color/node_modules/color-convert/index.js"(exports, module) {
    init_react();
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module.exports = convert;
  }
});

// node_modules/color/index.js
var require_color = __commonJS({
  "node_modules/color/index.js"(exports, module) {
    init_react();
    var colorString = require_color_string();
    var convert = require_color_convert();
    var _slice = [].slice;
    var skippedModels = [
      "keyword",
      "gray",
      "hex"
    ];
    var hashedModelKeys = {};
    for (const model of Object.keys(convert)) {
      hashedModelKeys[_slice.call(convert[model].labels).sort().join("")] = model;
    }
    var limiters = {};
    function Color3(object, model) {
      if (!(this instanceof Color3)) {
        return new Color3(object, model);
      }
      if (model && model in skippedModels) {
        model = null;
      }
      if (model && !(model in convert)) {
        throw new Error("Unknown model: " + model);
      }
      let i;
      let channels;
      if (object == null) {
        this.model = "rgb";
        this.color = [0, 0, 0];
        this.valpha = 1;
      } else if (object instanceof Color3) {
        this.model = object.model;
        this.color = object.color.slice();
        this.valpha = object.valpha;
      } else if (typeof object === "string") {
        const result = colorString.get(object);
        if (result === null) {
          throw new Error("Unable to parse color from string: " + object);
        }
        this.model = result.model;
        channels = convert[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
      } else if (object.length > 0) {
        this.model = model || "rgb";
        channels = convert[this.model].channels;
        const newArray = _slice.call(object, 0, channels);
        this.color = zeroArray(newArray, channels);
        this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
      } else if (typeof object === "number") {
        this.model = "rgb";
        this.color = [
          object >> 16 & 255,
          object >> 8 & 255,
          object & 255
        ];
        this.valpha = 1;
      } else {
        this.valpha = 1;
        const keys = Object.keys(object);
        if ("alpha" in object) {
          keys.splice(keys.indexOf("alpha"), 1);
          this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
        }
        const hashedKeys = keys.sort().join("");
        if (!(hashedKeys in hashedModelKeys)) {
          throw new Error("Unable to parse color from object: " + JSON.stringify(object));
        }
        this.model = hashedModelKeys[hashedKeys];
        const labels = convert[this.model].labels;
        const color = [];
        for (i = 0; i < labels.length; i++) {
          color.push(object[labels[i]]);
        }
        this.color = zeroArray(color);
      }
      if (limiters[this.model]) {
        channels = convert[this.model].channels;
        for (i = 0; i < channels; i++) {
          const limit = limiters[this.model][i];
          if (limit) {
            this.color[i] = limit(this.color[i]);
          }
        }
      }
      this.valpha = Math.max(0, Math.min(1, this.valpha));
      if (Object.freeze) {
        Object.freeze(this);
      }
    }
    Color3.prototype = {
      toString() {
        return this.string();
      },
      toJSON() {
        return this[this.model]();
      },
      string(places) {
        let self = this.model in colorString.to ? this : this.rgb();
        self = self.round(typeof places === "number" ? places : 1);
        const args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to[self.model](args);
      },
      percentString(places) {
        const self = this.rgb().round(typeof places === "number" ? places : 1);
        const args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to.rgb.percent(args);
      },
      array() {
        return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
      },
      object() {
        const result = {};
        const channels = convert[this.model].channels;
        const labels = convert[this.model].labels;
        for (let i = 0; i < channels; i++) {
          result[labels[i]] = this.color[i];
        }
        if (this.valpha !== 1) {
          result.alpha = this.valpha;
        }
        return result;
      },
      unitArray() {
        const rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) {
          rgb.push(this.valpha);
        }
        return rgb;
      },
      unitObject() {
        const rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) {
          rgb.alpha = this.valpha;
        }
        return rgb;
      },
      round(places) {
        places = Math.max(places || 0, 0);
        return new Color3(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
      },
      alpha(value) {
        if (arguments.length > 0) {
          return new Color3(this.color.concat(Math.max(0, Math.min(1, value))), this.model);
        }
        return this.valpha;
      },
      red: getset("rgb", 0, maxfn(255)),
      green: getset("rgb", 1, maxfn(255)),
      blue: getset("rgb", 2, maxfn(255)),
      hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (value) => (value % 360 + 360) % 360),
      saturationl: getset("hsl", 1, maxfn(100)),
      lightness: getset("hsl", 2, maxfn(100)),
      saturationv: getset("hsv", 1, maxfn(100)),
      value: getset("hsv", 2, maxfn(100)),
      chroma: getset("hcg", 1, maxfn(100)),
      gray: getset("hcg", 2, maxfn(100)),
      white: getset("hwb", 1, maxfn(100)),
      wblack: getset("hwb", 2, maxfn(100)),
      cyan: getset("cmyk", 0, maxfn(100)),
      magenta: getset("cmyk", 1, maxfn(100)),
      yellow: getset("cmyk", 2, maxfn(100)),
      black: getset("cmyk", 3, maxfn(100)),
      x: getset("xyz", 0, maxfn(100)),
      y: getset("xyz", 1, maxfn(100)),
      z: getset("xyz", 2, maxfn(100)),
      l: getset("lab", 0, maxfn(100)),
      a: getset("lab", 1),
      b: getset("lab", 2),
      keyword(value) {
        if (arguments.length > 0) {
          return new Color3(value);
        }
        return convert[this.model].keyword(this.color);
      },
      hex(value) {
        if (arguments.length > 0) {
          return new Color3(value);
        }
        return colorString.to.hex(this.rgb().round().color);
      },
      hexa(value) {
        if (arguments.length > 0) {
          return new Color3(value);
        }
        const rgbArray = this.rgb().round().color;
        let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
        if (alphaHex.length === 1) {
          alphaHex = "0" + alphaHex;
        }
        return colorString.to.hex(rgbArray) + alphaHex;
      },
      rgbNumber() {
        const rgb = this.rgb().color;
        return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
      },
      luminosity() {
        const rgb = this.rgb().color;
        const lum = [];
        for (const [i, element] of rgb.entries()) {
          const chan = element / 255;
          lum[i] = chan <= 0.03928 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
      },
      contrast(color2) {
        const lum1 = this.luminosity();
        const lum2 = color2.luminosity();
        if (lum1 > lum2) {
          return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
      },
      level(color2) {
        const contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7.1) {
          return "AAA";
        }
        return contrastRatio >= 4.5 ? "AA" : "";
      },
      isDark() {
        const rgb = this.rgb().color;
        const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
        return yiq < 128;
      },
      isLight() {
        return !this.isDark();
      },
      negate() {
        const rgb = this.rgb();
        for (let i = 0; i < 3; i++) {
          rgb.color[i] = 255 - rgb.color[i];
        }
        return rgb;
      },
      lighten(ratio) {
        const hsl = this.hsl();
        hsl.color[2] += hsl.color[2] * ratio;
        return hsl;
      },
      darken(ratio) {
        const hsl = this.hsl();
        hsl.color[2] -= hsl.color[2] * ratio;
        return hsl;
      },
      saturate(ratio) {
        const hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
      },
      desaturate(ratio) {
        const hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
      },
      whiten(ratio) {
        const hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
      },
      blacken(ratio) {
        const hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
      },
      grayscale() {
        const rgb = this.rgb().color;
        const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return Color3.rgb(value, value, value);
      },
      fade(ratio) {
        return this.alpha(this.valpha - this.valpha * ratio);
      },
      opaquer(ratio) {
        return this.alpha(this.valpha + this.valpha * ratio);
      },
      rotate(degrees) {
        const hsl = this.hsl();
        let hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
      },
      mix(mixinColor, weight) {
        if (!mixinColor || !mixinColor.rgb) {
          throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        }
        const color1 = mixinColor.rgb();
        const color2 = this.rgb();
        const p = weight === void 0 ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = color1.alpha() - color2.alpha();
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
        const w2 = 1 - w1;
        return Color3.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
      }
    };
    for (const model of Object.keys(convert)) {
      if (skippedModels.includes(model)) {
        continue;
      }
      const channels = convert[model].channels;
      Color3.prototype[model] = function() {
        if (this.model === model) {
          return new Color3(this);
        }
        if (arguments.length > 0) {
          return new Color3(arguments, model);
        }
        const newAlpha = typeof arguments[channels] === "number" ? channels : this.valpha;
        return new Color3(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
      };
      Color3[model] = function(color) {
        if (typeof color === "number") {
          color = zeroArray(_slice.call(arguments), channels);
        }
        return new Color3(color, model);
      };
    }
    function roundTo(number, places) {
      return Number(number.toFixed(places));
    }
    function roundToPlace(places) {
      return function(number) {
        return roundTo(number, places);
      };
    }
    function getset(model, channel, modifier) {
      model = Array.isArray(model) ? model : [model];
      for (const m of model) {
        (limiters[m] || (limiters[m] = []))[channel] = modifier;
      }
      model = model[0];
      return function(value) {
        let result;
        if (arguments.length > 0) {
          if (modifier) {
            value = modifier(value);
          }
          result = this[model]();
          result.color[channel] = value;
          return result;
        }
        result = this[model]().color[channel];
        if (modifier) {
          result = modifier(result);
        }
        return result;
      };
    }
    function maxfn(max) {
      return function(v) {
        return Math.max(0, Math.min(max, v));
      };
    }
    function assertArray(value) {
      return Array.isArray(value) ? value : [value];
    }
    function zeroArray(array, length) {
      for (let i = 0; i < length; i++) {
        if (typeof array[i] !== "number") {
          array[i] = 0;
        }
      }
      return array;
    }
    module.exports = Color3;
  }
});

// app/components/Primitives/ExtraLargeTitle.tsx
init_react();
var ExtraLargeTitle = ({
  className,
  children
}) => {
  return /* @__PURE__ */ React.createElement("h1", {
    className: `font-sans font-bold text-6xl ${className}`
  }, children);
};

// app/components/Primitives/SmallSubtitle.tsx
init_react();
var SmallSubtitle = ({
  className,
  children
}) => {
  return /* @__PURE__ */ React.createElement("h3", {
    className: `font-sans text-xl text-slate-300 ${className}`
  }, children);
};

// app/components/JsonPreview.tsx
init_react();
var import_path = __toESM(require_lib());
var import_json_source_map = __toESM(require_json_source_map());
var import_react3 = __toESM(require_react());

// app/components/CopyTextButton.tsx
init_react();
var import_react2 = __toESM(require_react());

// app/components/CopyText.tsx
init_react();
var import_react = __toESM(require_react());
function CopyText({
  children,
  value,
  className,
  onCopied
}) {
  const onClick = (0, import_react.useCallback)(() => {
    navigator.clipboard.writeText(value);
    if (onCopied) {
      onCopied();
    }
  }, [value]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    onClick,
    className: `${className}`
  }, children);
}

// app/components/CopyTextButton.tsx
function CopyTextButton({ value, className }) {
  const [copied, setCopied] = (0, import_react2.useState)(false);
  const onCopied = (0, import_react2.useCallback)(() => {
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [value]);
  return /* @__PURE__ */ React.createElement(CopyText, {
    className: `${className}`,
    value,
    onCopied
  }, copied ? /* @__PURE__ */ React.createElement(Body, null, "Copied!") : /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(ClipboardIcon_default, {
    className: "h-4 w-4 mr-[2px]"
  }), /* @__PURE__ */ React.createElement(Body, null, "Copy")));
}

// app/components/JsonPreview.tsx
function JsonPreview({ json: json2, highlightPath }) {
  const editor = (0, import_react3.useRef)(null);
  const [preferences] = usePreferences();
  const jsonMapped = (0, import_react3.useMemo)(() => {
    return import_json_source_map.default.stringify(json2, null, (preferences == null ? void 0 : preferences.indent) || 2);
  }, [json2, preferences]);
  const lines = (0, import_react3.useMemo)(() => {
    if (!highlightPath) {
      return;
    }
    let path = new import_path.JSONHeroPath(highlightPath);
    let pointer = path.jsonPointer();
    let selectionInfo = jsonMapped.pointers[pointer];
    return {
      from: selectionInfo.value.line + 1,
      to: selectionInfo.valueEnd.line + 1
    };
  }, [jsonMapped, highlightPath]);
  const extensions = getPreviewSetup();
  const highlighting = new Compartment();
  if (lines) {
    extensions.push(highlighting.of(highlightLineRange(lines)));
  }
  const [theme] = useTheme();
  const { setContainer, view, state } = useCodeMirror({
    container: editor.current,
    extensions,
    value: jsonMapped.json,
    editable: false,
    contentEditable: false,
    autoFocus: false,
    basicSetup: false,
    theme: theme === "light" ? lightTheme() : darkTheme()
  });
  (0, import_react3.useEffect)(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);
  (0, import_react3.useEffect)(() => {
    if (!view) {
      return;
    }
    let transactionSpec = {
      changes: { from: 0, to: view.state.doc.length, insert: jsonMapped.json }
    };
    let range = lines;
    if (range != null) {
      transactionSpec.effects = highlighting.reconfigure(highlightLineRange(range));
    }
    view.dispatch(transactionSpec);
  }, [view, highlighting, jsonMapped, highlightPath]);
  useHotkeys("ctrl+a,meta+a,command+a", (e) => {
    e.preventDefault();
    view == null ? void 0 : view.dispatch({ selection: { anchor: 0, head: state == null ? void 0 : state.doc.length } });
  }, [view, state]);
  const [hovering, setHovering] = (0, import_react3.useState)(false);
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full",
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  }, /* @__PURE__ */ React.createElement("div", {
    ref: editor
  }), /* @__PURE__ */ React.createElement("div", {
    className: `absolute top-1 right-0 flex justify-end w-full transition ${hovering ? "opacity-100" : "opacity-0"}`
  }, /* @__PURE__ */ React.createElement(CopyTextButton, {
    value: jsonMapped.json,
    className: "bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
  })));
}
var baseTheme = EditorView.baseTheme({
  "&light .cm-highlighted": { backgroundColor: "#ffee0055" },
  "&dark .cm-highlighted": { backgroundColor: "#ffee0055" }
});
var highlightedRange = Facet.define({
  combine: (values) => values.length ? values[0] : { from: -1, to: -1 }
});
function highlightLineRange(range) {
  return [
    baseTheme,
    range == null ? [] : highlightedRange.of(range),
    highlightLineRangePlugin
  ];
}
var lineHighlightDecoration = Decoration.line({
  attributes: { class: "cm-highlighted" }
});
function highlightLines(view) {
  let highlightRange = view.state.facet(highlightedRange);
  let builder = new RangeSetBuilder();
  for (let { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to; ) {
      let line = view.state.doc.lineAt(pos);
      if (line.number >= highlightRange.from && line.number <= highlightRange.to) {
        builder.add(line.from, line.from, lineHighlightDecoration);
      }
      pos = line.to + 1;
    }
  }
  return builder.finish();
}
var highlightLineRangePlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = highlightLines(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged)
      this.decorations = highlightLines(update.view);
  }
}, {
  decorations: (v) => v.decorations
});

// app/components/Preview/PreviewValue.tsx
init_react();

// app/components/Preview/Types/PreviewString.tsx
init_react();
var import_color = __toESM(require_color());

// app/components/CodeViewer.tsx
init_react();
var import_react4 = __toESM(require_react());
function CodeViewer({ code, lang }) {
  const editor = (0, import_react4.useRef)(null);
  const extensions = getViewerSetup();
  if (!lang || lang === "json") {
    extensions.push(json());
  }
  const [theme] = useTheme();
  const { setContainer, view, state } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    editable: false,
    contentEditable: false,
    autoFocus: false,
    basicSetup: false,
    theme: theme === "light" ? lightTheme() : darkTheme()
  });
  (0, import_react4.useEffect)(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);
  useHotkeys("ctrl+a,meta+a,command+a", (e) => {
    e.preventDefault();
    view == null ? void 0 : view.dispatch({ selection: { anchor: 0, head: state == null ? void 0 : state.doc.length } });
  }, [view, state]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    ref: editor
  }));
}

// app/components/Preview/PreviewBox.tsx
init_react();
var import_react5 = __toESM(require_react());
function PreviewBox({ link, className, children }) {
  const onClick = (0, import_react5.useCallback)(() => {
    if (!link)
      return;
    window.open(link, "_blank");
  }, [link]);
  return /* @__PURE__ */ React.createElement("div", {
    className
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "text-slate-700 transition dark:text-slate-400 mb-2"
  }, "Preview"), /* @__PURE__ */ React.createElement("div", {
    onClick,
    className: "block rounded-sm p-2 text-slate-700 bg-slate-100 transition dark:text-slate-300 dark:bg-white dark:bg-opacity-5 hover:cursor-pointer"
  }, /* @__PURE__ */ React.createElement("div", null, children)));
}

// app/components/Preview/Types/PreviewAudioUri.tsx
init_react();
var import_react6 = __toESM(require_react());
function PreviewAudioUri({
  src,
  contentType
}) {
  const mediaRef = (0, import_react6.useRef)(null);
  useHotkeys("space", (e) => {
    e.preventDefault();
    if (mediaRef.current) {
      if (mediaRef.current.paused) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [mediaRef]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(PreviewBox, null, /* @__PURE__ */ React.createElement(Body, null, /* @__PURE__ */ React.createElement("audio", {
    controls: true,
    src,
    ref: mediaRef
  }, "Sorry, your browser doesn't support embedded audio."))));
}

// app/components/Preview/Types/PreviewDate.tsx
init_react();

// app/components/Preview/CalendarMonth.tsx
init_react();
var import_react7 = __toESM(require_react());
function dateString(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
function isSameDay(date, otherDate) {
  return date.getFullYear() === otherDate.getFullYear() && date.getMonth() === otherDate.getMonth() && date.getDate() === otherDate.getDate();
}
function CalendarMonth({ date }) {
  const days = (0, import_react7.useMemo)(() => {
    let days2 = [];
    const firstDayOfMonth = new Date(date);
    firstDayOfMonth.setDate(1);
    const firstDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (firstDayOfWeek != 0) {
      const previousMonthDate = new Date(firstDayOfMonth);
      for (let index = 0; index < firstDayOfWeek; index++) {
        previousMonthDate.setDate(previousMonthDate.getDate() - 1);
        days2.push({
          date: dateString(previousMonthDate),
          isCurrentMonth: false,
          isHighlighted: isSameDay(date, previousMonthDate)
        });
      }
    }
    let currentMonthDate = new Date(firstDayOfMonth);
    const monthNumber = firstDayOfMonth.getMonth();
    while (true) {
      days2.push({
        date: dateString(currentMonthDate),
        isCurrentMonth: true,
        isHighlighted: isSameDay(date, currentMonthDate)
      });
      currentMonthDate.setDate(currentMonthDate.getDate() + 1);
      if (currentMonthDate.getMonth() !== monthNumber) {
        break;
      }
    }
    const lastDayOfMonthDayOfWeek = currentMonthDate.getDay() - 1;
    const nextMonthDayCount = 7 - lastDayOfMonthDayOfWeek;
    for (let index = 0; index < nextMonthDayCount; index++) {
      days2.push({
        date: dateString(currentMonthDate),
        isCurrentMonth: false,
        isHighlighted: isSameDay(date, currentMonthDate)
      });
      currentMonthDate.setDate(currentMonthDate.getDate() + 1);
    }
    return days2;
  }, [date]);
  return /* @__PURE__ */ React.createElement("section", {
    className: ""
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "text-left text-slate-800 dark:text-slate-400"
  }, new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  }).format(date)), /* @__PURE__ */ React.createElement("div", {
    className: "uppercase mt-2 grid text-center tracking-wider grid-cols-7 text-sm leading-6 text-gray-500 dark:text-slate-500"
  }, /* @__PURE__ */ React.createElement("div", null, "Mon"), /* @__PURE__ */ React.createElement("div", null, "Tue"), /* @__PURE__ */ React.createElement("div", null, "Wed"), /* @__PURE__ */ React.createElement("div", null, "Thu"), /* @__PURE__ */ React.createElement("div", null, "Fri"), /* @__PURE__ */ React.createElement("div", null, "Sat"), /* @__PURE__ */ React.createElement("div", null, "Sun")), /* @__PURE__ */ React.createElement("div", {
    className: "isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm ring-1 cursor-default ring-slate-200 dark:ring-slate-600 dark:bg-slate-600"
  }, days.map((day, dayIdx) => {
    var _a;
    return /* @__PURE__ */ React.createElement("button", {
      key: day.date,
      type: "button",
      className: `"cursor-default" ${classNames(day.isCurrentMonth ? "bg-white text-slate-900 dark:text-slate-300 dark:bg-slate-800" : "bg-slate-100 text-slate-400 dark:text-slate-500 dark:bg-slate-800 dark:bg-opacity-90", dayIdx === 0 && "rounded-tl-lg", dayIdx === 6 && "rounded-tr-lg", dayIdx === days.length - 7 && "rounded-bl-lg", dayIdx === days.length - 1 && "rounded-br-lg", "relative py-1.5 focus:z-10")}`
    }, /* @__PURE__ */ React.createElement("time", {
      dateTime: day.date,
      className: classNames(day.isHighlighted && "bg-indigo-600 font-semibold text-white", "mx-auto flex h-7 w-7 items-center cursor-default justify-center rounded-full")
    }, (_a = day.date.split("-").pop()) == null ? void 0 : _a.replace(/^0/, "")));
  })));
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// app/components/Preview/Types/PreviewDate.tsx
function PreviewDate({ value, format }) {
  const temporal2 = inferTemporal(value, format);
  if (!temporal2) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  if ("epochMilliseconds" in temporal2) {
    const date = new Date(temporal2.epochMilliseconds);
    return /* @__PURE__ */ React.createElement(CalendarMonth, {
      date
    });
  } else if (temporal2 instanceof temporal.PlainDate) {
    const date = new Date(temporal2.year, temporal2.month - 1, temporal2.day);
    return /* @__PURE__ */ React.createElement(CalendarMonth, {
      date
    });
  } else if (temporal2 instanceof temporal.PlainDateTime) {
    const date = new Date(temporal2.year, temporal2.month - 1, temporal2.day, temporal2.hour, temporal2.minute, temporal2.second, temporal2.millisecond);
    return /* @__PURE__ */ React.createElement(CalendarMonth, {
      date
    });
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}

// app/components/Preview/Types/PreviewImageUri.tsx
init_react();
function PreviewImageUri({
  src,
  contentType,
  alt = ""
}) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(PreviewBox, {
    link: src
  }, /* @__PURE__ */ React.createElement(Body, null, /* @__PURE__ */ React.createElement("img", {
    src,
    alt
  }))));
}

// app/components/Preview/Types/PreviewIPFSImage.tsx
init_react();
function PreviewIPFSImage({ src }) {
  const newSrc = createPreviewIPFSImageURL(src);
  return /* @__PURE__ */ React.createElement(PreviewImageUri, {
    src: newSrc
  });
}
var createPreviewIPFSImageURL = (src) => {
  const url = new URL(src.href);
  url.protocol = "https:";
  url.pathname = `/ipfs/${src.pathname.substring(1)}`;
  url.hostname = "ipfs.io";
  return url.href;
};

// app/components/Preview/Types/PreviewUri.tsx
init_react();

// app/hooks/useLoadWhenOnline.tsx
init_react();
var import_react8 = __toESM(require_react());
function useLoadWhenOnline(callback, deps = []) {
  const callbackRef = (0, import_react8.useRef)(callback);
  (0, import_react8.useEffect)(() => {
    callbackRef.current = callback;
  });
  (0, import_react8.useEffect)(() => {
    const cb = () => callbackRef.current();
    if (window.navigator.onLine) {
      cb();
      return;
    }
    window.addEventListener("online", cb);
    return () => {
      window.removeEventListener("online", cb);
    };
  }, [...deps]);
}

// app/components/Preview/Types/PreviewUriElement.tsx
init_react();

// app/components/Preview/Types/PreviewHtml.tsx
init_react();
function PreviewHtml({ info }) {
  var _a, _b;
  return /* @__PURE__ */ React.createElement(PreviewBox, {
    link: info.url
  }, /* @__PURE__ */ React.createElement("div", null, info.title && /* @__PURE__ */ React.createElement(Title, null, info.icon && /* @__PURE__ */ React.createElement("img", {
    src: info.icon.url,
    className: "w-4 h-4 inline mr-1",
    alt: ""
  }), /* @__PURE__ */ React.createElement("span", {
    className: "inline"
  }, info.title)), info.description && /* @__PURE__ */ React.createElement(Body, null, info.description)), info.image && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", {
    className: "block",
    src: (_a = info.image) == null ? void 0 : _a.url,
    alt: (_b = info.image) == null ? void 0 : _b.alt
  })));
}

// app/components/Preview/Types/PreviewImage.tsx
init_react();

// app/components/Preview/PreviewProperties.tsx
init_react();
function PreviewProperties({ properties }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "-mb-1"
  }, properties.map((property) => {
    return /* @__PURE__ */ React.createElement(Body, {
      className: "text-slate-500 mr-2 inline-flex items-center",
      key: property.key
    }, property.icon && /* @__PURE__ */ React.createElement("span", {
      className: "w-4 h-4 inline-block text-slate-500 mr-1 flex-none"
    }, property.icon), /* @__PURE__ */ React.createElement("span", null, property.title));
  }));
}

// app/components/Preview/Types/PreviewImage.tsx
function PreviewImage({ info }) {
  let properties = [];
  if (info.mimeType) {
    properties.push({ key: "mimeType", title: info.mimeType });
  }
  if (info.size) {
    properties.push({ key: "fileSize", title: `${formatBytes(info.size)}` });
  }
  const src = info.image ? info.image.url : info.url;
  return /* @__PURE__ */ React.createElement(PreviewBox, {
    link: info.url
  }, /* @__PURE__ */ React.createElement("img", {
    className: "block max-h-96 w-full object-contain",
    src
  }), /* @__PURE__ */ React.createElement(PreviewProperties, {
    properties
  }));
}

// app/components/Preview/Types/PreviewJson.tsx
init_react();
var import_react9 = __toESM(require_react());

// app/components/OpenInWindow.tsx
init_react();
function OpenInNewWindow({
  url,
  className,
  children
}) {
  return /* @__PURE__ */ React.createElement("a", {
    href: url,
    target: "_blank",
    className: `${className} relative`
  }, children);
}

// app/components/Preview/Types/PreviewJson.tsx
function PreviewJson({ preview }) {
  const [hovering, setHovering] = (0, import_react9.useState)(false);
  const jsonHeroUrl = new URL(`/actions/createFromUrl?jsonUrl=${encodeURIComponent(preview.url)}`, window.location.origin);
  jsonHeroUrl.searchParams.append("utm_source", "preview");
  const code = JSON.stringify(preview.json, null, 2);
  return /* @__PURE__ */ React.createElement(PreviewBox, {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full",
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  }, /* @__PURE__ */ React.createElement(CodeViewer, {
    code
  }), /* @__PURE__ */ React.createElement("div", {
    className: `absolute top-0 flex justify-end pt-1 pr-1 w-full transition ${hovering ? "opacity-100" : "opacity-0"}`
  }, /* @__PURE__ */ React.createElement(CopyTextButton, {
    value: code,
    className: "bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
  }), /* @__PURE__ */ React.createElement(OpenInNewWindow, {
    url: jsonHeroUrl.href,
    className: "bg-slate-200 hover:bg-slate-300 h-fit px-2 py-0.5 rounded-sm transition dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
  }, /* @__PURE__ */ React.createElement(Body, null, "Open in tab")))));
}

// app/components/Preview/Types/PreviewUriElement.tsx
function PreviewUriElement({ info }) {
  switch (info.contentType) {
    case "html":
      return /* @__PURE__ */ React.createElement(PreviewHtml, {
        info
      });
    case "image":
    case "gif":
      return /* @__PURE__ */ React.createElement(PreviewImage, {
        info
      });
    case "json":
      return /* @__PURE__ */ React.createElement(PreviewJson, {
        preview: info
      });
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}

// app/components/Preview/Types/PreviewUri.tsx
function PreviewUri(props) {
  const previewFetcher = useFetcher();
  const encodedUri = encodeURIComponent(props.value);
  const load = () => previewFetcher.load(`/actions/getPreview/${encodedUri}`);
  useLoadWhenOnline(load, [encodedUri]);
  return /* @__PURE__ */ React.createElement("div", null, previewFetcher.type === "done" ? /* @__PURE__ */ React.createElement(React.Fragment, null, typeof previewFetcher.data == "string" ? /* @__PURE__ */ React.createElement(PreviewBox, null, /* @__PURE__ */ React.createElement(Body, null, /* @__PURE__ */ React.createElement("span", {
    dangerouslySetInnerHTML: { __html: previewFetcher.data }
  }))) : "error" in previewFetcher.data ? /* @__PURE__ */ React.createElement(PreviewBox, null, /* @__PURE__ */ React.createElement(Body, null, previewFetcher.data.error)) : /* @__PURE__ */ React.createElement(PreviewUriElement, {
    info: previewFetcher.data
  })) : /* @__PURE__ */ React.createElement(PreviewBox, null, /* @__PURE__ */ React.createElement(Body, {
    className: "h-96 animate-pulse bg-slate-300 dark:text-slate-300 dark:bg-slate-500 flex justify-center items-center"
  }, "Loading\u2026")));
}

// app/components/Preview/Types/PreviewVideoUri.tsx
init_react();
var import_react10 = __toESM(require_react());
function PreviewVideoUri({
  src,
  contentType
}) {
  const videoRef = (0, import_react10.useRef)(null);
  useHotkeys("space", (e) => {
    e.preventDefault();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoRef]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(PreviewBox, null, /* @__PURE__ */ React.createElement(Body, null, /* @__PURE__ */ React.createElement("video", {
    key: src,
    controls: true,
    ref: videoRef
  }, /* @__PURE__ */ React.createElement("source", {
    src,
    type: contentType
  }), "Sorry, your browser doesn't support embedded videos."))));
}

// app/components/Preview/Types/PreviewString.tsx
function PreviewString({ info }) {
  if (info.format == null) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  switch (info.format.name) {
    case "uri":
      if (info.format.contentType === "image/png" || info.format.contentType === "image/jpeg" || info.format.contentType === "image/gif" || info.format.contentType === "image/svg+xml" || info.format.contentType === "image/webp") {
        const url = new URL(info.value);
        if (url.protocol === "ipfs:") {
          return /* @__PURE__ */ React.createElement(PreviewIPFSImage, {
            src: url
          });
        } else {
          return /* @__PURE__ */ React.createElement(PreviewImageUri, {
            src: info.value,
            contentType: info.format.contentType
          });
        }
      } else if (info.format.contentType === "video/mp4" || info.format.contentType === "video/webm" || info.format.contentType === "video/ogg") {
        return /* @__PURE__ */ React.createElement(PreviewVideoUri, {
          src: info.value,
          contentType: info.format.contentType
        });
      } else if (info.format.contentType === "audio/mpeg" || info.format.contentType === "audio/ogg" || info.format.contentType === "audio/wav") {
        return /* @__PURE__ */ React.createElement(PreviewAudioUri, {
          src: info.value,
          contentType: info.format.contentType
        });
      } else {
        return /* @__PURE__ */ React.createElement(PreviewUri, {
          value: info.value,
          type: info
        });
      }
    case "datetime":
      if (info.format.parts === "date" || info.format.parts === "datetime") {
        return /* @__PURE__ */ React.createElement(PreviewDate, {
          value: info.value,
          format: info.format
        });
      }
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
    case "color":
      return /* @__PURE__ */ React.createElement(PreviewColor, {
        value: info.value,
        format: info.format
      });
    case "json":
      return /* @__PURE__ */ React.createElement(PreviewJson2, {
        value: info.value,
        format: info.format
      });
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
function PreviewJson2({
  value,
  format
}) {
  if (format.variant === "json5") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  return /* @__PURE__ */ React.createElement(CodeViewer, {
    code: JSON.stringify(JSON.parse(value), null, 2)
  });
}
function PreviewColor({
  value,
  format
}) {
  const color = new import_color.default(value);
  const textColor = color.isLight() ? "text-slate-800" : "text-slate-100";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PreviewBox, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-center w-full h-52",
    style: { backgroundColor: color.hex().toString() }
  }, /* @__PURE__ */ React.createElement("p", {
    className: `text-center text-xl ${textColor}`
  }, value)))));
}

// app/components/Preview/PreviewValue.tsx
function PreviewValue() {
  const info = useSelectedInfo();
  if (!info) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  switch (info.name) {
    case "string":
      return /* @__PURE__ */ React.createElement(PreviewString, {
        info
      });
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}

// app/components/Properties/PropertiesValue.tsx
init_react();

// app/components/Properties/PropertiesInt.tsx
init_react();

// app/components/DataTable.tsx
init_react();
var import_react11 = __toESM(require_react());
var DataRow = ({ title, value, icon }) => {
  const [hovering, setHovering] = (0, import_react11.useState)(false);
  return /* @__PURE__ */ React.createElement("tr", {
    className: "divide-solid divide-x transition dark:divide-slate-700"
  }, /* @__PURE__ */ React.createElement("td", {
    className: "flex items-baseline py-2 pr-3 text-base dark:text-slate-400"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex-1 ml-1"
  }, title)), /* @__PURE__ */ React.createElement("td", {
    onMouseOver: () => setHovering(true),
    onMouseOut: () => setHovering(false),
    className: `relative w-full h-full pl-2 py-2 text-base text-slate-800 transition dark:text-slate-300 break-all ${hovering ? "bg-slate-100 dark:bg-slate-700" : "bg-transparent"}`
  }, value, /* @__PURE__ */ React.createElement("div", {
    className: `absolute top-0 right-0 flex justify-end h-full w-full transition ${hovering ? "opacity-100" : "opacity-0"}`
  }, /* @__PURE__ */ React.createElement(CopyTextButton, {
    className: "bg-slate-200 hover:bg-slate-300 h-fit mt-1 mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-600 dark:hover:bg-slate-500",
    value
  }))));
};
var DataTable = ({ rows }) => {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title, {
    className: "text-slate-700 dark:text-slate-400 mb-2"
  }, "Properties"), /* @__PURE__ */ React.createElement("table", {
    className: "w-full table-auto border-y-[0.5px] border-slate-300 transition dark:border-slate-700"
  }, /* @__PURE__ */ React.createElement("tbody", {
    className: "divide-solid divide-y divide-slate-300 w-full transition dark:divide-slate-700"
  }, rows.map((row) => {
    return /* @__PURE__ */ React.createElement(DataRow, {
      key: row.key,
      title: row.key,
      value: row.value,
      icon: row.icon
    });
  }))));
};

// app/components/ValueIcon.tsx
init_react();
var ValueIcon = ({
  type,
  size = 0 /* Small */,
  monochrome = false
}) => {
  let classes = monochrome ? `text-slate-300` : colorForTypeName(type.name);
  switch (size) {
    case 0 /* Small */:
      classes += " h-4 w-4";
      break;
    case 1 /* Medium */:
      classes += " h-6 w-6";
      break;
  }
  switch (type.name) {
    case "object": {
      return /* @__PURE__ */ React.createElement(CubeIcon_default, {
        className: classes
      });
    }
    case "array": {
      return /* @__PURE__ */ React.createElement(CollectionIcon_default, {
        className: classes
      });
    }
    case "null": {
      return /* @__PURE__ */ React.createElement(EyeOffIcon_default, {
        className: classes
      });
    }
    case "bool": {
      return /* @__PURE__ */ React.createElement(CheckCircleIcon_default, {
        className: classes
      });
    }
    case "int": {
      if (type.format == null) {
        return /* @__PURE__ */ React.createElement(HashtagIcon_default, {
          className: classes
        });
      }
      switch (type.format.name) {
        case "timestamp": {
          return /* @__PURE__ */ React.createElement(CalendarIcon_default, {
            className: classes
          });
        }
      }
    }
    case "float": {
      return /* @__PURE__ */ React.createElement(HashtagIcon_default, {
        className: classes
      });
    }
    case "string": {
      if (type.format == null) {
        return /* @__PURE__ */ React.createElement(StringIcon, {
          className: classes
        });
      }
      switch (type.format.name) {
        case "timestamp": {
          return /* @__PURE__ */ React.createElement(CalendarIcon_default, {
            className: classes
          });
        }
        case "datetime": {
          switch (type.format.parts) {
            case "time":
              return /* @__PURE__ */ React.createElement(ClockIcon_default, {
                className: classes
              });
          }
          return /* @__PURE__ */ React.createElement(CalendarIcon_default, {
            className: classes
          });
        }
        case "email": {
          return /* @__PURE__ */ React.createElement(AtSymbolIcon_default, {
            className: classes
          });
        }
        case "hostname":
        case "tld":
        case "ip": {
          return /* @__PURE__ */ React.createElement(GlobeAltIcon_default, {
            className: classes
          });
        }
        case "uri": {
          switch (type.format.contentType) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
            case "image/webm":
              return /* @__PURE__ */ React.createElement(PhotographIcon_default, {
                className: classes
              });
            case "application/json":
              return /* @__PURE__ */ React.createElement(CodeIcon_default, {
                className: classes
              });
            default:
              return /* @__PURE__ */ React.createElement(GlobeAltIcon_default, {
                className: classes
              });
          }
        }
        case "phoneNumber": {
          return /* @__PURE__ */ React.createElement(PhoneIcon_default, {
            className: classes
          });
        }
        case "currency": {
          return /* @__PURE__ */ React.createElement(CurrencyDollarIcon_default, {
            className: classes
          });
        }
        case "country": {
          return /* @__PURE__ */ React.createElement(GlobeIcon_default, {
            className: classes
          });
        }
        case "emoji": {
          return /* @__PURE__ */ React.createElement(EmojiHappyIcon_default, {
            className: classes
          });
        }
        case "language": {
          return /* @__PURE__ */ React.createElement(ChatAlt2Icon_default, {
            className: classes
          });
        }
        case "filesize": {
          return /* @__PURE__ */ React.createElement(ArchiveIcon_default, {
            className: classes
          });
        }
        case "uuid": {
          return /* @__PURE__ */ React.createElement(IdentificationIcon_default, {
            className: classes
          });
        }
        case "json":
        case "jsonPointer": {
          return /* @__PURE__ */ React.createElement(CodeIcon_default, {
            className: classes
          });
        }
        case "jwt": {
          return /* @__PURE__ */ React.createElement(KeyIcon_default, {
            className: classes
          });
        }
        case "semver": {
          return /* @__PURE__ */ React.createElement(DocumentTextIcon_default, {
            className: classes
          });
        }
        case "color": {
          return /* @__PURE__ */ React.createElement(ColorSwatchIcon_default, {
            className: classes
          });
        }
        case "creditcard": {
          switch (type.format.variant) {
            case "visa": {
              return /* @__PURE__ */ React.createElement(CreditCardIcon_default, {
                className: classes
              });
            }
            case "mastercard": {
              return /* @__PURE__ */ React.createElement(CreditCardIcon_default, {
                className: classes
              });
            }
            case "amex": {
              return /* @__PURE__ */ React.createElement(CreditCardIcon_default, {
                className: classes
              });
            }
            case "discover": {
              return /* @__PURE__ */ React.createElement(CreditCardIcon_default, {
                className: classes
              });
            }
            case "dinersclub": {
              return /* @__PURE__ */ React.createElement(CreditCardIcon_default, {
                className: classes
              });
            }
            default:
              return /* @__PURE__ */ React.createElement(CreditCardIcon_default, {
                className: classes
              });
          }
        }
      }
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
};

// app/components/Properties/PropertiesInt.tsx
function PropertiesInt({ type }) {
  var _a;
  if (type.format == null) {
    return /* @__PURE__ */ React.createElement(DataTable, {
      rows: [
        {
          key: "Formatted value",
          value: (_a = formatValue(type)) != null ? _a : "",
          icon: /* @__PURE__ */ React.createElement(ValueIcon, {
            type
          })
        },
        {
          key: "Type",
          value: type.name
        }
      ]
    });
  }
  switch (type.format.name) {
    case "timestamp":
      return /* @__PURE__ */ React.createElement(PropertiesTimestamp, {
        value: type.value,
        format: type.format
      });
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
function PropertiesTimestamp({
  value,
  format
}) {
  const date = format.variant === "millisecondsSinceEpoch" ? new Date(value) : format.variant === "secondsSinceEpoch" ? new Date(value * 1e3) : new Date(value / 1e6);
  const properties = [
    {
      key: "rfc3339",
      value: date.toISOString()
    },
    {
      key: "rfc2822",
      value: date.toUTCString()
    },
    {
      key: "unix",
      value: (date.getTime() / 1e3).toFixed(0)
    },
    {
      key: "unix ms",
      value: date.getTime().toString()
    },
    {
      key: "date",
      value: date.toDateString()
    },
    {
      key: "time",
      value: date.toTimeString()
    }
  ];
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: properties
  });
}

// app/components/Properties/PropertiesFloat.tsx
init_react();
function PropertiesFloat(info) {
  var _a;
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: [
      {
        key: "Formatted value",
        value: (_a = formatValue(info.type)) != null ? _a : "",
        icon: /* @__PURE__ */ React.createElement(ValueIcon, {
          type: info.type
        })
      },
      {
        key: "Type",
        value: info.type.name
      }
    ]
  });
}

// app/components/Properties/PropertiesString.tsx
init_react();
var import_color2 = __toESM(require_color());
init_jwt_decode_esm();
function PropertiesString({ type }) {
  if (type.format == null) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  switch (type.format.name) {
    case "uri":
      return /* @__PURE__ */ React.createElement(PropertiesUri, {
        value: type.value,
        format: type.format
      });
    case "color":
      return /* @__PURE__ */ React.createElement(PropertiesColor, {
        value: type.value,
        format: type.format
      });
    case "datetime":
      return /* @__PURE__ */ React.createElement(PropertiesDateTime, {
        value: type.value,
        format: type.format
      });
    case "timestamp":
      return /* @__PURE__ */ React.createElement(PropertiesTimestamp2, {
        value: type.value,
        format: type.format
      });
    case "jwt":
      return /* @__PURE__ */ React.createElement(PropertiesJwt, {
        value: type.value,
        format: type.format
      });
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
function PropertiesJwt({
  value,
  format
}) {
  const properties = [];
  const decodedPayload = jwt_decode_esm_default(value);
  for (const [key, value2] of Object.entries(decodedPayload)) {
    properties.push({
      key,
      value: value2
    });
  }
  const decodedHeader = jwt_decode_esm_default(value, { header: true });
  for (const [key, value2] of Object.entries(decodedHeader)) {
    properties.push({
      key,
      value: value2
    });
  }
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: properties
  });
}
function PropertiesTimestamp2({
  value,
  format
}) {
  const date = format.variant === "millisecondsSinceEpoch" ? new Date(parseInt(value)) : format.variant === "secondsSinceEpoch" ? new Date(parseInt(value) * 1e3) : new Date(parseInt(value) / 1e6);
  const properties = [
    {
      key: "rfc3339",
      value: date.toISOString()
    },
    {
      key: "rfc2822",
      value: date.toUTCString()
    },
    {
      key: "unix",
      value: (date.getTime() / 1e3).toFixed(0)
    },
    {
      key: "unix ms",
      value: date.getTime().toString()
    },
    {
      key: "date",
      value: date.toDateString()
    },
    {
      key: "time",
      value: date.toTimeString()
    }
  ];
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: properties
  });
}
function PropertiesDateTime({
  value,
  format
}) {
  if (format.parts === "time") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  const temporal2 = inferTemporal(value, format);
  if (!temporal2) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  const properties = [
    {
      key: "rfc3339",
      value: temporal2.toString()
    }
  ];
  if ("epochSeconds" in temporal2) {
    properties.push({
      key: "unix",
      value: temporal2.epochSeconds.toString()
    });
  }
  if ("epochMilliseconds" in temporal2) {
    properties.push({
      key: "unix ms",
      value: temporal2.epochMilliseconds.toString()
    });
  }
  properties.push({
    key: "date",
    value: temporal2.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  });
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: properties
  });
}
function PropertiesColor({
  value,
  format
}) {
  const color = new import_color2.default(value);
  const properties = [
    {
      key: "hex",
      value: color.hex()
    },
    {
      key: "rgb",
      value: color.rgb().string()
    },
    {
      key: "hsl",
      value: color.hsl().string()
    },
    {
      key: "luminosity",
      value: color.luminosity().toFixed(4)
    },
    {
      key: "contrastRatio",
      value: color.isLight() ? "light" : "dark"
    }
  ];
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: properties
  });
}
function PropertiesUri({
  value,
  format
}) {
  let uri = new URL(value);
  let standardProperties = [
    {
      key: "href",
      value: uri.href
    },
    {
      key: "origin",
      value: uri.origin
    },
    {
      key: "protocol",
      value: uri.protocol
    },
    {
      key: "hostname",
      value: uri.hostname
    },
    {
      key: "pathname",
      value: uri.pathname
    }
  ];
  if (uri.search) {
    standardProperties.push({
      key: "search",
      value: uri.search
    });
  }
  if (uri.hash) {
    standardProperties.push({
      key: "hash",
      value: uri.hash
    });
  }
  if (format.contentType != null) {
    standardProperties.push({
      key: "mimeType",
      value: format.contentType
    });
  }
  return /* @__PURE__ */ React.createElement(DataTable, {
    rows: standardProperties
  });
}

// app/components/Properties/PropertiesValue.tsx
function PropertiesValue() {
  const info = useSelectedInfo();
  if (!info) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  switch (info.name) {
    case "float":
      return /* @__PURE__ */ React.createElement(PropertiesFloat, {
        type: info
      });
    case "int":
      return /* @__PURE__ */ React.createElement(PropertiesInt, {
        type: info
      });
    case "string":
      return /* @__PURE__ */ React.createElement(PropertiesString, {
        type: info
      });
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}

// app/utilities/classnames.ts
init_react();
function classnames(...args) {
  return args.filter(Boolean).join(" ");
}

export {
  ExtraLargeTitle,
  SmallSubtitle,
  CopyTextButton,
  JsonPreview,
  CodeViewer,
  PreviewValue,
  ValueIcon,
  PropertiesValue,
  classnames
};
//# sourceMappingURL=/build/_shared/chunk-D3QV33FR.js.map
