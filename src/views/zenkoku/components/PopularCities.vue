<template>
  <div>
    <el-row>
      <el-col :xs="{span: 48}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <div v-for="cityInfo in citiesInfo" :key="cityInfo.basic">
          <h2>{{cityInfo.province}}  {{cityInfo.city}}</h2>
          <weather-list :weatherArr='cityInfo.weatherArr'></weather-list>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WeatherList from '../../../components/WeatherList'
import { getPopularCitiesWeather } from '../../../api/weather'

export default {
  name: 'popular-cities',
  components: {
    WeatherList
  },
  data() {
    return {
      citiesInfo: []
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
  }
}
</script>

<style lang="sass" scoped>

</style>
