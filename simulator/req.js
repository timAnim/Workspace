const http = require("http");

const dt = {
  where: [
    { terms: [{ field: "resource_id", operator: "eq", value: "0_20279" }] },
  ],
};

const options = {
  host: "td.yunyunwei.com",
  port: 80,
  path: "/api/v2/cmdb/resources/items",
  method: "POST",
  headers: {
    COOKIE: "DCIM_ACCOUNT=admin",
  },
};

const req = http.request(options, (res) => {
  console.log(res);
  res.on("data", (data) => {
    console.log(data.toString());
  });
});

req.write(JSON.stringify(dt));
req.end();
