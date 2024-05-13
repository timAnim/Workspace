import {
  require_jsonDoc
} from "/build/_shared/chunk-VBPSB3Y6.js";
import {
  invariant
} from "/build/_shared/chunk-IW4CVGHS.js";
import {
  json
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\j\$id[.json].ts?browser
init_react();

// app/routes/j/$id[.json].ts
init_react();
var import_jsonDoc = __toESM(require_jsonDoc());
var loader = async ({ params, request }) => {
  invariant(params.id, "expected params.id");
  const doc = await (0, import_jsonDoc.getDocument)(params.id);
  if (!doc) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  if (doc.type == "url") {
    const jsonResponse = await fetch(doc.url);
    return jsonResponse.json();
  } else {
    return json(JSON.parse(doc.contents));
  }
};
export {
  loader
};
//# sourceMappingURL=/build/routes/j/$id[.json]-57KM6KAW.js.map
