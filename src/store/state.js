export default {
    islogin: false, //判断是否登录 正式上线用
    // islogin: true, //判断是否登录 测试用
    //userId: 1165864, //用户userID 正式上线用
    userId: null,
    uuid: null,
    UserStartId: null,
    no: '', //模拟使用的用户no
    mobile: null, //用户手机号
    softkeyboard: true, //默认软键盘开启
    token: null, //用户token
    userNo: 'AD022018081504171568405', //userNo
    getpin: {
        headers: {
            "identityParam": "{ userId: 'c123', token: 'sdfasdfasdfasd', phone: '15221794973' }",
        }
    }, //爱车发送请求时的token,暂用
    mytoken: {
        headers: {
            "timaToken": ""
        }
    }, //除了爱车部分暂用的token
    vins: '', //车辆的pin码暂时用，登入后拿到放这里 
    loadingflag: false, //loading动画状态
}