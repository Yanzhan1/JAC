import * as types from './types'
export default {
    isLogin: ({ commit, state }, payload) => {
        commit(types.ISLOGIN, payload)
    },
    NO: ({ commit, state}, payload) => {
    	commit(types.NO, payload)
    },
    SOFTKEYBOARD: ({commit, state}, payload) => {
    	commit(types.SOFTKEYBOARD, payload)
    },
    TOKEN: ({commit, state}, payload) => {
    	commit(types.TOKEN, payload)
    },
    userId: ({ commit, state }, payload) => {
      commit(types.USERID, payload)
    },
    uuid: ({ commit, state }, payload) => {
      commit(types.UUID, payload)
    },
}
