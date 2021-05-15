import Subject from "../models/Subjects";
import Faculty from "../models/Faculties";
import isId from '../helpers/isId'
import isDocumentExist from '../helpers/isDocumentExist'

export default {
    add: async function (req, res) {
        try {
            if (!isId(req.body.facultyId)) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                        msg: 'Faculty not found'
                    })
            }
            let faculty = await Faculty.findOne({ _id: req.body.facultyId })
            if (!faculty) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                        msg: 'Faculty not found'
                    })
            } else {
                console.log(req.body)
                let subject = new Subject();
                subject.SubjectName = req.body.name;
                subject.SubjectCode = req.body.code;
                subject.FacultyId = req.body.facultyId;
                subject.save();

                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: subject
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
            if (!isId(req.body.facultyId)) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
            let faculty = await Faculty.findOne({ _id: req.body.facultyId })
            let subject = await Subject.findById({ _id: req.query.id })
            if (!faculty) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                        msg: 'Faculty not found'
                    })
            } if (!subject) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                        msg: 'Subject not found'
                    })
            } else {
                subject.SubjectName = req.body.name;
                subject.SubjectCode = req.body.code;
                subject.FacultyId = req.body.facultyId;
                subject.save();

                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: subject
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
            let subject = await Subject.findByIdAndRemove({ _id: req.query.id })
            if (subject) {
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
    getAll: async function (req, res) {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            let subject = await Subject.find({}).sort({ updatedAt: 1 }).skip((page - 1) * limit).limit(limit).populate('FacultyId')

            if (subject) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: subject
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
    }
}
