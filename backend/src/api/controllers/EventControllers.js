import Event from "../models/Events";
import User from "../models/Users";

export default {
    get: async function (req, res) {
        try {
            let event = await Event.findById({ _id: req.body.id })
            if (event) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: event
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
            let event = await Event.findOne({ _id: req.user._id })
            if (event) {
                let event = new Event();
                event.EventTitle = req.body.title;
                event.EventDescription = req.body.description
                event.StartAt = []
                event.EndAt = req.user._id
                event.Duration = req.body.description
                event.IsAllDay = req.body.description
                event.IsRecurring = req.body.description
                event.RecurrencePattern = req.body.description
                event.Owner = req.body.description
                event.ResponseStatus = req.body.description
                event.ColorId = req.body.description

                event.save();
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: event
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
            let calendar = await BaseCalendar.findById({ _id: req.body.id })
            if (calendar) {
                calendar.CalendarTitle = req.body.title;
                calendar.CalendarDescription = req.body.description
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
            let event = await Event.findByIdAndRemove({ _id: req.body.id })
            if (event) {
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
