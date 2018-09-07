import * as types from './types'
export default {
    [types.ISLOGIN]: (state, payload) => {
        state.islogin = payload;
    },
    [types.SOFTKEYBOARD]: (state, payload) => {
        state.softkeyboard = payload;
    },
    [types.USERID]: (state, payload) => {
        state.userId = payload
    },
    [types.UUID]: (state, payload) => {
        state.uuid = payload
    },
    [types.USERINFO]: (state, payload) => {
        // alert(JSON.stringify(payload))
        if (payload) {
            state.no = payload.no
            state.mobile = payload.mobile
            state.vins = payload.vin
            state.token = payload.token
            var str = JSON.parse(state.getpin.headers.identityParam)
            str.phone = payload.mobile
            state.getpin.headers.identityParam = JSON.stringify(str)
                // alert(JSON.stringify(str))
        } else {
            state.no = null
            state.mobile = null
            state.vin = null
            state.token = null
        }
    },
    [types.LOADINGFLAG]: (state, payload) => {
        state.loadingflag = payload
    },
    [types.CARVINS]: (state, payload) => {
        state.vins = payload
    },
    [types.SELECTLABELSTATE]: (state, payload) => {
        state.selectLabelState = payload
    },
    [types.TSP]: (state, payload) => {
        var str = JSON.parse(state.getpin.headers.identityParam)
            // alert(JSON.stringify(payload))
            // alert(typeof payload.token)
        str.userId = payload.tspId + '';
        str.token = payload.token;
        state.refreshToken = payload.refreshToken
            // console.log(str)
        state.getpin.headers.identityParam = JSON.stringify(str)
            // alert(JSON.stringify(str))
            // console.log(state.getpin.headers.identityParam)
            // alert(JSON.parse(state.getpin.headers.identityParam).userId)
            // alert(25)

    }
}