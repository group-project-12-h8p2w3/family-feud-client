import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '', // username user ini
    users: [], // data user di waiting room
    scores: [],
    questions: [],
    answers: [],
    messages: [],
    answered: [],
    time: 20,
    isPlay: false
  },
  mutations: {
    SOCKET_userLogin (state, data) {
      state.user = localStorage.getItem('user')
      state.users = data
    },
    SOCKET_fetchEnteredUser (state, data) {
      state.scores = data
      router.push('/gameplay')
    },
    SOCKET_questionsList (state, data) {
      state.answered = []
      state.answers = data.answer
      state.questions = data.question
    },
    SOCKET_messages (state, data) {
      state.messages = data
    },
    SOCKET_compareAnswer (state, data) {
      if (data.isTrue) {
        state.answered.push(state.answers[data.index])
        state.scores.forEach(el => {
          if (el.username === data.user) {
            el.score += state.answers[data.index].point
          }
        })
      }
    },
    SOCKET_fetchTime (state, data) {
      state.time = data
    },
    SOCKET_gameStart (state, data) {
      state.canStart = data
    }
  },
  actions: {

  },
  modules: {
  }
})
