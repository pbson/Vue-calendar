import axios from 'axios'
import swal from "sweetalert";

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
}

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
}

const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.status = 'success'
        state.token = token
        state.user = user
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''
        state.token = ''
    },
}

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: 'http://localhost:3000/auth/login', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    localStorage.setItem('id', user._id)
                    localStorage.setItem('role', user.Role)
                    localStorage.setItem('faculty', user.Faculty)
                    axios.defaults.headers.common['auth-token'] = token
                    commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    swal("Login error!", "Please check your field again!", "error");
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    async register({ commit }, user) {
        commit('auth_request')
        try {
            let resp = await axios({ url: 'http://localhost:3000/auth/register', data: user, method: 'POST' });
            const token = resp.data.token
            const respUser = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('id', respUser._id)
            axios.defaults.headers.common['auth-token'] = token
            commit('auth_success', token, respUser)

            return resp
        } catch (error) {
            console.log(error)
            commit('auth_error', error)
            localStorage.removeItem('token')
        }
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('id')
            localStorage.removeItem('faculty')
            delete axios.defaults.headers.common['auth-token']
            resolve()
        })
    }
}

export default {
    state, getters, mutations, actions
}