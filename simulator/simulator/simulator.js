const { connect, StringCodec } = require("nats");
const http = require("http");
const fs = require("fs");
const path = require("path");
// const NATS_SERVER = "127.0.0.1";
const NATS_PORT = 6882;
const SERVER_PORT = 20001;
const NATS_SERVER = "120.77.54.131";

async function Publish(data) {
  // to create a connection to a nats-server:
  const nc = await connect({ servers: `${NATS_SERVER}:${NATS_PORT}` });
  // create a codec
  const sc = StringCodec();
  // create a simple subscriber and iterate over messages
  // matching the subscription
  // const sub = nc.subscribe("xboard");
  // (async () => {
  //     for await (const m of sub) {
  //         console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  //     }
  //     console.log("subscription closed");
  // })();

  // console.log(data);
  // console.log(data.values[1]);

  // 此处需要 字符串格式
  nc.publish("xboard", sc.encode(JSON.stringify(data)));

  await nc.drain();
}

async function handleRequest(req, res) {
  const method = req.method;

  if (req.url === "/favicon.ico") {
    // 处理 /favicon.ico 请求
    res.statusCode = 200;
    res.end();
    return;
  }

  if (method == "GET") {
    let data = fs.readFileSync(path.resolve(__dirname, "simulator.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
    return;
  }

  if (method == "PUT") {
    let body = "";
    req.on("data", function (dt) {
      body += dt;
    });
    req.on("end", function () {
      fetchItems((item) => {
        res.statusCode = 200;
        res.end(item);
      });
    });
  }

  if (method == "POST") {
    let body = "";
    req.on("data", function (dt) {
      body += dt;
    });
    req.on("end", function () {
      try {
        // 连接 nats
        Publish(JSON.parse(body).data);
        console.log("Data written to nats");
        res.statusCode = 200;
        res.end("Success");
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(error.toString('utf8'));
      } finally {
      }
    });
  }

  return false;

  // 解析 URL 参数
  const urlParams = new URLSearchParams(req.url.slice(1));
  // 获取前端传递的参数
  const dev_id = urlParams.get("dev_id");
  console.log(dev_id);
  if (!dev_id) {
    console.error("dev_id is null");
    res.statusCode = 400;
    res.end("dev_id is null");
    return;
  }
}

function fetchItems(cb) {
  const dt = {
    resource_id: "0_20279",
    relation_code: "5",
    where: [
      {
        terms: [
          { field: "ci_type", operator: "eq", value: "3" },
          { field: "spot_type", operator: "eq", value: "2" },
          { field: "data_source", operator: "eq", value: "0" },
        ],
      },
    ],
    page: { number: 1, size: 200 },
  };

  const options = {
    host: "td.yunyunwei.com",
    port: 80,
    path: "/api/v2/cmdb/resources/relations",
    method: "POST",
    headers: {
      COOKIE: "DCIM_ACCOUNT=admin",
    },
  };

  const req = http.request(options, (res) => {
    let body = "";
    res.on("data", (dt) => {
      body += dt;
    });
    res.on('end',t=>{
      cb(body.toString('utf8'));
    })
  });

  req.write(JSON.stringify(dt));
  req.end();
}

// 创建 HTTP 服务器
const server = http.createServer(handleRequest);

// 启动服务器
server.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}`);
});
