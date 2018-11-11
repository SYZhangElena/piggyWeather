// 接受一个数组，作渲染
// 数据格式为[{..}, {...}]，即和风forcast的返回值
// 调用api处理数据并返回直接可以用的数组数据
<template>
  <div>
    <div v-for='item in weatherDatas' :key="item.date" class="weather-item-container">
      <span>{{item.date}}</span>
      <span>{{item.cond_txt}}</span>
      <span>{{item.wind_dir}}</span>
      <span>{{item.wind_sc}}</span>
      <span>{{item.tmp_min}} ~ {{item.tmp_max}}</span>
    </div>
  </div>
</template>

<script>
import { parseWeatherDetails } from '@/api/weather.js'

export default {
  name: 'weather-list',
  props: ['weatherArr'],
  data() {
    return {
    }
  },
  computed: {
    weatherDatas() {
      return parseWeatherDetails(this.weatherArr)
    }
  }
}
</script>

<style scoped>
.weather-item-container span {
  margin-left: 0.5rem;
}
.weather-item-container :last-child {
  float: right;
}
</style>

