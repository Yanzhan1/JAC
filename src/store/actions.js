import * as types from './types'
export default {
    isLogin: ({ commit, state }, payload) => {
        commit(types.ISLOGIN, payload)
    },
    NO: ({ commit, state}, payload) => {
    	commit(types.NO, payload)
    }
}
