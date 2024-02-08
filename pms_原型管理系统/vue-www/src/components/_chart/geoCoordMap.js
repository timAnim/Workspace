import * as echarts from 'echarts';
import 'echarts/map/js/china';
import 'echarts-gl';

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
  return res;
};
var geoCoord2D = {
  init(list, canvas) {
    var option = {
      backgroundColor: '#fff',
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        formatter: a => {
          return a.data[3] + ' ' + a.data[2]
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false,
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#f5f5f5',
            borderColor: '#e0e0e0'
          },
          emphasis: {
            areaColor: '#eee',
          },
        }
      },
      series: [{
          name: '访问数量',
          type: 'scatter',
          coordinateSystem: 'geo',
          color: ["#8bc34a", "#7cb342", "#33691e"],
          data: convertData(list),
          symbolSize: function (val) {
            var size = val[2] / 2
            if (size < 5) {
              size = 5
            }
            return size;
          },
          label: {
            normal: {
              position: 'right',
              show: true,
              textStyle: {
                color: "#689f38",
                fontSize: 10
              },
              formatter: a => {
                return a.data[3]
              }
            },
          },
          itemStyle: {
            normal: {
              borderColor: '#c5e1a5',
              borderWidth: 1,
            },
          }
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          color: ["#ffc107"],
          coordinateSystem: 'geo',
          data: convertData(list.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 6)),
          symbolSize: function (val) {
            var size = val[2] / 2
            if (size < 5) {
              size = 5
            }
            return size;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              opacity: 0.5
            }
          },
          zlevel: 999
        }
      ]
    }
    var chart = echarts.init(canvas)
    chart.setOption(option);
    return chart
  }
};

var geoCoord = {
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
          distance: 80,
          panMouseButton: 'left',
          rotateMouseButton: 'right'
        },
        groundPlane: {
          show: false,
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
            fontSize: 14,
            backgroundColor: "rgba(0,0,0,0.9)",
            color: "#fff"
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
};

var barChart = {
  init(list, canvas) {
    var chart = echarts.init(canvas)
    var xAxis = []
    var yAxis = []
    list.forEach(item => {
      xAxis.push(item.value)
      yAxis.push(item.name)
    })

    var option = {
      color: ["#8bc34a", "#7cb342", "#33691e"],
      grid: {
        left: 70
      },
      xAxis: {
        splitLine: {
          show: false
        },
        type: 'value',
        data: xAxis,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        }
      },
      yAxis: {
        splitLine: {
          show: false
        },
        type: 'category',
        inverse: true,
        data: yAxis,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#9e9e9e',
          }
        },
        axisTick: {
          show: false,
        },
      },
      series: [{
        type: 'bar',
        data: list,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      }]
    };
    chart.setOption(option)
    return chart
  },

}

var pieChart = {
  init(list, canvas) {
    var chart = echarts.init(canvas)
    var xAxis = []
    var yAxis = []
    list.forEach(item => {
      xAxis.push(item.value)
      yAxis.push(item.name)
    })

    var option = {
      color: ["#8bc34a", "#7cb342", "#33691e"],
      title: {
        text: "性别分布",
        x: "center",
        textStyle: {
          color: "#9e9e9e",
          fontSize: 12,
        }
      },
      series: [{
        type: 'pie',
        radius: ['20%', '50%'],
        center: [100, 80],
        data: list,
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: a => {
              if (a.value) {
                return a.data.name + ' ' + a.data.value
              } else {
                return ''
              }
            }
          }
        },
        animation: false
      }]
    };
    chart.setOption(option)
    return chart
  },

}
export {
  geoCoord,
  barChart,
  pieChart,
}
