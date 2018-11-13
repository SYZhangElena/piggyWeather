<template>
  <div>
    <el-card class="box-card-component" style="margin-left:8px;">
      <h1>我关注的城市</h1>
      <el-dropdown @command="onChooseCity">
        <el-button type="primary">
          {{cityChoosed}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <div v-for="city in likedCities" :key="city">
            <el-dropdown-item :command=city>{{city}}</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <h2>{{cityInfo.province}}  {{cityInfo.city}}</h2>
      <weather-list :weatherArr='cityInfo.weatherArr'></weather-list>
    </el-card>
  </div>
</template>

<script>
import WeatherList from '../../../components/WeatherList'
import { getLikedCitesList, getCityWeatherForcast } from '../../../api/weather'
import { getLoginedUserName } from '../../../api/login'

export default {
  name: 'liked-city',
  components: {
    WeatherList
  },
  data() {
    return {
      likedCities: [],
      cityChoosed: '',
      cityInfo: {
        city: '',
        province: '',
        weatherArr: []
      }
    }
  },
  async mounted() {
    var username = getLoginedUserName()
    this.likedCities = await getLikedCitesList(username)
    this.cityChoosed = this.likedCities[0]
    await this.fetchWeatherDatas()
  },
  methods: {
    async onChooseCity(cmd) {
      console.log(cmd)
      this.cityChoosed = cmd
      await this.fetchWeatherDatas()
    },
    async fetchWeatherDatas() {
      let myCity = this.cityChoosed
      let res = await getCityWeatherForcast(myCity)
      let details = res.HeWeather6[0]
      console.log(details)
      this.cityInfo = {
        city: details.basic.location,
        province: details.basic.admin_area,
        weatherArr: details.daily_forecast
      }
    }
  }
}
</script>

<style <style lang="scss" scoped>
.box-card-component h1 {
  display: inline-block;
}
.box-card-component .el-dropdown {
  float: right;
}
</style>