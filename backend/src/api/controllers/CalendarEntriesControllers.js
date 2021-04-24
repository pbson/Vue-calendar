import CalendarEntries from "../models/CalendarEntries";
import BaseCalendar from "../models/BaseCalendars";
import Color from "../models/Colors";
import Rule from "../models/AccessRules";
import User from "../models/Users";
import isId from '../helpers/isId'
import isDocumentExist from '../helpers/isDocumentExist'

export default {
    getAll: async function (req, res) {
        try {
            let calendarList = await User.findOne({ _id: req.user._id }).select({ "CalendarLists": 1, "_id": 1 })
                .populate({
                    path: 'CalendarLists',
                    populate: {
                        path: 'CalendarId ColorId',
                    }
                })
                // .populate('CalendarLists')
            if (calendarList) {
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
            console.log(error)
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    get: async function (req, res) {
        try {
            let calendar = await CalendarEntries
                .findById(req.query.id)
                .populate({
                        path: 'CalendarId ColorId AccessRuleId',
                })

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
            console.log(error)
            return res
                .status(400)
                .json({
                    data: error,
                    status: 'Bad request',
                })
        }
    },
    add: async function (req, res) {
        try {
            if (!isId(req.body.calendarId) || !isId(req.body.accessRuleId) || !isId(req.body.colorId)) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
            let user = await isDocumentExist(User, req.user._id)
            let baseCalendar = await isDocumentExist(BaseCalendar, req.body.calendarId)
            let color = await isDocumentExist(Color, req.body.colorId)
            let rule = await isDocumentExist(Rule, req.body.accessRuleId)

            if (user && baseCalendar && color && rule) {
                let calendar = new CalendarEntries();
                calendar.CalendarId = req.body.calendarId;
                calendar.AccessRuleId = req.body.accessRuleId;
                calendar.ColorId = req.body.colorId;
                calendar.Reminders = req.body.time;
                calendar.isHidden = req.body.isHidden;
                calendar.isPrimary = req.body.isPrimary;
                calendar.save();

                user.CalendarLists.push(calendar._id)
                user.save();
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
                    data: error,
                    status: 'Bad request',
                })
        }
    },
    update: async function (req, res) {
        try {
            console.log(req.body)
            if (!isId(req.body.accessRuleId) || !isId(req.body.colorId)) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
            let user = await isDocumentExist(User, req.user._id)
            let color = await isDocumentExist(Color, req.body.colorId)
            let rule = await isDocumentExist(Rule, req.body.accessRuleId)

            if (user && color && rule) {
                let calendar = await CalendarEntries.findOne({ _id: req.body.id })
                calendar.AccessRuleId = req.body.accessRuleId;
                calendar.Reminders = req.body.time;
                calendar.ColorId = req.body.colorId;
                calendar.isHidden = req.body.isHidden;
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
            console.log(error);
            return res
                .status(400)
                .json({
                    data: error,
                    status: 'Bad request',
                })
        }
    },
    delete: async function (req, res) {
        try {
            if (!isId(req.body.id)) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }

            let user = await isDocumentExist(User, req.user._id)
            let calendar = await CalendarEntries.findByIdAndRemove({ _id: req.body.id })

            let index = user.CalendarLists.indexOf(req.body.id);
            if (index > -1) {
                user.CalendarLists.splice(index, 1);
            }
            user.save();

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
            console.log(error)
            return res
                .status(400)
                .json({
                    data: error,
                    status: 'Bad request',
                })
        }
    },
}
