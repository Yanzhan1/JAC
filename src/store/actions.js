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
    userName: ({ commit, state }, payload) => {
        commit(types.USERNAME, payload)
    },
    LOADINGFLAG: ({ commit, state }, payload) => {
        commit(types.LOADINGFLAG, payload)
    },
    CARVINS: ({ commit, state }, payload) => {
        commit(types.CARVINS, payload)
    },
    // nomarlseriseName: ({ commit, state }, payload) => {
    //     commit(types.NOMARLSERISENAME, payload)
    // },
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
    },
    RECORDNO: ({ commit, state }, payload) => {
        commit(types.RECORDNO, payload)
    },
    defaultInformation: ({ commit, state }, payload) => {
        commit(types.DEFAULTINFORMATION, payload)
    },
    change$FLAG: ({ commit, state }, payload) => {
        commit(types.CHANGE_$FLAG, payload)
    },
    position: ({ commit, state }, payload) => {
        commit(types.POSITION, payload)
    },
    VehicleInformation: ({ commit, state }, payload) => {
        commit(types.VEHICLEINFORMATION, payload)
    },
    DriverInformation: ({ commit, state }, payload) => {
        commit(types.DRIVERINFORMATION, payload)
    },
    FleetInformation: ({ commit, state }, payload) => {
        commit(types.FLEETINFORMATION, payload)
    },
    FleetBehaviorAnalysis: ({ commit, state }, payload) => {
        commit(types.FLEETBEHAVIORANALYSIS, payload)
    },
}
