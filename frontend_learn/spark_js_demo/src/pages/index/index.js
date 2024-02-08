/*
 */
/**
 *
 * 大模型demo，运行参考readme.md
 *
 * 此demo只是一个简单的调用示例，不适合用到实际生产环境中
 *
 * 大模型 WebAPI 接口调用示例 接口文档（必看）：https://www.xfyun.cn/doc/spark/Web.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E
 * 错误码链接：
 * https://www.xfyun.cn/doc/tts/online_tts/API.html
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 *
 */

import { downloadPCM, downloadWAV } from "js/download.js";
import CryptoJS from "crypto-js";
import Enc from "enc";
import TransWorker from "js/transcode.worker.js";
import VConsole from "vconsole";
import { Base64 } from "js-base64";
import "./index.css";

let transWorker = new TransWorker();
//APPID，APISecret，APIKey在https://console.xfyun.cn/services/cbm这里获取
const APPID = "b776079a";
const API_SECRET = "OWRiOWE3N2Y1NjgwMWMyMmFkYjFkYzdh";
const API_KEY = "806d369d45a7d7a5632fda13977d77df";

var total_res = "";
var apiKey = API_KEY;
var apiSecret = API_SECRET;
var url = "wss://spark-api.xf-yun.com/v1.1/chat";
var host = location.host;
var date = new Date().toGMTString();
var algorithm = "hmac-sha256";
var headers = "host date request-line";
var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
var signature = CryptoJS.enc.Base64.stringify(signatureSha);

var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
var authorization = btoa(authorizationOrigin);
url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;


function getWebsocketUrl() {
  return new Promise((resolve, reject) => {

    

    resolve(url);

  });
}

class TTSRecorder {
  constructor({ appId = APPID } = {}) {
    this.appId = appId;
    this.status = "init";
  }

  // 修改状态
  setStatus(status) {
    this.onWillStatusChange && this.onWillStatusChange(this.status, status);
    this.status = status;
  }

  // 连接websocket
  connectWebSocket() {
    this.setStatus("ttsing");
    return getWebsocketUrl().then((url) => {
      let ttsWS;
      if ("WebSocket" in window) {
        ttsWS = new WebSocket(url);
      } else if ("MozWebSocket" in window) {
        ttsWS = new MozWebSocket(url);
      } else {
        alert("浏览器不支持WebSocket");
        return;
      }
      this.ttsWS = ttsWS;
      ttsWS.onopen = (e) => {
        this.webSocketSend();
      };
      ttsWS.onmessage = (e) => {
        this.result(e.data);
      };
      ttsWS.onerror = (e) => {
        clearTimeout(this.playTimeout);
        this.setStatus("error");
        alert("WebSocket报错，请f12查看详情");
        console.error(`详情查看：${encodeURI(url.replace("wss:", "https:"))}`);
      };
      ttsWS.onclose = (e) => {
        console.log(e);
      };
    });
  }

  // websocket发送数据
  webSocketSend() {
    var params = {
      header: {
        app_id: this.appId,
        uid: "fd3f47e4-d",
      },
      parameter: {
        chat: {
          domain: "general",
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          text: [
            {
              role: "user",
              content: "中国第一个皇帝是谁？",
            },
            {
              role: "assistant",
              content: "秦始皇",
            },
            {
              role: "user",
              content: "秦始皇修的长城吗",
            },
            {
              role: "assistant",
              content: "是的",
            },
            {
              role: "user",
              content: $("#input_text").text(),
            },
          ],
        },
      },
    };
    console.log(JSON.stringify(params));
    this.ttsWS.send(JSON.stringify(params));
  }

  start() {
    total_res = ""; // 请空回答历史
    this.connectWebSocket();
  }

  // websocket接收数据的处理
  result(resultData) {
    let jsonData = JSON.parse(resultData);
    // total_res = total_res + resultData
    total_res = total_res + jsonData.payload.choices.text[0].content;
    $("#output_text").val(total_res);
    // 提问失败
    if (jsonData.header.code !== 0) {
      alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`);
      console.error(`${jsonData.header.code}:${jsonData.header.message}`);
      return;
    }
    if (jsonData.header.code === 0 && jsonData.header.status === 2) {
      this.ttsWS.close();
      bigModel.setStatus("init");
    }
  }
}

// ======================开始调用=============================
// var vConsole = new VConsole()
let bigModel = new TTSRecorder();
bigModel.onWillStatusChange = function (oldStatus, status) {
  // 可以在这里进行页面中一些交互逻辑处理：按钮交互等
  // 按钮中的文字
  let btnState = {
    init: "立即提问",
    ttsing: "回答中...",
  };
  $(".audio-ctrl-btn")
    .removeClass(oldStatus)
    .addClass(status)
    .text(btnState[status]);
};

$(".audio-ctrl-btn").click(function () {
  if (["init", "endPlay", "errorTTS"].indexOf(bigModel.status) > -1) {
    bigModel.start();
  }
});

$("#input_text").on("input propertychange", function () {
  $("#input_text").text(this.value);
  // console.log($("#input_text").text())
});

$("#file-upload").on("input propertychange", function () {
    let fd = new FormData();
    fd.append("wiki", $("#file-upload")[0].files[0]);
    $.ajax({
      method: "POST",
      url: "https://chatdoc.xfyun.cn/openapi/fileUpload",
      data: fd,
      contentType: false,
      processData: false,
      headers: {
          appId: APPID,
          timestamp: Math.floor(Date.now() / 1000),
          signature: signature.toString('hex')
      },
      success: function (res) {
        console.log(res);
      },
    });
  });