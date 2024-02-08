function getDcomData(obj, point) {
  let simulationData = window.simulationData;
  var inp = {
    机柜功率: 5, // 机架设计IT功率
    使用率: 0.63, //投用比
    房间机柜数: 200, // 房间机架数
    楼层房间数: 2, // 楼层IT机房
    楼栋楼层数: 2, // 一层2个IT机房
    园区楼栋数: 2, // 二层
    紧急告警: 0,
    严重告警: 1,
    重要告警: 1,
    次要告警: 1,
    pue: 1.2, // pue = plf + clf + olf + 1
    plf: 0.07, // 电力 / IT能耗
    clf: 0.12, // 暖通 / IT能耗
    olf: 0.01, // 其它 / IT能耗
    wue: 0.39, // 用水  / it能耗
    rer: 0.1, // 可再生能源利用率
  };
  if (simulationData) inp = simulationData["输入"];

  var room = {
    IT功率: inp.房间机柜数 * inp.机柜功率 * inp.使用率,
    总功率: inp.房间机柜数 * inp.机柜功率 * inp.使用率 * inp.pue,
    IT能耗: inp.房间机柜数 * inp.机柜功率 * inp.使用率 * 24,
    总能耗: inp.房间机柜数 * inp.机柜功率 * inp.使用率 * 24 * inp.pue,
    紧急告警: inp.紧急告警,
    严重告警: inp.严重告警,
    重要告警: inp.重要告警,
    次要告警: inp.次要告警,
  };

  var floor = {
    IT功率: room["IT功率"] * inp.楼层房间数,
    总功率: room["总功率"] * inp.楼层房间数,
    紧急告警: room["紧急告警"] * inp.楼层房间数,
    严重告警: room["严重告警"] * inp.楼层房间数,
    重要告警: room["重要告警"] * inp.楼层房间数,
    次要告警: room["次要告警"] * inp.楼层房间数,
    IT能耗: room["IT能耗"] * inp.楼层房间数,
    总能耗: room["总能耗"] * inp.楼层房间数,
  };

  var building = {
    plf: inp.plf,
    clf: inp.clf,
    olf: inp.olf,
    pue: inp.pue,
    wue: inp.wue,
    耗电: floor["总能耗"] * inp.楼栋楼层数,
    IT功率: floor["IT功率"] * inp.楼栋楼层数,
    总功率: floor["总功率"] * inp.楼栋楼层数,
    紧急告警: floor["紧急告警"] * inp.楼栋楼层数,
    重要告警: floor["重要告警"] * inp.楼栋楼层数,
    严重告警: floor["严重告警"] * inp.楼栋楼层数,
    次要告警: floor["次要告警"] * inp.楼栋楼层数,
    IT能耗: floor["IT能耗"] * inp.楼栋楼层数,
    总能耗: floor["总能耗"] * inp.楼栋楼层数,
  };

  var park = {
    plf: inp.plf,
    clf: inp.clf,
    olf: inp.olf,
    pue: inp.pue,
    wue: inp.wue,
    耗电: building["耗电"] * inp.楼栋楼层数,
    耗水: (building["总能耗"] * inp.园区楼栋数 * inp.wue) / 1000,
    耗标煤: (building["耗电"] * inp.楼栋楼层数 * (1 - inp.rer) * 0.123) / 1000,
    碳排:
      ((building["耗电"] * inp.楼栋楼层数 * (1 - inp.rer) * 0.123) / 1000) *
      2.7725,
    cue:
      ((building["耗电"] * inp.楼栋楼层数 * (1 - inp.rer) * 0.123 * 2.7725) /
        building["耗电"]) *
      inp.楼栋楼层数,

    机柜数: inp.房间机柜数 * inp.楼层房间数 * inp.楼栋楼层数 * inp.园区楼栋数,
    总功率: building["总功率"] * inp.楼栋楼层数,
    IT功率: building["IT功率"] * inp.楼栋楼层数,
    IT能耗: building["IT能耗"] * inp.楼栋楼层数,
    总能耗: building["总能耗"] * inp.楼栋楼层数,
    紧急告警: building["紧急告警"] * inp.楼栋楼层数,
    严重告警: building["严重告警"] * inp.楼栋楼层数,
    重要告警: building["重要告警"] * inp.楼栋楼层数,
    次要告警: building["次要告警"] * inp.楼栋楼层数,
  };

  var data = {
    输入: inp,
    房间: room,
    楼层: floor,
    楼栋: building,
    园区: park,
  };

  for (const key in data) {
    for (const m in data[key]) {
      data[key][m] = fix(data[key][m]);
    }
  }

  function fix(num) {
    let arr = [
      [1, 0],
      [0.1, 1],
      [0.01, 2],
    ];
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
      if (Math.floor(num / arr[i][0]) > 0) {
        res = arr[i][1];
        break;
      }
    }

    switch (res) {
      case 0:
        return parseInt(num);
      case 1:
        return Math.floor(num * 10) / 10;
      case 2:
        return Math.floor(num * 100) / 100;
      default:
        return parseInt(num);
    }
  }

  window.simulationData = data;

  var _data = data[obj];
  if (_data) return fix(_data[point]);
  else return fix(data[obj]);
}
