export default {
    // islogin: false, //判断是否登录 正式上线用
    islogin: true, //判断是否登录 测试用
    userId: 1165864, //用户userID 正式上线用
    UserStartId: null,
    no: '', //模拟使用的用户no
    softkeyboard: true, //默认软键盘开启
    token: {}, //用户token
    getpin: {
        headers: {
            "identityParam": {
                token: "sdfasdfasdfasd",
                phone: "1231341234"
            }
        }
    } //爱车发送请求时的token
}