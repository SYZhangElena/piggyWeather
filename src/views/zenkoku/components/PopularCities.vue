<template>
  <div class="container" style="margin:2rem;">
    <el-row>
      <h1>热门城市天气</h1>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <el-card class="box-card-component" style="margin-left:8px;">
        <div v-for="cityInfo in citiesInfo" :key="cityInfo.basic">
          <h2>{{cityInfo.province}}  {{cityInfo.city}}</h2>
          <weather-list :weatherArr='cityInfo.weatherArr'></weather-list>
        </div>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <el-card class="box-card-component" style="margin-left:8px;">
          <h1>全国气温地图</h1>
          <img :src="tmpImg" style="width:100%;">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WeatherList from '../../../components/WeatherList'
import { getPopularCitiesWeather, getLatestTemMap } from '../../../api/weather'

export default {
  name: 'popular-cities',
  components: {
    WeatherList
  },
  data() {
    return {
      citiesInfo: [],
      tmpImg: ''
    }
  },
  async mounted() {
    let popularCities = await getPopularCitiesWeather()
    popularCities.forEach(e => {
      let details = e.HeWeather6[0]
      this.citiesInfo.push({
        city: details.basic.location,
        province: details.basic.admin_area,
        weatherArr: details.daily_forecast
      })
    })
    this.tmpImg = await getLatestTemMap()
  }
}
</script>

<style lang="css" scoped>
.container {
  margin: 2rem;
}

.box-card-component img {
  width: 100%;
}
</style>
