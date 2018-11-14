import Axios from 'axios'

const key = '6c9855f23706490b98c5a7cfd41ed892'

export function getCityWeatherDetails(city) {
  // "cloud":"0","cond_code":"101","cond_txt":"多云",
  // "fl":"3","hum":"78","pcpn":"0.0","pres":"1014",
  // "tmp":"5","vis":"7","wind_deg":"173","wind_dir":"南风",
  // "wind_sc":"1","wind_spd":"5"
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
  // var encodedProvince = encodeURI(encodeURI(province))
  const url = `http://134.175.58.86:9999/username/city`
  return Axios.post(url, JSON.stringify({ 'username': username }))
    .then(res => {
      return res.data.cities
    })
}

export function getCitiesByProvince(province) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  // var encodedProvince = encodeURI(encodeURI(province))
  const url = `http://134.175.58.86:9999/province/${province}`
  return Axios.get(url, config)
    .then(res => {
      return res.data.cities
    })
}

export function getProvincesList() {
  return ['北京', '上海', '天津', '重庆', '河北',
    '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏',
    '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北',
    '湖南', '广东', '广西', '海南', '四川', '贵州', '云南',
    '西藏', '陕西', '甘肃', '宁夏', '青海', '新疆',
    '香港', '澳门', '台湾'
  ]
}

export async function getCitiesWeatherList(province) {
  var cities = await getCitiesByProvince(province)
  var res = []
  cities.forEach(city => {
    res.push(getCityWeatherDetails(city))
  })
  return Promise.all(res)
}

export function parseCitiesWeatherList(arr) {
  var res = []
  console.log('heihei!!!!!!!!')
  console.log(arr)
  arr.forEach(ele => {
    var e = ele.HeWeather6[0]
    var t = {
      location: e.basic.location,
      province: e.basic.admin_area
    }
    Object.assign(t, e.now)
    res.push(t)
  })
  console.log(res)
  return res
}

export function postLikedCity(username, city_cn) {
  const url = `http://134.175.58.86:9999/username/city/add`
  return Axios.post(url, JSON.stringify({ 'username': username, 'city_cn': city_cn }))
    .then(res => {
      console.log(res)
      return res.data.retcode
    })
}

export function getLatestTemMap() {
  // http://pi.weather.com.cn/i/product/share/pic/l/PWCP_TWC_WEAP_S99_ETO_TWC_L88_P9_20181113090000000.JPG
  const url = `http://134.175.58.86:9999/tmp/map/now`
  return Axios.get(url)
    .then(res => {
      return res.data.imgs[0]
    })
}

export function addEmailNotify(email, username, city_cn) {
  const url = `http://134.175.58.86:9999/email`
  var sentData = {
    'email': email,
    'username': username,
    'city_cn': city_cn
  }
  return Axios.post(url, JSON.stringify(sentData))
    .then(res => {
      return res.data
    })
}
