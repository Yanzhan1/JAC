import * as types from './types'
export default {
    [types.ISLOGIN]: (state, payload) => {
        state.islogin = payload;
    },
    [types.GETWORDS]: (state, payload) => {
        state.GETWORDS = payload;
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
            state.sign = payload.sign
            state.userName = payload.userName
            state.imgUrl = payload.imgUrl
            state.trueuserId = payload.userId
            state.no = payload.no
            state.mobile = payload.mobile
                // state.vins = payload.vin
            state.token = payload.token
            var str = JSON.parse(state.tsppin.headers.identityParam)
            str.phone = payload.mobile
            state.tsppin.headers.identityParam = JSON.stringify(str)
                // alert(JSON.stringify(str))
            var strr = JSON.parse(state.getpin.headers.identityParam)
            strr.phone = payload.mobile
            strr.token = payload.token
            strr.userId = payload.no
            state.getpin.headers.identityParam = JSON.stringify(strr)
        } else {
            state.no = null
            state.mobile = null
                // state.vinst = null
            state.token = null
        }
    },
    [types.LOADINGFLAG]: (state, payload) => {
        state.loadingflag = payload
    },
    [types.CARVINS]: (state, payload) => {
        state.vins = payload
    },
    [types.NONAME]: (state, payload) => {
        state.seriesName = payload.seriesName
        state.everyno = payload.no
        state.srouceNo = payload.srouceNo
    },
    [types.SELECTLABELSTATE]: (state, payload) => {
        state.selectLabelState = payload
    },
    [types.TSP]: (state, payload) => {
        state.aaaid = payload.aaaid
        var str = JSON.parse(state.tsppin.headers.identityParam)
            // alert(JSON.stringify(payload))
            // alert(typeof payload.token)
        str.userId = payload.aaaid + '';
        str.token = payload.token;
        state.refreshToken = payload.refreshToken
        state.tsppin.headers.identityParam = JSON.stringify(str)
        state.tspId = payload.tspId
        state.buding.headers.token = payload.token;

    },
    [types.MOBILESTATUSBAR]: (state, payload) => {
        state.mobileStatusBar = payload / 4
    },
    [types.QRCODEPIN]: (state, payload) => {
        state.qrCodeDate = payload
    },
    changeScrollY: (state, payload) => {
        state.changeScrollY = payload
    }
}