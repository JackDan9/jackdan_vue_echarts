import Vue from 'vue'
import Vuex from 'vuex'
import TimeMap from './modules/timeMap'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        TimeMap
    }
})