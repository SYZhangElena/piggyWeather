<template>
  <div>
    <el-row class="container">
      <h1>各省天气详情</h1>
      <el-select v-model="provinceChoosed" placeholder="请选择">
        <el-option
          v-for="province in allProvince"
          :key="province"
          :label="province"
          :value="province">
        </el-option>
      </el-select>
      <el-input
        style="margin: 0.5rem; width: 20rem;"
        placeholder="输入列关键字"
        v-model="queryTxt">
      </el-input>
      <el-table
        :data='citiesWeather'>
        <el-table-column
          v-for='title in titles'
          :prop='title.prop'
          :label='title.label'
          :key='title.label'
          :filters="title.prop === 'cond_txt' ? weatherFilter : []"
          :filter-method="title.prop === 'cond_txt' ? onWeatherFilter : null"
          sortable>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import WeatherList from '../../../components/WeatherList'
import { getProvincesList,
         getCitiesWeatherList, 
         parseCitiesWeatherList } from '../../../api/weather'
import { getLoginedUserName } from '../../../api/login'

export default {
  name: 'liked-city',
  components: {
    WeatherList
  },
  data() {
    return {
      allProvince: [],
      provinceChoosed: '',
      citiesWeather: [],
      titles: [
        {
          prop: 'province',
          label: '省份'
        },
        {
          prop: 'location',
          label: '城市'
        },
        {
          prop: 'cond_txt',
          label: '天气'
        },
        {
          prop: 'wind_dir',
          label: '风向'
        },
        {
          prop: 'wind_sc',
          label: '风力'
        },
        {
          prop: 'tmp',
          label: '当前气温'
        }
      ],
      weatherFilter: []
    }
  },
  async mounted() {
    this.allProvince = getProvincesList()
    this.provinceChoosed = this.allProvince[0]
    await this.fetchWeatherDatas()
  },
  methods: {
    async onChooseCity(cmd) {
      console.log(cmd)
      this.cityChoosed = cmd
      await this.fetchWeatherDatas()
    },
    async fetchWeatherDatas(province=this.provinceChoosed) {
      var allWeather = await getCitiesWeatherList(province)
      this.citiesWeather = await parseCitiesWeatherList(allWeather)
      var weatherCondSet = new Set()
      this.citiesWeather.forEach(e => {
        weatherCondSet.add({text: e.cond_txt, value: e.cond_txt})
      })
      this.weatherFilter = Array.from(weatherCondSet)
      console.log('filters')
      console.log(this.weatherFilter)
    },
    onWeatherFilter(value, row) {
      return row.cond_txt === value
    }
  },
  watch: {
    async provinceChoosed(newVal) {
      await this.fetchWeatherDatas(newVal)
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  margin: 2rem;
}
</style>
