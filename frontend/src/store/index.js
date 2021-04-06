import {createStore} from "vuex";

const store = createStore({
    state(){
        return {
            isSidebarActive: false
        }
    },
    mutations: {
        setIsSidebarActive(state, payload) {
            state.isSidebarActive = payload;
        }
    }
})

export default store;