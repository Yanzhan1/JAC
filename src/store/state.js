export default {
    islogin: false, //判断是否登录 正式上线用
    // islogin: true, //判断是否登录 测试用
    //userId: 1165864, //用户userID 正式上线用
    userId: null,
    uuid: null,
    UserStartId: null,
    no: '', //模拟使用的用户no
    softkeyboard: true, //默认软键盘开启
    token: {}, //用户token
    getpin: {
        headers: {
            // "identityParam": {
            //     userId: '123',
            //     token: "sdfasdfasdfasd",
            //     phone: "1231341234"
            // }
            "identityParam": "{'userId': 'c123','token': 'sdfasdfasdfasd','phone': '1231341234'}"
        }
    }, //爱车发送请求时的token,暂用
    vin: 'LS5A3CJC9JF810003' //车辆的pin码暂时用，登入后拿到放这里
}