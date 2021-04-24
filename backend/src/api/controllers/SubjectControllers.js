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
                let subject = new Subject();
                subject.SubjectName = req.body.subjectName;
                subject.SubjectCode = req.body.subjectCode;
                subject.FacultyId = req.body.facultyId;
                subject.save();

                faculty.Subjects.push(subject._id)
                faculty.save();

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
            if (!isId(req.body.facultyId) || !isId(req.body.id)) {
                return res
                    .status(404)
                    .json({
                        status: 'Not found',
                    })
            }
            let faculty = await Faculty.findOne({ _id: req.body.facultyId })
            let subject = await Subject.findById({ _id: req.body.id })
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
                subject.SubjectName = req.body.subjectName;
                subject.SubjectCode = req.body.subjectCode;
                subject.FacultyId = req.body.facultyId;
                subject.save();

                faculty.Subjects.push(subject._id)
                faculty.save();

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
    getAll: async function (req, res) {
        try {
            const page = parseInt(req.body.page)
            const limit = parseInt(req.body.limit)

            let subject = await Subject.find({FacultyId: req.body.facultyId}).sort({ updatedAt: 1 }).skip((page - 1) * limit).limit(limit)

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
