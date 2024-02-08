import * as echarts from 'echarts';
import 'echarts-gl';
import 'echarts/map/js/china';
var geoCoordMap = {
  "北京": [116.24, 39.55],
  "天津": [117.12, 39.02],
  "上海": [121.29, 31.14],
  "重庆": [106.54, 29.59],
  "香港": [115.12, 21.23],
  "澳门": [115.07, 21.33],
  "广西": [108.19, 22.48],
  "新疆": [87.36, 43.45],
  "宁夏": [106.16, 38.27],
  "内蒙古": [111.41, 40.48],

  "河北省": [114.30, 38.02],
  "山西省": [112.33, 37.54],
  "福建省": [119.18, 26.05],
  "甘肃省": [103.51, 36.04],
  "广东省": [113.14, 23.08],
  "贵州省": [106.42, 26.35],
  "海南省": [110.20, 20.02],
  "河南省": [113.40, 34.46],
  "黑龙江": [126.36, 45.44],
  "安徽省": [117.17, 31.52],
  "湖北省": [114.17, 30.35],
  "湖南省": [112.59, 28.12],
  "吉林省": [125.19, 43.54],
  "江苏省": [118.46, 32.03],
  "江西省": [115.55, 28.40],
  "辽宁省": [123.25, 41.48],
  "青海省": [101.48, 36.38],
  "山东省": [117.00, 36.40],
  "陕西省": [108.57, 34.17],
  "四川省": [104.04, 30.40],
  "西藏省": [91.08, 29.39],
  "云南省": [102.42, 25.04],
  "浙江省": [120.10, 30.16],

};
export default {

  init(list, can) {
    function convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          var _arr = geoCoord.concat(data[i].value)
          _arr.push(data[i].name)
          res.push(_arr);
        }
      }
      res.sort((a, b) => {
        return b[2] - a[2]
      })
      return res;
    };

    var option = {
      backgroundColor: '#fff',
      geo3D: {
        map: 'china',
        shading: 'lambert',
        light: {
          main: {
            intensity: 1,
            shadow: true,
            shadowQuality: 'high',
            alpha: 50
          },
          ambient: {
            intensity: 1
          },
        },
        viewControl: {
          distance: 50,
          panMouseButton: 'left',
          rotateMouseButton: 'right'
        },
        groundPlane: {
          show: false,
          color: '#fff'
        },
        postEffect: {
          enable: true,
          bloom: {
            enable: false
          },
          SSAO: {
            radius: 1,
            intensity: 1,
            enable: true
          },
          depthOfField: {
            enable: false,
            focalRange: 10,
            blurRadius: 10,
            fstop: 1
          }
        },
        temporalSuperSampling: {
          enable: true
        },
        itemStyle: {
          color: "#fff",
          borderWidth: 1,
          borderColor: "#e0e0e0"
        },
        label: {
          show: false,
        },
        silent: true,
        regionHeight: 1
      },
      series: [{
        name: "访问地点",
        type: 'bar3D',
        coordinateSystem: 'geo3D',
        shading: 'lambert',
        data: list,
        barSize: 2,
        data: convertData(list),
        minHeight: 0.2,
        itemStyle: {
          color: a => {
            if (a.dataIndex < 5) {
              return "#ff9800"
            } else {
              return '#8bc34a'
            }
          }
        },
        // silent: true,
        label: {
          textStyle: {
            fontSize: 16,
            borderWidth: 1,
            color: "#000"
          },
          formatter: a => {
            return a.data[3] + '  ' + a.data[2]
          }
        },
        emphasis: {
          label: {
            show: true
          },
          itemStyle: {
            color: '#ff5722'
          }
        }
      }]
    }
    var chart = echarts.init(can)
    chart.setOption(option)
    return chart
  }
}
