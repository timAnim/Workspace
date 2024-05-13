import {
  isTheme
} from "/build/_shared/chunk-LZBJICSD.js";
import {
  require_graphJSON
} from "/build/_shared/chunk-5QGTWAOD.js";
import {
  json,
  redirect
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// empty-module:~/theme.server
var require_theme = __commonJS({
  "empty-module:~/theme.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\actions\setTheme.ts?browser
init_react();

// app/routes/actions/setTheme.ts
init_react();
var import_theme = __toESM(require_theme());
var import_graphJSON = __toESM(require_graphJSON());
var action = async ({ request, context }) => {
  const themeSession = await (0, import_theme.getThemeSession)(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");
  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`
    });
  }
  themeSession.setTheme(theme);
  context.waitUntil((0, import_graphJSON.sendEvent)({
    type: "set-theme",
    theme
  }));
  return json({ success: true }, { headers: { "Set-Cookie": await themeSession.commit() } });
};
var loader = () => redirect("/", { status: 404 });
export {
  action,
  loader
};
//# sourceMappingURL=/build/routes/actions/setTheme-MF7GQ3JQ.js.map
