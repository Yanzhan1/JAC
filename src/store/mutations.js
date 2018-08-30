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
        if (payload) {
            //state.no = payload.no
            state.mobile = payload.mobile
            state.vin = payload.vin
            state.token = payload.token
        } else {
            //state.no = null
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
}