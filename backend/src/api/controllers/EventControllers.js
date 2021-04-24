import CalendarEntries from "../models/CalendarEntries";
import BaseCalendar from "../models/BaseCalendars";
import User from "../models/Users";
import Event from "../models/Events";

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
            let user = await User.findOne({ _id: req.user._id })
            if (user) {
                let event = new Event();
                event.EventTitle = req.body.title;
                event.EventDescription = req.body.description
                event.OnDay = req.body.onDay
                event.StartAt = req.body.startAt
                event.EndAt = req.body.endAt
                event.Duration = req.body.duration
                event.IsRecurring = req.body.isRecurring
                event.RecurrencePattern = req.body.recurrencePattern
                event.Owner =  req.user._id
                event.ResponseStatus = req.body.responseStatus
                event.ColorId = req.body.colorId
                event.BaseCalendarId = req.body.calendarId

                event.save();

                let calendar = await BaseCalendar.findOne({ _id: req.body.calendarId })
                calendar.Events.push(event._id)
                calendar.save();
                
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
            console.log(error)
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    update: async function (req, res) {
        try {
            let user = await User.findOne({ _id: req.user._id })
            if (user) {
                let event = await Event.findOne({_id: req.body.id})
                event.EventTitle = req.body.title;
                event.EventDescription = req.body.description
                event.StartAt = req.body.startAt
                event.EndAt = req.body.endAt
                event.Duration = req.body.duration
                event.IsAllDay = req.body.isAllDay
                event.IsRecurring = req.body.isRecurring
                event.RecurrencePattern = req.body.ecurrencePattern
                event.Owner =  req.user._id
                event.ResponseStatus = req.body.responseStatus
                event.ColorId = req.body.colorId

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
            console.log(error)
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    delete: async function (req, res) {
        try {
            let event = await Event.findById( req.body.id )
            console.log(event)
            let calendar = await BaseCalendar.findOne({_id:event.BaseCalendar})


            let index = calendar.Events.indexOf( event.BaseCalendar );
            if (index > -1) {
                calendar.Events.splice(index, 1);
            }

            event.remove();

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
            console.log(error)
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
}
