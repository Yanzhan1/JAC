import * as types from './types'
export default {
    isLogin: ({ commit, state }, payload) => {
        commit(types.ISLOGIN, payload)
    },
    NO: ({ commit, state}, payload) => {
    	commit(types.NO, payload)
    },
    TOKEN: ({commit, state}, payload) => {
      commit(types.TOKEN, payload)
    },
    SOFTKEYBOARD: ({commit, state}, payload) => {
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
    LOADINGFLAG: ({commit, state}, payload) => {
    	commit(types.LOADINGFLAG, payload)
    }
}
