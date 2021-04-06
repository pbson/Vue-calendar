import Color from "../models/Colors";

export default {
    get: async function (req, res) {
        try {
            let color = await Color.findById({ _id: req.body.id })
            if (calendar) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: color
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
            let color = await Color.find({})
            if (color) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: color
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
