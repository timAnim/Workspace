import {
  inferType,
  init_lib,
  require_lib,
  useJson,
  useJsonColumnViewState
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// app/hooks/useSelectedInfo.tsx
init_react();
init_lib();
var import_path = __toESM(require_lib());
var import_react = __toESM(require_react());
function useSelectedInfo() {
  const { selectedNodeId } = useJsonColumnViewState();
  if (!selectedNodeId) {
    return;
  }
  const [json] = useJson();
  return (0, import_react.useMemo)(() => {
    const heroPath = new import_path.JSONHeroPath(selectedNodeId);
    const selectedJson = heroPath.first(json);
    return inferType(selectedJson);
  }, [json, selectedNodeId]);
}

export {
  useSelectedInfo
};
//# sourceMappingURL=/build/_shared/chunk-CCCYTS2U.js.map
