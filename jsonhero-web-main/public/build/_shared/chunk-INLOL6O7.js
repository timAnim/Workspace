import {
  inferType,
  init_lib,
  require_lib
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// app/utilities/colors.ts
init_react();
init_lib();
var import_path = __toESM(require_lib());
function colorForTypeName(typeName) {
  switch (typeName) {
    case "object": {
      return "text-emerald-500";
    }
    case "array": {
      return "text-cyan-500";
    }
    case "null": {
      return "text-stone-400";
    }
    case "bool": {
      return "text-rose-500";
    }
    case "int":
    case "float": {
      return "text-amber-500";
    }
    case "string": {
      return "text-indigo-500";
    }
    default: {
      return "";
    }
  }
}
function colorForItemAtPath(path, json) {
  const heroPath = new import_path.JSONHeroPath(path);
  const value = heroPath.first(json);
  const item = inferType(value);
  return colorForTypeName(item.name);
}

export {
  colorForTypeName,
  colorForItemAtPath
};
//# sourceMappingURL=/build/_shared/chunk-INLOL6O7.js.map
