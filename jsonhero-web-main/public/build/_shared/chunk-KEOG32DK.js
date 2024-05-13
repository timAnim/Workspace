import {
  useSelectedInfo
} from "/build/_shared/chunk-CCCYTS2U.js";
import {
  useHotkeys
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  React,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// app/components/CopySelectedNode.tsx
init_react();
function CopySelectedNodeShortcut() {
  const selectedInfo = useSelectedInfo();
  useHotkeys("shift+c,shift+C", (e) => {
    e.preventDefault();
    const selectedJSON = (selectedInfo == null ? void 0 : selectedInfo.name) === "string" ? selectedInfo == null ? void 0 : selectedInfo.value : JSON.stringify(selectedInfo == null ? void 0 : selectedInfo.value, null, 2);
    navigator.clipboard.writeText(selectedJSON);
  }, [selectedInfo]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
}

export {
  CopySelectedNodeShortcut
};
//# sourceMappingURL=/build/_shared/chunk-KEOG32DK.js.map
