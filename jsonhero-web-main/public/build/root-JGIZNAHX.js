import {
  StarCountProvider
} from "/build/_shared/chunk-2VHYU7Q2.js";
import {
  PreferencesProvider
} from "/build/_shared/chunk-CMQL53DO.js";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme
} from "/build/_shared/chunk-LZBJICSD.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// empty-module:./theme.server
var require_theme = __commonJS({
  "empty-module:./theme.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// empty-module:./services/github.server
var require_github = __commonJS({
  "empty-module:./services/github.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:E:\Workspace\jsonhero-web-main\app\root.tsx?browser
init_react();

// app/root.tsx
init_react();

// node_modules/clsx/dist/clsx.m.js
init_react();
function toVal(mix) {
  var k, y, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += " ");
          str += k;
        }
      }
    }
  }
  return str;
}
function clsx_m_default() {
  var i = 0, tmp, x, str = "";
  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x = toVal(tmp)) {
        str && (str += " ");
        str += x;
      }
    }
  }
  return str;
}

// app/assets/images/opengraph.png
var opengraph_default = "/build/_assets/opengraph-P6EWTI3J.png";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-KYAJKEQ2.css";

// app/root.tsx
var import_theme = __toESM(require_theme());
var import_github = __toESM(require_github());
var meta = ({ location }) => {
  const description = "JSON Hero makes reading and understand JSON files easy by giving you a clean and beautiful UI packed with extra features.";
  return {
    title: "JSON Hero - a beautiful JSON viewer for the web",
    viewport: "width=device-width,initial-scale=1",
    description,
    "og:image": `https://jsonhero.io${opengraph_default}`,
    "og:url": `https://jsonhero.io${location.pathname}`,
    "og:title": "JSON Hero - A beautiful JSON viewer",
    "og:description": description,
    "twitter:image": `https://jsonhero.io${opengraph_default}`,
    "twitter:card": "summary_large_image",
    "twitter:creator": "@json_hero",
    "twitter:site": "@json_hero",
    "twitter:title": "JSON Hero",
    "twitter:description": description
  };
};
function links() {
  return [{ rel: "stylesheet", href: tailwind_default }];
}
function App() {
  const [theme] = useTheme();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en",
    className: clsx_m_default(theme)
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement(Links, null), /* @__PURE__ */ React.createElement(NonFlashOfWrongThemeEls, {
    ssrTheme: Boolean(theme)
  })), /* @__PURE__ */ React.createElement("body", {
    className: "overscroll-none"
  }, /* @__PURE__ */ React.createElement(Outlet, null), /* @__PURE__ */ React.createElement(ScrollRestoration, null), /* @__PURE__ */ React.createElement(Scripts, null), /* @__PURE__ */ React.createElement(LiveReload, null)));
}
function AppWithProviders() {
  const { theme, starCount, themeOverride } = useLoaderData();
  const location = useLocation();
  const forceDarkMode = location.pathname === "/";
  return /* @__PURE__ */ React.createElement(ThemeProvider, {
    specifiedTheme: theme,
    themeOverride: forceDarkMode ? "dark" : themeOverride
  }, /* @__PURE__ */ React.createElement(PreferencesProvider, null, /* @__PURE__ */ React.createElement(StarCountProvider, {
    starCount
  }, /* @__PURE__ */ React.createElement(App, null))));
}
export {
  AppWithProviders as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-JGIZNAHX.js.map
