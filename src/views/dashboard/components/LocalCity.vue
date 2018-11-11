<template>
  <div>
    <el-card class="box-card-component" style="margin-left:8px;">
      <div slot="header" class="box-card-header">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
      </div>
      <div style="position:relative;">
        <h2>{{details.province}}  {{details.city}}</h2>
        <weather-list :weatherArr='details.weatherArr'></weather-list>
      </div>
    </el-card>
    <span>{{ details.basic }}</span>
  </div>
</template>

<script>
import { getLocalCity } from '../../../api/location'
import { getCityWeatherForcast } from '../../../api/weather'
import WeatherList from '../../../components/WeatherList'


export default {
  name: 'local-city',
  components: {
    WeatherList
  },
  data () {
    return {
      details: {
        city: '',
        province: '',
        weatherArr: []
      },
    }
  },
  async mounted () {
    let myCity = getLocalCity()
    let res = await getCityWeatherForcast(myCity)
    let details = res.HeWeather6[0]
    this.details = {
      city: details.basic.location,
      province: details.basic.admin_area,
      weatherArr: details.daily_forecast
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
