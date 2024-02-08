function getRealMonit(url, _id, key) {
  let svr = "http://47.112.136.73:9098";
  let storageKey = "RealMonit"; //在全局缓存
  let stamp = "RealMonitTs";
  let delayTime = 5000; //间隔默认5s

  window[storageKey] = window[storageKey] ? window[storageKey] : [];
  getData();

  // 返回全局变量里的值
  return window[storageKey][key];

  function getData() {
    if (new Date().valueOf() - window[stamp] < delayTime) return false;
    postHttp({
      url,
      params: {
        query_name: "",
        on_line_status: "",
        product_type: "",
        hardware_type: "",
        sort_machinename: "",
        sort_lables: "",
        sort_cpurate: "",
        sort_agent_version: "",
        page: 1,
        count: 20,
      },
      success:function (res) {
        if (res && res.data && res.data.list && res.data.list[_id]) {
          window[storageKey] = res.data[_id];
        }
      },
      error:function (err) {
        console.log(err);
      }
  });
  }

  // getHttp(svr + '/api/v3/upsrv/realmonit/getoverview', function(res){
  //     return res.data[key]
  // })

  function postHttp({ url, params, success, error }) {
    let xhr = new XMLHttpRequest();
    xhr.open("post", url, true);

    xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(params));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 304) {
          success(JSON.parse(xhr.responseText));
        } else {
          error("请求失败");
        }
      }
    };
  }

  //   function getHttp({ url, success, error }) {
  //     let xhr = new XMLHttpRequest();
  //     xhr.open("get", url, true);

  //     xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState == 4) {
  //         if (xhr.status == 200 || xhr.status == 304) {
  //           success(JSON.parse(xhr.responseText));
  //         } else {
  //           error("请求失败");
  //         }
  //       }
  //     };
  //   }
}
