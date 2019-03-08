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
    [types.IMGURL]: (state, payload) => {
        state.imgUrl = payload
    },
    [types.UUID]: (state, payload) => {
        state.uuid = payload
    },
    [types.USERINFO]: (state, payload) => {
        // alert(JSON.stringify(payload))
        if (payload) {
            state.sign = payload.sign
            state.userName = payload.userName
                // state.imgUrl = payload.imgUrl
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
            state.token = ''
        }
    },
    [types.USERNAME]: (state, payload) => {
        state.userName = payload
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
        state.srouceNo = payload.lmscode
    },
    [types.SELECTLABELSTATE]: (state, payload) => {
        state.selectLabelState = payload
    },
    [types.NOMARLSERISENAME]: (state, payload) => {
        state.nomarlseriseName = payload
    },
    [types.TSP]: (state, payload) => {
        state.aaaid = payload.aaaid
        var str = JSON.parse(state.tsppin.headers.identityParam)
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
    [types.RECORD]: (state, payload) => {
        state.record = payload
    },
    [types.GETLOCATIONINFO]: (state, payload) => {
        state.locationMes = payload
    },
    changeScrollY: (state, payload) => {
        state.changeScrollY = payload
    },
    [types.CHANGE_$FLAG]: (state, payload) => {
        state.$flag = payload
    },
    [types.RECORDNO]: (state, payload) => {
        state.recordNo = payload
    },
    [types.DEFAULTINFORMATION]: (state, payload) => {
        state.defaultInformation = payload
    },
}