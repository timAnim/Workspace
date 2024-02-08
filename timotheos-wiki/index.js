const fs = require("fs");
const request = require("request");
const path = require("path");
const msg_templates = require("./templates/msg_templates");

let td_prd_hook =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ab13ad44-4ced-4d9d-9538-3e892005b793";

let td_qa_hook =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=8091c49e-fec6-4e52-bbbd-b7d562e0a7ed";

let hcce_prd_hook =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=be72f87d-26ea-4302-97d9-11e17880162f";

let hcce_qa_hook =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=32eb5323-cd46-485c-980f-c277d85344a9";

let uxc_qa_hook = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=993eb4ee-7eb2-4e93-bb7f-57373f8563c2"

let uxc_prd_hook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=993eb4ee-7eb2-4e93-bb7f-57373f8563c2'

let cfg_qa_hook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1b5f2fd8-fee8-42d9-a3af-705e2fc1a75d'
let cfg_prd_hook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1b5f2fd8-fee8-42d9-a3af-705e2fc1a75d'

const msg_urls = {
  td_prd_hook,
  td_qa_hook,
  hcce_prd_hook,
  hcce_qa_hook,
  uxc_qa_hook,
  uxc_prd_hook,
  cfg_qa_hook,
  cfg_prd_hook,
};

let send_msg = {};
let send_url = "";

let inp_product, inp_env, inp_content;

function sendMsgTemplate(product, env, content) {
  send_msg = msg_templates[`${product}_${content}_msg`];
  send_url = msg_urls[`${product}_${env}_hook`];
  send_msg = JSON.stringify(send_msg)
  send_msg = JSON.parse(send_msg)

  console.log(`${product}_${content}_msg`, `${product}_${env}_hook`);
  request(
    {
      url: send_url,
      method: "POST",
      json: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: send_msg,
    },
    (err, res, body) => {
      console.log(body);
    }
  );

}

let img = fs.readFileSync(path.resolve(__dirname, "resources", "img.png"));
img = img.toString("base64");

var txt_msg = {
  msgtype: "text",
  text: {
    content: "广州今日天气：29度，大部分多云，降雨概率：60%",
    mentioned_list: ["@all"],
    mentioned_mobile_list: ["18898749499", "@all"],
  },
};

var md_msg = {
  msgtype: "markdown",
  markdown: {
    content: `# 云端渲染
        # 市场
        市场规模：
        竞品分析：优锘
        # 用户
        行销、交行、电信昌平、客户
        # 痛点
        没有配置显卡的电脑无法3D查看、DEMO体验
        # 功能
        1. 【本地】园区场景首次加载，旋转
        2. 【本地】点击楼栋，跳转到楼栋场景
        3. 【本地】楼栋场景，加载，旋转
        4. 【本地】回到园区场景
        5. 【本地】点击工具栏、云端渲染
        6. 【云端】园区场景首次加载，旋转
        7. 【云端】点击楼栋，跳转到楼栋场景
        8. 【云端】楼栋场景，加载，旋转
        9. 分屏对比场景旋转
        # 价值
        - 降低显卡硬件要求，从3060到集成显卡
        - 提升加载效率，从8s到0s`,
  },
};

var img_msg = {
  msgtype: "image",
  image: {
    base64: "data:image/png;base64," + img,
    md5: "MD5",
  },
};

var img_txt_msg = {
  msgtype: "news",
  news: {
    articles: [
      {
        title: "数字孪生系统_TDTDVS_C30使用说明书",
        description: "【用户】",
        url: "http://edoc2.xbrother.com:8086/outpublish.html?code=Ad7971eddacb64330920c2648509c5cc7&lang=zh-cn#view",
        picurl:
          "https://file.notion.so/f/s/30f3244b-e1a3-417b-8acc-2a6088b9a855/%E7%99%BD%E7%9A%AE%E4%B9%A6.png?id=43c9ad2e-f46e-4b30-99be-2041dd12e19d&table=block&spaceId=4521e4d1-c319-42f8-8741-f96e99b832d3&expirationTimestamp=1688191200000&signature=6x60n_0zTjVXG7Rsfs5yV4WiJv6gb_pQgjWlMlaak1o&downloadName=%E7%99%BD%E7%9A%AE%E4%B9%A6.png",
      },
      {
        title: "3D场景管理_TDCE_C30使用说明书",
        description: "【工程配置】",
        url: "http://edoc2.xbrother.com:8086/outpublish.html?code=Adb7052a057c347399b5c7f3c05dcb683&lang=zh-cn#view",
        picurl:
          "https://file.notion.so/f/s/01dae9cd-f9d7-4d25-80db-ad77269006eb/wmfsg50-4sehi3sgqwjjl.png?id=3f3c7637-63da-4ddc-a24c-eeecf854fbb4&table=block&spaceId=4521e4d1-c319-42f8-8741-f96e99b832d3&expirationTimestamp=1688184000000&signature=kLqq5xLxQFvnbpuHU5GU_TBAKsRWbUH3u1vix7fQHSU&downloadName=wmfsg50-4sehi3sgqwjjl.png",
      },
      {
        title: "3D场景管理_TDCE_C30使用说明书",
        description: "【工程配置】",
        url: "http://edoc2.xbrother.com:8086/outpublish.html?code=Adb7052a057c347399b5c7f3c05dcb683&lang=zh-cn#view",
        picurl:
          "https://file.notion.so/f/s/01dae9cd-f9d7-4d25-80db-ad77269006eb/wmfsg50-4sehi3sgqwjjl.png?id=3f3c7637-63da-4ddc-a24c-eeecf854fbb4&table=block&spaceId=4521e4d1-c319-42f8-8741-f96e99b832d3&expirationTimestamp=1688184000000&signature=kLqq5xLxQFvnbpuHU5GU_TBAKsRWbUH3u1vix7fQHSU&downloadName=wmfsg50-4sehi3sgqwjjl.png",
      },
    ],
  },
};

var fl_msg = {
  msgtype: "file",
  file: {
    media_id:
      "3B8TKMDdKR75UEGawjlGojhifT5jGX2-lY07baqyJkdXSScg-iDAD17MrCYhwU3RK",
  },
};

function askForProduct() {
  process.stdin.resume();
  process.stdout.write("请选择产品（td/hcce/uxc/cfg）: ");
  process.stdin.once("data", function (data) {
    inp_product = data.toString().trim();
    askForEnv();
  });
}

function askForEnv() {
  process.stdin.resume();
  process.stdout.write("是否是测试（y/n）: ");
  process.stdin.once("data", function (data) {
    inp_env = data.toString().trim() == "y" ? "qa" : "prd";
    askForContent();
  });
}

function askForContent() {
  process.stdin.resume();
  process.stdout.write("请选择内容（intro/sale/cnf/admin）: ");
  process.stdin.once("data", function (data) {
    inp_content = data.toString().trim();
    askForConfirm();
  });
}

function askForConfirm() {
  process.stdin.resume();
  process.stdout.write(
    `确认向，${inp_product}产品，${inp_env}环境，发送内容${inp_content}？（y/n）: `
  );
  process.stdin.once("data", function (data) {
    let res = data.toString().trim() == "y";
    if (res) sendMsgTemplate(inp_product, inp_env, inp_content);
  });
}

return askForProduct();
