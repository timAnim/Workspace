import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// app/components/StarCountProvider.tsx
init_react();
var import_react = __toESM(require_react());
var StarCountContext = (0, import_react.createContext)(void 0);
function StarCountProvider({
  children,
  starCount
}) {
  return /* @__PURE__ */ React.createElement(StarCountContext.Provider, {
    value: starCount
  }, children);
}
function useStarCount() {
  return (0, import_react.useContext)(StarCountContext);
}

export {
  StarCountProvider,
  useStarCount
};
//# sourceMappingURL=/build/_shared/chunk-2VHYU7Q2.js.map
