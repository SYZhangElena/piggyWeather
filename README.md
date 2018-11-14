# 小猪天气
## 运行
```
git clone https://github.com/Sar-Kerson/piggyWeather.git
cd piggyWeather
# 自动安装package.json里面的包
npm install
# 运行dev脚本
npm run dev
```

## 数据库
### user
create table user (username vchar(16) NOT NULL PRIMARY KEY, passwd vchar(64));

|username|passwd|
:-:|:-:
vchar(16)|vchar(64)

### likedCities
create table likedcities (username vchar(16) NOT NULL PRIMARY KEY, city_id vchar(16) NOT NULL);

|username|city_id|
:-:|:-:
vchar(16)|vchar(16)

### citis
create table cities (city_id vchar(16) NOT NULL PRIMARY KEY , city_en vchar(64), city_cn vchar(64), province_en vchar(64), province_cn vchar(64), admin_district_en vchar(64), admin_district_cn vchar(64), latitude float, longitude float);

City_ID|City_EN|City_CN|Province_EN|Province_CN|Admin_district_EN|Latitude|Longitude
:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:
|vchar(16)|vchar(16)|vchar(16)|vchar(16)|vchar(16)|vchar(16)|vchar(16)|vchar(16)
```
sqlite> select * from cities limit 10;
city_id,city_en,city_cn,province_en,province_cn,admin_district_en,admin_district_cn,latitude,longitude
CN101010100,beijing,北京,beijing,北京,beijing,北京,39.904987,116.40529
CN101010200,haidian,海淀,beijing,北京,beijing,北京,39.956074,116.31032
CN101010300,chaoyang,朝阳,beijing,北京,beijing,北京,39.92149,116.48641
CN101010400,shunyi,顺义,beijing,北京,beijing,北京,40.128937,116.65353
CN101010500,huairou,怀柔,beijing,北京,beijing,北京,40.324272,116.63712
CN101010600,tongzhou,通州,beijing,北京,beijing,北京,39.902485,116.6586
CN101010700,changping,昌平,beijing,北京,beijing,北京,40.218086,116.23591
CN101010800,yanqing,延庆,beijing,北京,beijing,北京,40.465324,115.98501
CN101010900,fengtai,丰台,beijing,北京,beijing,北京,39.863644,116.286964
CN101011000,shijingshan,石景山,beijing,北京,beijing,北京,39.9146,116.19544
```