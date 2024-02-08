// const TP = require('./cnfg.js')

function compareStrs(a, b) {
  // 标准工时
  var except = [];
  // for (const key in TP) {
  //   except.push(TP[key].t);
  // }

  function check(str) {
    let has = false;
    except.forEach((_str) => {
      if (str.match(_str)) {
        has = true;
      }
    });
    return has;
  }

  let max = 0;
  let res = "";
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i; j++) {
      let _ = a.slice(i, j);
      if (b.match(_) && _.length > max && !check(_)) {
        max = _.length;
        res = a.slice(i, j);
      }
    }
  }

  return res
}

module.exports =  compareStrs

