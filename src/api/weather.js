import Axios from 'axios'

const key = '6c9855f23706490b98c5a7cfd41ed892'

export function getCityWeatherDetails(city) {
  const url = `https://free-api.heweather.com/s6/weather/now?location=${city}&key=${key}`
  return Axios.get(url)
    .then(res => {
      console.log(res)
      return res.data
    })
}

export function getCityWeatherForcast(city) {
  const url = `https://free-api.heweather.com/s6/weather/forecast?location=${city}&key=${key}`
  return Axios.get(url)
    .then(res => {
      console.log('forcast')
      console.log(res)
      return res.data
    })
}

export function getPopularCities() {
  const url = `https://search.heweather.com/top?group=cn&key=${key}`
  return Axios.get(url)
    .then(res => {
      console.log('popular hh')
      console.log(res)
      return res.data
    })
}

export async function getPopularCitiesWeather() {
  var resp = await getPopularCities()
  var cities = resp.HeWeather6[0]['basic']
  console.log(cities)
  var res = []
  cities.forEach((city) => {
    res.push(getCityWeatherForcast(city.location))
  })
  return await Promise.all(res)
  // return Promise.resolve(res)
  // !But not return res
}

export function parseWeatherDetails(arr) {
  console.log('parse')
  var res = []
  arr.forEach(e => {
    res.push({
      date: e['date'],
      cond: e['cond_code_d'],
      cond_txt: e['cond_txt_d'],
      wind_dir: e['wind_dir'],
      wind_sc: e['win_src'],
      tmp_max: e['tmp_max'],
      tmp_min: e['tmp_min']
    })
  })
  return res
}

export function getLikedCitesList(username) {
  return [
    '北京', '深圳', '汕头', '上海'
  ]
}

export function getCitiesByProvince(province) {
  return [
    '北京', '深圳', '汕头', '上海'
  ]
}
