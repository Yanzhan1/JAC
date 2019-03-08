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
    seriesName: '瑞风S4', //智享主页点击时候车的每一个seriesName
    nomarlseriseName: '', //爱车部分默认的seriseName
    srouceNo: '', //智享主页点击时候车的每一个srouceNo
    levelCode: '',
    lmsCode: '',
    // userNo: 'AD022018081504171568405', //userNo
    tsppin: {
        headers: {
            "identityParam": '{ "userId": "", "token": "", "phone": "" }',
            // "identityParam": '{ "userId": "177", "token": "1c3ec1e7-44e9-462e-aa85-fe264cdefe50", "phone": "17775099071" }',
        }
    }, //非爱车发送请求时的token,暂用
    getpin: {
        headers: {
            "identityParam": '{ "userId": "", "token": "Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcIkFBQUlkXCI6MjA5LFwiYXV0aGVudGljYXRpb25TdGF0dXNcIjowLFwiY3JlYXRlZERhdGVcIjoxNTQ1NzI5NzY0MDAwLFwiZW1lcmdlbmN5Q29udGFjdE5hbWVcIjpcInl5ZlwiLFwiZW1lcmdlbmN5Q29udGFjdFBob25lXCI6XCIxNTk2ODgzODM4OVwiLFwiaWRcIjo0OTIsXCJpbml0VXNlclwiOjAsXCJsYXN0TW9kaWZpZWREYXRlXCI6MTU1MDY1Mzc0OTAwMCxcIm5vXCI6XCJBRDAyMjAxODA4MjEwNTEzNDY5Mzc1N1wiLFwicGVyc29uYWxTaWduYXR1cmVcIjpcImhlbGxvV29ybGRcIixcInBob25lXCI6XCIxNTAyNjU2Njk5MlwiLFwicmVhbFBob25lXCI6XCIxNTAqKioqNjk5MlwiLFwic2V4XCI6MSxcInVzZXJDb2RlXCI6XCIxNTAyNjU2Njk5MlwiLFwidXNlck5hbWVcIjpcIllZRlwiLFwidXNlclN0YXR1c1wiOjAsXCJ1c2VyVHlwZVwiOlwiMDFcIn0iLCJjcmVhdGVkIjoxNTUxNzMzNDA0MTQwLCJ1c2VyTm8iOiJBRDAyMjAxODA4MjEwNTEzNDY5Mzc1NyIsInVzZXJUeXBlIjoiMDEiLCJ1c2VyTmFtZSI6IllZRiIsImV4cCI6MTU1MjU5NzQwNCwidXNlcklkIjo0OTJ9.tzKGd3LAX2lxRg_8DQUDkCD9p9jmFxlZtvrSJTKp_kY", "phone": "" }',
        }
    }, //爱车发送请求时的token,暂用
    //调用部分tsp接口用到的token
    buding: {
        headers: {
            "token": ''
        }
    },
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
    enterMaintenance: true,
    AAA: 1,

    kim: ''
}