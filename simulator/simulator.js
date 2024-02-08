const { connect, StringCodec } = require("nats");
const http = require("http");
const fs = require("fs");
const SERVER = '120.77.54.131:6882'

async function Publish(data) {
  // to create a connection to a nats-server:
  // const nc = await connect({ servers: "183.62.156.215:15087" });
  console.log('begin to connect ' + SERVER);
  const nc = await connect({ servers: SERVER });
  console.log(`connected to ${nc.getServer()}`);
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


  console.log(JSON.parse(data))
  
  nc.publish("xboard", sc.encode(data));

  // we want to insure that messages that are in flight
  // get processed, so we are going to drain the
  // connection. Drain is the same as close, but makes
  // sure that all messages in flight get seen
  // by the iterator. After calling drain on the connection
  // the connection closes.
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
    let data = fs.readFileSync("./simulator.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
    return
  }

  if (method == "POST") {
    let body = "";
    req.on("data", function (dt) {
      body += dt;
    });
    req.on("end", function () {
      // body = JSON.parse(body);

      Publish(body);
      res.end("SUCCESS");
      return
    });
  }


  return false;

  // 解析 URL 参数
  const urlParams = new URLSearchParams(req.url.slice(1));
  // 获取前端传递的参数
  const dev_id = urlParams.get("dev_id") || "19926";
  console.log(dev_id);
  if (!dev_id) {
    console.error("dev_id is null");
    res.statusCode = 400;
    res.end("dev_id is null");
    return;
  }

  try {
    // 连接 nats
    await Publish(spots);
    console.log("Data written to nats");
    res.statusCode = 200;
    res.end("Success");
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end(error.toString());
  } finally {
  }
}

// 创建 HTTP 服务器
const server = http.createServer(handleRequest);

// 启动服务器
const port = 60001;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
