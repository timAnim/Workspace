import {
  require_jsonDoc
} from "/build/_shared/chunk-VBPSB3Y6.js";
import {
  invariant
} from "/build/_shared/chunk-IW4CVGHS.js";
import {
  require_graphJSON
} from "/build/_shared/chunk-5QGTWAOD.js";
import {
  redirect
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\new.tsx?browser
init_react();

// app/routes/new.tsx
init_react();
var import_graphJSON = __toESM(require_graphJSON());
var import_jsonDoc = __toESM(require_jsonDoc());
var loader = async ({ request, context }) => {
  var _a;
  const url = new URL(request.url);
  const jsonUrl = url.searchParams.get("url");
  const base64EncodedJson = url.searchParams.get("j");
  const ttl = url.searchParams.get("ttl");
  const readOnly = url.searchParams.get("readonly");
  const title = url.searchParams.get("title");
  const injest = url.searchParams.get("injest");
  if (!jsonUrl && !base64EncodedJson) {
    return redirect("/");
  }
  const options = {};
  if (typeof ttl === "string") {
    invariant(ttl.match(/^\d+$/), "ttl must be a number");
    options.ttl = parseInt(ttl, 10);
    invariant(options.ttl >= 60, "ttl must be at least 60 seconds");
  }
  if (typeof readOnly === "string") {
    options.readOnly = readOnly === "true";
  }
  if (typeof injest === "string") {
    options.injest = injest === "true";
  }
  if (jsonUrl) {
    const jsonURL = new URL(jsonUrl);
    invariant(jsonURL, "url must be a valid URL");
    const doc = await (0, import_jsonDoc.createFromUrl)(jsonURL, title != null ? title : jsonURL.href, options);
    context.waitUntil((0, import_graphJSON.sendEvent)({
      type: "create",
      from: "url",
      hostname: jsonURL.hostname,
      id: doc.id,
      source: (_a = url.searchParams.get("utm_source")) != null ? _a : url.hostname
    }));
    return redirect(`/j/${doc.id}`);
  }
  if (base64EncodedJson) {
    const doc = await (0, import_jsonDoc.createFromRawJson)(title != null ? title : "Untitled", atob(base64EncodedJson), options);
    context.waitUntil((0, import_graphJSON.sendEvent)({
      type: "create",
      from: "base64",
      id: doc.id,
      source: url.searchParams.get("utm_source")
    }));
    return redirect(`/j/${doc.id}`);
  }
};
export {
  loader
};
//# sourceMappingURL=/build/routes/new-PYT7SZLD.js.map
