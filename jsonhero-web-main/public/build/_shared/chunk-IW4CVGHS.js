import {
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// node_modules/tiny-invariant/dist/tiny-invariant.esm.js
init_react();
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? prefix + ": " + provided : prefix;
  throw new Error(value);
}

export {
  invariant
};
//# sourceMappingURL=/build/_shared/chunk-IW4CVGHS.js.map
