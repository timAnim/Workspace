const { connect, StringCodec } = require("nats");
const http = require('http');

async function Publish(resourceId, value) {
    // to create a connection to a nats-server:
    const nc = await connect({ servers: "120.77.54.131:6882" });
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


    const data = {
        // real_value: value,
        // resource_id: resourceId,
        spots: [
            {
                real_value: value,
                resource_id: resourceId,
                status: 1,
                timestamp: Math.floor(Date.now() / 1000),
            },
        ],
    };
    console.log(data)

    nc.publish("xboard", sc.encode(JSON.stringify(data)));

// we want to insure that messages that are in flight
// get processed, so we are going to drain the
// connection. Drain is the same as close, but makes
// sure that all messages in flight get seen
// by the iterator. After calling drain on the connection
// the connection closes.
    await nc.drain();
}

async function handleRequest(req, res) {
    if (req.url === '/favicon.ico') {
        // 处理 /favicon.ico 请求
        res.statusCode = 200;
        res.end();
        return;
    }

    // 解析 URL 参数
    const urlParams = new URLSearchParams(req.url.slice(1));
    // 获取前端传递的参数
    const resourceId = urlParams.get('resource_id');
    const value = urlParams.get('value');
    if (!resourceId) {
        console.error("resource_id is null")
        res.statusCode = 400;
        res.end('resource_id is null');
        return
    }

    try {
        // 连接 nats
        await Publish(resourceId, value)
        console.log('Data written to nats');
        res.statusCode = 200;
        res.end('Success');
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
const port = 3001;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});