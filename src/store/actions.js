import * as types from './types'
export default {
    isLogin: ({ commit, state }, payload) => {
        commit(types.ISLOGIN, payload)
    },
    getWords: ({ commit, state }, payload) => {
        commit(types.GETWORDS, payload)
    },
    SOFTKEYBOARD: ({ commit, state }, payload) => {
        commit(types.SOFTKEYBOARD, payload)
    },
    userId: ({ commit, state }, payload) => {
        commit(types.USERID, payload)
    },
    imgUrl: ({ commit, state }, payload) => {
        commit(types.IMGURL, payload)
    },
    uuid: ({ commit, state }, payload) => {
        commit(types.UUID, payload)
    },
    userInfo: ({ commit, state }, payload) => {
        commit(types.USERINFO, payload)
    },
    updateUserInfo:({ commit, state }, payload) => {
        commit(types.UPDATEUSERINFO, payload)
    },
    LOADINGFLAG: ({ commit, state }, payload) => {
        commit(types.LOADINGFLAG, payload)
    },
    CARVINS: ({ commit, state }, payload) => {
        commit(types.CARVINS, payload)
    },
    selectLabelState: ({ commit, state }, payload) => {
        commit(types.SELECTLABELSTATE, payload)
    },
    TSP: ({ commit, state }, payload) => {
        commit(types.TSP, payload)
    },
    NONAME: ({ commit, state }, payload) => {
        commit(types.NONAME, payload)
    },
    MOBILESTATUSBAR: ({ commit, state }, payload) => {
        commit(types.MOBILESTATUSBAR, payload)
    },
    QRCODEPIN: ({ commit, state }, payload) => {
        commit(types.QRCODEPIN, payload)
    },
    RECORD: ({ commit, state }, payload) => {
        commit(types.RECORD, payload)
    }
}
