export default {
    islogin: false, //判断是否登录 正式上线用
    // islogin: true, //判断是否登录 测试用
    //userId: 1165864, //用户userID 正式上线用
    userId: null,
    uuid: null,
    UserStartId: null,
    no: '', //模拟使用的用户no
    softkeyboard: true, //默认软键盘开启
    token: {

    }, //用户token
    getpin: {
        headers: {
            // "identityParam": {
            //     userId: '123',
            //     token: "sdfasdfasdfasd",
            //     phone: "1231341234"
            // }
            "identityParam": "{'userId': 'c123','token': 'sdfasdfasdfasd','phone': '1231341234'}",
            "token": "Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImNyZWF0ZWREYXRlXCI6MTUzMzg2NzA4NDAwMCxcImRlbGV0ZUZsYWdcIjpcIjBcIixcImlkXCI6MjUsXCJpbml0VXNlclwiOjAsXCJsYXN0TW9kaWZpZWREYXRlXCI6MTUzNDI5NjYyMzAwMCxcIm5vXCI6XCJBRDAyMjAxODA4MTAxMDExMjQ2MTk0OFwiLFwicGFzc3dvcmRcIjpcIjEyMzQ1NnNcIixcInBob25lXCI6XCIxNTAyMTYwMDI4MVwiLFwidXNlclN0YXR1c1wiOjAsXCJ2ZXJzaW9uXCI6NH0iLCJjcmVhdGVkIjoxNTM0MzM0NDIyNjU1LCJ1c2VyTm8iOiJBRDAyMjAxODA4MTAxMDExMjQ2MTk0OCIsImV4cCI6MTUzNTE5ODQyMiwidXNlcklkIjoyNX0.ODi5uVNeIe7y8om_dUe1wjgmMeGd8vgT_IUWUJpLSRs"
        }
    }, //爱车发送请求时的token,暂用
    mytoken: {
        headers: {
            // "identityParam": {
            //     userId: '123',
            //     token: "sdfasdfasdfasd",
            //     phone: "1231341234"
            // }
            // "identityParam": "{'userId': 'c123','token': 'sdfasdfasdfasd','phone': '1231341234'}",
            "token": "Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImNyZWF0ZWREYXRlXCI6MTUzMzg2NzA4NDAwMCxcImRlbGV0ZUZsYWdcIjpcIjBcIixcImlkXCI6MjUsXCJpbml0VXNlclwiOjAsXCJsYXN0TW9kaWZpZWREYXRlXCI6MTUzNDI5NjYyMzAwMCxcIm5vXCI6XCJBRDAyMjAxODA4MTAxMDExMjQ2MTk0OFwiLFwicGFzc3dvcmRcIjpcIjEyMzQ1NnNcIixcInBob25lXCI6XCIxNTAyMTYwMDI4MVwiLFwidXNlclN0YXR1c1wiOjAsXCJ2ZXJzaW9uXCI6NH0iLCJjcmVhdGVkIjoxNTM0MzM0NDIyNjU1LCJ1c2VyTm8iOiJBRDAyMjAxODA4MTAxMDExMjQ2MTk0OCIsImV4cCI6MTUzNTE5ODQyMiwidXNlcklkIjoyNX0.ODi5uVNeIe7y8om_dUe1wjgmMeGd8vgT_IUWUJpLSRs"
        }
    }, //爱车发送请求时的token,暂用
    vin: 'LS5A3CJC9JF830020' //车辆的pin码暂时用，登入后拿到放这里
}