export default {
    islogin: false, //判断是否登录 正式上线用
    // islogin: true, //判断是否登录 测试用
    //userId: 1165864, //用户userID 正式上线用
    userId: '', //原生获取的no用来做用户的唯一标识
    trueuserId: '', //原生传过来的userid
    aaaid: '', //3a的userid
    tspId: '', //查询是否tsp用户的接口拿到的tspid
    userName: '', //用户昵称
    imgUrl: '',
    uuid: null,
    sign: '', //原生拿到的用作埋点
    UserStartId: null,
    mobile: '', //用户手机号
    softkeyboard: true, //默认软键盘开启
    token: '', //用户token
    refreshToken: '', //查询是否tsp用户接口拿到的刷新token
    integral: '', //用户总积分
    everyno: '', //智享主页点击时候每个车的no
    brandName: '', //爱车页面默认车辆的车名
    brandId: '',
    brandNo: "", //默认车辆的no
    seriesName: '瑞风S4', //智享主页点击时候车的每一个seriesName
    nomarlseriseName: '', //爱车部分默认的seriseName
    srouceNo: '', //智享主页点击时候车的每一个srouceNo
    series_No: "", //车系的唯一标识
    levelCode: '',
    lmsCode: '',
    // userNo: 'AD022018081504171568405', //userNo
    tsppin: {
        headers: {
            "identityParam": '{ "userId": "", "token": "", "phone": "","tspType":""}',
            // "identityParam": '{ "userId": "177", "token": "1c3ec1e7-44e9-462e-aa85-fe264cdefe50", "phone": "17775099071" }',
        }
    }, //非爱车发送请求时的token
    getpin: {
        headers: {
            "identityParam": '{ "userId": "", "token": "", "phone": "" }',
        }
    }, //新能源车发送请求时的token
    vins: '', //车辆的pin码暂时用，登入后拿到放这里
    loadingflag: false, //loading动画状态
    selectLabelState: null, //选择的频道
    mobileStatusBar: '', //手机适配,原生提供状态栏高度
    shownum: '', //车系特色判断返回的路由
    busNo: null, //主推车型，全部车型 选择的no
    qrCodeDate: null, //扫描二维码给出信息
    changeScrollY: '', //存储滚动高度
    GETWORDS: [], //储存所有的提示信息
    record: 1, //跳转回智享的时候几率的tab默认为1
    currentTitle: '梦想型',
    carIntroduceTitle1: '主驾驶电动座椅  360全景影像',
    carIntroduceTitle2: 'TESS爆胎应急安全系统',
    powerTitle: '1.5T CVT 自动',
    // powerTitle1: '1.5T CVT 自动',
    // powerTitle2: '1.5T CVT 自动',
    // powerTitle3: '1.5T CVT 自动',
    priceTitle: 88800,
    colorTitle: '典雅白',
    rimTitle: 'R17',
    show: false,
    show1: false,
    outType: '双色车身',
    LEDType: 'LED前大灯',
    locationMes: '', //ios获取的地址
    noback: false,
    recordNo: "", //网点评分的RECORDNO
    $flag: false, // 有用别动
    code403: 0,
    defaultInformation: {}, //存贮默认车辆的所有信息
    enterMaintenance: true, //判断维保预约是否展示
    addiflogin:null
}