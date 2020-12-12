import Vue from "vue"
import Vuex from "vuex"
import {mutations} from "@/store/mutations"
import {actions} from "@/store/actions"
import {getters} from "@/store/actions"

Vue.use(Vuex)

const state = {

}
export default new Vuex.Store({
  state, mutations, actions, getters,
  modules: {}
})
