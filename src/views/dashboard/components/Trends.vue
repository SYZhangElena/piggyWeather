<template>
  <div>
    <el-card class="box-card-component" style="margin-left:8px;">
      <h1>{{ mycity }}温度趋势图</h1>
      <line-chart :chart-data="datacollection" :options="chartOption"></line-chart>
    </el-card>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import { getCityWeatherForcast } from '../../../api/weather'
  import { getLocalCity } from '../../../api/location'

  export default {
    name: 'trends',
    components: {
      LineChart
    },
    data () {
      return {
        mycity: '',
        datacollection: null,
        chartOption: {
          legend: {
              position: 'bottom',
              labels: {
                  fontFamily: 'sans-serif',
                  fontSize: 12,
                  padding: 20
              }
          },
          tooltip: {
              bodyFontFamily: 'sans-serif',
              bodyFontSize: 14
          },
          scales: {
              xAxes: [{
                  barPercentage: 0.5,
                  ticks: {
                      autoSkip: true,
                      maxRotation: 0,
                      minRotation: 0
                  },
                  gridLines: {
                      display: true
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: '摄氏度'
                  },
                  gridLines: {
                      display: true
                  }
              }]
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      async fillData () {
        var localCity = getLocalCity()
        var forcast = await getCityWeatherForcast(localCity)
        console.log(forcast)
        var datas = forcast.HeWeather6[0].daily_forecast
        this.mycity = forcast.HeWeather6[0].basic.location
        var dates = []
        var maxtmps = []
        var mintmps = []
        console.log(datas)
        datas.forEach(obj => {
          dates.push(obj.date)
          maxtmps.push(obj.tmp_max)
          mintmps.push(obj.tmp_min)
        })
        this.datacollection = {
          "labels": dates, 
          "datasets": [
            {
              "borderColor": "#4ab2e3", 
              "fill": false, 
              "data": maxtmps,
              "backgroundColor": "#4ab2e3", 
              "label": "最高气温"
            }, 
            {
              "borderColor": "#4ae387", 
              "fill": false, 
              "data": mintmps, 
              "backgroundColor": "#4ae387", 
              "label": "最低气温"
            }
          ]

        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>


