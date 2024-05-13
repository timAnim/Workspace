import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// app/components/PreferencesProvider.tsx
init_react();
var import_react = __toESM(require_react());
var PreferencesDefaults = {
  indent: 2
};
var PreferencesContext = (0, import_react.createContext)(void 0);
var loadPreferences = () => {
  const savedPreferences = localStorage.getItem("preferences");
  const parsedPreferences = JSON.parse(savedPreferences || "{}");
  for (const [key, value] of Object.entries(PreferencesDefaults)) {
    if (!parsedPreferences[key])
      parsedPreferences[key] = value;
  }
  return parsedPreferences;
};
var savePreferences = (preferences) => localStorage.setItem("preferences", JSON.stringify(preferences));
function PreferencesProvider({
  children
}) {
  const [preferences, setPreferences] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    const preferences2 = loadPreferences();
    setPreferences(preferences2);
  }, []);
  (0, import_react.useEffect)(() => {
    if (preferences === void 0)
      return;
    savePreferences(preferences);
  }, [preferences]);
  return /* @__PURE__ */ React.createElement(PreferencesContext.Provider, {
    value: [preferences, setPreferences]
  }, children);
}
function usePreferences() {
  const context = (0, import_react.useContext)(PreferencesContext);
  if (context === void 0) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}

export {
  PreferencesProvider,
  usePreferences
};
//# sourceMappingURL=/build/_shared/chunk-CMQL53DO.js.map
