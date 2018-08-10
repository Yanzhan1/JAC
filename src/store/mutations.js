import * as types from './types'
export default {
    [types.ISLOGIN]: (state) => {
        state.islogin = true;
    },
    [types.NO]: (state,payload) => {
    	state.no = payload;
    },
    [types.SOFTKEYBOARD]: (state, payload) => {
    	state.softkeyboard = payload;
    },
    [types.TOKEN]: (state, payload) => {
    	state.token = payload
    },
    [types.USERID]: (state, payload) => {
      state.userId = payload
    },
    [types.UUID]: (state, payload) => {
      state.uuid = payload
    }
}
