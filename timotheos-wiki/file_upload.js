const fs = require("fs");
const request = require("request");
const path = require('path')

let formData = {}

formData.img = fs.createReadStream(path.resolve(__dirname, 'resources', '3D场景管理_TDCE_C30使用说明书.docx'))

let key = 'ab13ad44-4ced-4d9d-9538-3e892005b793'
let url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media?key=${key}&type=file`

request(
    {
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      formData: formData,
    },
    (err, res, body) => {
      console.log(body);
    }
  );