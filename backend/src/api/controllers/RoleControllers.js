import Role from "../models/Roles";

export default {
    get: async function (req, res) {
        try {
            let role = await Role.findById({ _id: req.body.id })
            if (role) {
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
