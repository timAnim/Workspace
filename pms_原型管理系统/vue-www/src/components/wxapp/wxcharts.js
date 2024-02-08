import * as echarts from "echarts";

var lineChart = {
  init(title, xAxis, list, canvas) {
    function getOption(title, xAxis, list) {
      var lineOption= {
        title: {
          left: 'center',
          textStyle: {
            color: '#616161',
            fontWeight: 'normal',
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#505765"
            }
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#9e9e9e"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#9e9e9e"
            }
          }
        },
        series: [{
          type: "line",
          itemStyle: {
            normal: {
              color: "#8bc34a",
              barBorderRadius: 8,
              lineStyle: {
                width: 8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#8bc34a" },
                  { offset: 0.5, color: "#8bc34a" },
                  { offset: 1, color: "rgba(139,195,74,0)" }
                ])
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          data: []
        }]
      };
      var _option = JSON.parse(JSON.stringify(lineOption))
      _option.xAxis.data = xAxis
      _option.series[0].data = list
      _option.series[0].name = title
      _option.title.text = title
      return _option
    }

    var total = 0,
      statistic = [];
    list.forEach(num => {
      total += num
      statistic.push(total)
    })

    var option = getOption(title, xAxis, list);
    var chart = echarts.init(canvas)
    chart.getOption = getOption;
    chart.list = list;
    chart.statistic  = statistic

    chart.sum = function(mode) {
      var list = mode ? this.statistic : this.list
      var option = this.getOption(title, xAxis, list);
      this.setOption(option);
    }
    chart.setOption(option);

    return chart
  }
}

var barChart = {
  init(title, xAxis, list, canvas) {
    var option = {
      title: {
        left: 'center',
        text: title,
        textStyle: {
          color: '#616161',
          fontWeight: 'normal',
        }
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        data: xAxis,
        axisLine: {
          lineStyle: {
            color: "#9e9e9e"
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: "#9e9e9e"
          }
        }
      },
      series: [{
        type: "bar",
        barWidth: 12,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#8bc34a" },
              { offset: 0.5, color: "#8bc34a" },
              { offset: 1, color: "rgba(139,195,74,0)" }
            ])
          }
        },
        label: {
          show: false
        },
        data: list
      }]
    };
    var chart = echarts.init(canvas);
    chart.setOption(option);
    return chart
  }
}
export { lineChart, barChart }
