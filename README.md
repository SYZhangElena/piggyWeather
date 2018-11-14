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


## 技术栈
### 概述
本web服务的开发严格遵循软件开发规范,运用软件工程的方法进行系统开发，并利用较先进的技术手段及工具，提高系统开发效率。其中，温度查询使用和风天气的api、定位使用百度地图的api，用户的个性化操作交给后端逻辑。

### 前端
前端使用Vue.js，并用webpack做打包。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。而webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。因此，一个大程序可以分成多个组件进行构建，提高了可维护性与可读性。

```
piggyWeather
├── build       // webpack的一些配置，程序入口出口，以及目录监听、代码规则提示等辅助编程的工具
├── config
├── dist
├── src
│   ├── api     // 负责与后端通信的api接口
│   ├── assets  
│   ├── components  // 一些公用的模块
│   ├── router  // 负责路由管理，当且仅当验权成功才重定向到个人首页
│   ├── store  
│   ├── styles
│   ├── utils   // 公用的一些函数
│   └── views   // 页面父子组件
│       ├── dashboard 
│       ├── layout     
│       │   ├── components
│       │   └── mixin
│       ├── login   
│       └── province
└── static 
```

本web程序各模块功能明确，实现良好分工，并使用MVC模式，使得前端展示与后端逻辑解耦合，提高可维护性。此外，本web服务中，对登录页面做了详细严格的验证，若用户未登录或登录失败，则 Vue 的路由会重定向(redirect)到登录页面。并使用浏览器session进行账户信息缓存，若session未过期，则用户不需要再次登录。

### 后端
后端使用Tornado进行开发。Tornado 是一个 Python Web框架和异步网络库。Tornado 采用非阻塞网络 I/O 模型，可以处理数以千计的网络连接，这意味着对于 long polling 、WebSockets 和其他需要长时间实时连接的 apps 来说，Tornado 是一个理想的 Web 框架。

数据库采用SQLite。SQLite，是一款轻型的数据库，是遵守ACID的关系型数据库管理系统，它包含在一个相对小的C库中。它是D.RichardHipp建立的公有领域项目。它的设计目标是嵌入式的，而且目前已经在很多嵌入式产品中使用了它，它占用资源非常的低，在嵌入式设备中，可能只需要几百K的内存就够了。

```
piggyServer
├── app.py            // 主程序
├── config            // 配置文件，包括日志文件路径及数据库配置信息
├── handler           // 业务逻辑处理器
│   ├── base.py       // 基类
│   ├── city.py       // 负责用户关注城市接口
│   ├── __init__.py
│   ├── login.py      // 负责用户登录接口
│   ├── province.py   // 负责省份与城市数据的查询
│   ├── signup.py     // 负责用户注册接口
│   └── tmpmap.py     // 负责抓取全国气温分布图，根据当前时间计算并返回最新的气温分布图url
├── settings.py       // 载入，程序配置信息，配置日志格式
├── urls.py           // 分发各个路由接口的业务逻辑处理器
└── utils             // 公用工具模块
    ├── db.py         // 所有对数据库的操作
    └── __init__.py
```

其中数据库连接使用单例模式，保证全局只有一个connection实例，避免多次连接带来的时间及性能损耗。python代码如下：
```python
  29 class ConnectionSingleton(object):
  30     conn = None
  31 
  32     def __new__(cls, **kwargs):
  33         print(kwargs)
  34         cls.database = kwargs.get('database', DATABASE)
  35         if cls.conn is None:
  36             cls.conn = sqlite3.connect(cls.database)
  37         return cls.conn
  38
```

再者，所有数据库有关操作都使用python装饰器进行修饰，保证能定位出错语句，并避免大量重复代码的编写。
```python
  16 def trace(f):
  17     def _trace(*args, **kwargs):
  18         try:
  19             res = f(*args, **kwargs)
  20         except:
  21             fp = StringIO()
  22             traceback.print_exc(file=fp)
  23             logging.error(fp.getvalue())
  24             res = None
  25         return res
  26     return _trace
```
```python
  40 @trace
  41 def create_connection(db_file):
  42     """ create a database connection to the SQLite database
  43         specified by the db_file
  44     :param db_file: database file
  45     :return: Connection object or None
  46     """
  47     try:
  48         conn = ConnectionSingleton(database=DATABASE)
  49         return conn
  50     except Error as e:
  51         logging.error(e)
  52     return None
```