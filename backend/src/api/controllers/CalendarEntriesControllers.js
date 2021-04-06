import CalendarEntries from "../models/CalendarEntries";
import User from "../models/Users";

export default {
    getAll: async function (req, res) {
        try {
            let calendarList = await User.findOne({ _id: req.user._id }).select({ "CalendarLists": 1,"_id": 1}).populate('CalendarLists')
            if (user) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: calendarList
                    })
            } else {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    get: async function (req, res) {
        try {
            let calendar = await CalendarEntries.findById({ _id: req.body.id })
            if (calendar) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: calendar
                    })
            } else {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    add: async function (req, res) {
        try {
            let user = await User.findOne({ _id: req.user._id })
            if (user) {
                let calendar = new CalendarEntries();
                calendar.CalendarId = req.body.calendarId;
                calendar.AccessRuleId = req.body.accessRuleId;
                calendar.ColorId = req.body.colorId;
                calendar.isHidden = req.body.isHidden;
                calendar.isPrimary = req.body.isPrimary;
                calendar.save();
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: calendar
                    })
            } else {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    update: async function (req, res) {
        try {
            let calendar = await CalendarEntries.findById({ _id: req.body.id })
            if (calendar) {
                calendar.CalendarId = req.body.calendarId;
                calendar.AccessRuleId = req.body.accessRuleId;
                calendar.ColorId = req.body.colorId;
                calendar.isHidden = req.body.isHidden;
                calendar.isPrimary = req.body.isPrimary;
                calendar.save();
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: calendar
                    })
            } else {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    delete: async function (req, res) {
        try {
            let calendar = await CalendarEntries.findByIdAndRemove({ _id: req.body.id })
            if (calendar) {
                return res
                    .status(200)
                    .json({
                        status: 'OK'
                    })
            } else {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
}
