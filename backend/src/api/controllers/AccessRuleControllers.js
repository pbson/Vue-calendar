import AccessRule from "../models/AccessRules";

export default {
    getAll: async function (req, res) {
        try {
            let rule = await AccessRule.find({})
            if (rule) {
                return res
                    .status(200)
                    .json({
                        status: 'OK',
                        data: rule
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
