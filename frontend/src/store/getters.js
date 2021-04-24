const getters = {
    Notifications: state => state.Notifications.map(n => n.Raw)
}

export default getters