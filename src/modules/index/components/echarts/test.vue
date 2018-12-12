<template>
    <div class="echarts-warp">
      <div id="myChart" :style="{width: '900px', height: '600px', margin: '25px auto'}"></div>
      <div id="myChartpie" :style="{width: '600px', height: '600px', margin: '25px auto'}"></div>
      <div id="myChartpieCrirle" :style="{width: '600px', height: '600px', margin: '25px auto'}"></div>
      <div id="myChartLast" :style="{width: '600px', height: '600px', margin: '25px auto'}"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
// // 引入基本模板
// let echarts = require('echarts/lib/echarts');
// // 引入柱状图组件
// require('echarts/lib/chart/bar');
// // 引入饼图
// require("echarts/lib/chart/pie");
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
export default {
  data () {
    let optionPie = {
        title: { text: 'ECharts 入门示例' },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
            itemHeight: 10, // 设置高度
            itemGap: 15 // 设置间距
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };
    let optionLine =  {
            // 主题
            title: { 
                text: '事业部申请数量',
                subtext: '本月申请数'
                },
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                }
            },
            legend: {
              data:['直接访问','邮件营销','联盟广告','视频广告'],
              right: 10,
              top: 20,
              bottom: 20,
              icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
              itemWidth: 10,  // 设置宽度
              itemHeight: 10, // 设置高度
              itemGap: 40 // 设置间距
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%'
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'邮件营销',
                    type:'bar',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'bar',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'bar',
                    data:[150, 232, 201, 154, 190, 330, 410]
                }
            ]
    };
    let optionPieCricle = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    let optionLast = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
              color: '#409eff'
            }
        }]
    };
    return {
      optionPie: optionPie,
      optionLine: optionLine,
      optionPieCricle: optionPieCricle,
      optionLast: optionLast
    }
  },
  mounted() {
    this.drawLine();
    this.drawPie();
    this.drawPieCricle();
    this.drawLast();
  },
  methods: {
    // 柱状图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.optionLine);
    },
    // 饼图
    drawPie() {
      let myChart = echarts.init(document.getElementById('myChartpie'));
      myChart.setOption(this.optionPie);
    },
    drawPieCricle() {
      let myChart = echarts.init(document.getElementById('myChartpieCrirle'));
      myChart.setOption(this.optionPieCricle);
    },
    drawLast() {
      let myChart = echarts.init(document.getElementById('myChartLast'));
      myChart.setOption(this.optionLast);
    }
  }
}
</script>
<style lang="less" scoped>
.echarts-warp{
}
</style>


