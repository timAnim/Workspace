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
  json
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\actions\$id\update.ts?browser
init_react();

// app/routes/actions/$id/update.ts
init_react();
var import_graphJSON = __toESM(require_graphJSON());
var import_jsonDoc = __toESM(require_jsonDoc());
var action = async ({ params, request, context }) => {
  invariant(params.id, "expected params.id");
  const title = (await request.formData()).get("title");
  invariant(typeof title === "string", "expected title");
  try {
    const document = await (0, import_jsonDoc.updateDocument)(params.id, title);
    if (!document)
      return json({ error: "No document with that slug" });
    context.waitUntil((0, import_graphJSON.sendEvent)({
      type: "update-doc",
      id: document.id,
      title
    }));
    return json(document);
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message });
    } else {
      return json({ error: "Unknown error" });
    }
  }
};
export {
  action
};
//# sourceMappingURL=/build/routes/actions/$id/update-E7HRBWUC.js.map
