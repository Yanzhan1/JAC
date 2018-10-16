export default {
    islogin: false, //判断是否登录 正式上线用
    // islogin: true, //判断是否登录 测试用
    //userId: 1165864, //用户userID 正式上线用
    userId: '',
    trueuserId: '', //原生传过来的userid
    tspId: '',
    uuid: null,
    UserStartId: null,
    mobile: null, //用户手机号
    softkeyboard: true, //默认软键盘开启
    token: null, //用户token
    refreshToken: '',
    integral: '', //用户总积分
    everyno: '', //智享主页点击时候每个车的no
    seriesName: '', //智享主页点击时候车的每一个seriesName
    srouceNo: '', //智享主页点击时候车的每一个srouceNo
    // userNo: 'AD022018081504171568405', //userNo
    tsppin: {
        headers: {
            "identityParam": '{ "userId": "", "token": "", "phone": "" }',
        }
    }, //非爱车发送请求时的token,暂用
    getpin: {
        headers: {
            "identityParam": '{ "userId": "", "token": "", "phone": "" }',
        }
    }, //爱车发送请求时的token,暂用
    mytoken: {
        headers: {
            "timaToken": "Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImlkXCI6OTksXCJpbml0VXNlclwiOjAsXCJub1wiOlwiQUQwMjIwMTgwOTA0MTExMTU4NDQ1MTJcIixcInBob25lXCI6XCIxNzcyNDgxNTU4NlwiLFwidXNlckNvZGVcIjpcIjE3NzI0ODE1NTg2XCIsXCJ1c2VyU3RhdHVzXCI6MCxcInVzZXJUeXBlXCI6XCIwMVwifSIsImNyZWF0ZWQiOjE1MzYwMzEzOTQzODIsInVzZXJObyI6IkFEMDIyMDE4MDkwNDExMTE1ODQ0NTEyIiwidXNlclR5cGUiOiIwMSIsImV4cCI6MTUzNjg5NTM5NCwidXNlcklkIjo5OX0.Ut-QmhL4DFWP97sPAZ08iK2Z-xctT0iW-rH0-zTjBgs"
        }
    }, //除了爱车部分暂用的token
    vins: '', //车辆的pin码暂时用，登入后拿到放这里
    loadingflag: false, //loading动画状态
    selectLabelState: null, //选择的频道
    mobileStatusBar: '', //手机适配,原生提供状态栏高度
    shownum: '', //车系特色判断返回的路由
    busNo: null, //主推车型，全部车型 选择的no
    qrCodeDate: null, //扫描二维码给出信息
    changeScrollY: '' //存储滚动高度
}