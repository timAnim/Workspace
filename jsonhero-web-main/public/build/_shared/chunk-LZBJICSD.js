import {
  useFetcher
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// app/components/ThemeProvider.tsx
init_react();
var import_react = __toESM(require_react());
var ThemeContext = (0, import_react.createContext)(void 0);
var prefersLightMQ = "(prefers-color-scheme: light)";
var getPreferredTheme = () => window.matchMedia(prefersLightMQ).matches ? "light" : "dark";
function ThemeProvider({
  children,
  specifiedTheme,
  themeOverride
}) {
  const [theme, setTheme] = (0, import_react.useState)(() => {
    if (specifiedTheme) {
      if (specifiedTheme === "light" || specifiedTheme === "dark") {
        return specifiedTheme;
      } else {
        return;
      }
    }
    if (typeof window !== "object") {
      return;
    }
    return getPreferredTheme();
  });
  const mountRun = (0, import_react.useRef)(false);
  const persistTheme = useFetcher();
  (0, import_react.useEffect)(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }
    persistTheme.submit({ theme }, { action: "actions/setTheme", method: "post" });
  }, [theme]);
  return /* @__PURE__ */ React.createElement(ThemeContext.Provider, {
    value: [themeOverride != null ? themeOverride : theme, setTheme]
  }, children);
}
function useTheme() {
  const context = (0, import_react.useContext)(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
var clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightMQ)}).matches
    ? 'light'
    : 'dark';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let us know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
})();
`;
function NonFlashOfWrongThemeEls({ ssrTheme }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, ssrTheme ? null : /* @__PURE__ */ React.createElement("script", {
    dangerouslySetInnerHTML: { __html: clientThemeCode }
  }));
}
function isTheme(value) {
  return typeof value === "string" && ["light", "dark"].includes(value);
}

export {
  ThemeProvider,
  useTheme,
  NonFlashOfWrongThemeEls,
  isTheme
};
//# sourceMappingURL=/build/_shared/chunk-LZBJICSD.js.map
