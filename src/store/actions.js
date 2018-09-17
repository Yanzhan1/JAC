import * as types from './types'
export default {
    isLogin: ({ commit, state }, payload) => {
        commit(types.ISLOGIN, payload)
    },
    SOFTKEYBOARD: ({ commit, state }, payload) => {
        commit(types.SOFTKEYBOARD, payload)
    },
    userId: ({ commit, state }, payload) => {
        commit(types.USERID, payload)
    },
    uuid: ({ commit, state }, payload) => {
        commit(types.UUID, payload)
    },
    userInfo: ({ commit, state }, payload) => {
        commit(types.USERINFO, payload)
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
    }
}