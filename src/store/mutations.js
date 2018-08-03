import * as types from './types'
export default {
    [types.ISLOGIN]: (state) => {
        state.islogin = true;
    },
    [types.NO]: (state,payload) => {
    	state.no = payload
    }
}
