import Faculty from "../models/Faculties";

export default {
    add: async function (req, res) {
        try {
            let faculty = new Faculty();
            faculty.FacultyName = req.body.facultyName;
            faculty.FacultyDescription = req.body.facultyDescription;
            faculty.Subjects = [];
            faculty.save();
            return res
                .status(200)
                .json({
                    status: 'OK',
                    data: faculty
                })
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
            let faculty = await Faculty.findById({_id: req.body.id })
            faculty.FacultyName = req.body.facultyName;
            faculty.FacultyDescription = req.body.facultyDescription;
            faculty.save();
            return res
                .status(200)
                .json({
                    status: 'OK',
                    data: faculty
                })
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

            let faculty = await Faculty.find({}).populate('Subjects').sort({updatedAt: 1}).skip((page-1)*limit).limit(limit)

            if (faculty) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: faculty
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
    }
}
