import BaseCalendar from "../models/BaseCalendars";
import User from "../models/Users";
const ics = require("ics");
let fs = require('fs');
let path = require('path');

export default {
    get: async function (req, res) {
        try {
            let calendar = await BaseCalendar.findById({ _id: req.body.id })
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
    getEvents: async function (req, res) {
        try {
            let calendar = await BaseCalendar.findById({ _id: req.query.id })
                .populate({
                    path: 'Events',
                    populate: {
                        path: 'Attendees.UserId'
                    }
                })
            let events = calendar.Events.map((item) => {
                let resp = {
                    start: [
                        ...item.OnDay.split("-").map(Number),
                        ...item.StartAt.split(":").map(Number),
                    ],
                    end: [
                        ...item.OnDay.split("-").map(Number),
                        ...item.EndAt.split(":").map(Number),
                    ],
                    title: item.EventTitle,
                    description: item.EventDescription,
                };
                if (item.RecurrencePattern) {
                    resp.recurrenceRule = item.RecurrencePattern;
                }
                if (item.Attendees) {
                    resp.attendees = item.Attendees.map((item) => {
                        return {
                            name: item.UserId.Name,
                            email: item.UserId.Email,
                            partstat: "ACCEPTED",
                        };
                    });
                }
                return resp;
            });
            ics.createEvents(events, (error, value) => {
                if (error) {
                    return res
                        .status(404)
                        .json({
                            status: 'Error generating ics file',
                        })
                } else {
                    let filename = 'calendar.ics';
                    let absPath = path.join(__dirname, '../../../my_files', filename);
                    let relPath = path.join('../../../my_files', filename); // path relative to server root

                    fs.writeFile(absPath, value, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        res.download(absPath, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            fs.unlink(absPath, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('FILE [' + filename + '] REMOVED!');
                            });
                        });
                    });
                }
                // res.attachment('calendar.ics')
                // res.type('ics')
                // return res.send(value)

                // return res
                //     .status(200)
                //     .json({
                //         status: 'OK',
                //         data: value
                //     })
            });
        } catch (error) {
            console.log(error)
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
                let baseCalendar = new BaseCalendar();
                baseCalendar.CalendarTitle = req.body.title;
                baseCalendar.CalendarDescription = req.body.description
                baseCalendar.AccessRuleId = req.body.accessRuleId;
                baseCalendar.isHidden = req.body.isHidden;
                baseCalendar.Events = []
                baseCalendar.Owner = req.user._id
                await baseCalendar.save();

                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: baseCalendar
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
                    data: error
                })
        }
    },
    update: async function (req, res) {
        try {
            let calendar = await BaseCalendar.findById({ _id: req.body.id })
            if (calendar) {
                calendar.CalendarTitle = req.body.title;
                calendar.CalendarDescription = req.body.description
                calendar.AccessRuleId = req.body.accessRuleId;
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
            return res
                .status(400)
                .json({
                    status: 'Bad request',
                })
        }
    },
    delete: async function (req, res) {
        try {
            let calendar = await BaseCalendar.findByIdAndRemove({ _id: req.body.id })
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
    search: async function (req, res) {
        try {
            if (req.query.calendar) {
                if (req.query.user) {
                    let userId = await User.findOne({ $text: { $search: req.query.user } }).select('_id')
                    let result = await BaseCalendar.find({ $text: { $search: req.query.calendar }, Owner: userId, isHidden: false })
                        .skip(new Number(req.query.index))
                        .limit(new Number(req.query.count))
                        .populate('Owner', 'Name')
                        .populate('AccessRuleId', 'AccessName')
                    return res
                        .status(200)
                        .json({
                            data: result,
                            status: 'OK'
                        })
                } else {
                    let result = await BaseCalendar.find({ $text: { $search: req.query.calendar } })
                        .skip(new Number(req.query.index))
                        .limit(new Number(req.query.count))
                        .populate('Owner', 'Name')
                        .populate('AccessRuleId', 'AccessName')
                    return res
                        .status(200)
                        .json({
                            data: result,
                            status: 'OK'
                        })
                }
            }
            else {
                let userId = await User.findOne({ $text: { $search: req.query.user } }).select('_id')
                let result = await BaseCalendar.find({ Owner: userId })
                    .skip(new Number(req.query.index))
                    .limit(new Number(req.query.count))
                    .populate('Owner', 'Name')
                    .populate('AccessRuleId', 'AccessName')
                return res
                    .status(200)
                    .json({
                        data: result,
                        status: 'OK'
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
    }
}
