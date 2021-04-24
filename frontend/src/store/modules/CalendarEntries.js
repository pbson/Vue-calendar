import axios from 'axios'

const state = {
    calendarList: null
}

const getters = {
    getCalendarList: state => {
        return state.calendarList
    },
    getSidebarCalendarList: state => {
        return state.calendarList.map(elem => {
            var obj = {}
            obj['id'] = elem._id
            obj['name'] = elem.CalendarId.CalendarTitle
            obj['color'] = elem.ColorId.CalendarMain
            return obj
        })
    },
    getEventDialogCalendarList: state => {
        return state.calendarList.map(elem => {
            var obj = {}
            obj['id'] = elem.CalendarId._id
            obj['name'] = elem.CalendarId.CalendarTitle
            obj['color'] = elem.ColorId._id
            return obj
        })
    }
}

const mutations = {

}

const actions = {
    addCalendarList: async function ({state}) {
        const token = localStorage.getItem('token');
        try {
            let resp = await axios({
                url: 'http://localhost:3000/calendar-entries/getall',
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            });
            state.calendarList = resp.data.data.CalendarLists
        } catch (error) {
            console.log(error)
        }
    },
}

export default {
    state, getters, mutations, actions
}