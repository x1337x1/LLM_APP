const { getAccountCollection, createTenantDB } = require("../utils/multi-tenancy/tenancy")
const { generateApiKey } = require('generate-api-key');
const bcrypt = require('bcrypt');

const accountController = {
    async signup(req, res) {
        try {
            const { email, name, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 12);
            const tenantId = generateApiKey({ method: 'string', pool: 'abcdefghijklmnopqrstuvwxyz123456789' })
            const data = {
                email: email,
                name: name,
                password: hashedPassword
            }
            const account = await createTenantDB(tenantId, data)
            res.created({ data: account })
        } catch (error) {
            console.log(error)
        }
    },

    async login(req, res) {
        try {
            const { tenantId } = req.query
            const { email, password } = req.body
            const AccountModel = await getAccountCollection(tenantId)
            const user = await AccountModel.findOne({ email: email })
            if (!user) return res.recordNotFound()
            /**
             * check if user password matches the on in database
             */
            const isAuth = await bcrypt.compare(password, user.password);

            // if true then return authorized :)
            if (isAuth) return res.ok({ data: user })

            // if wrong then return unauthorized :(
            return res.unAuthorizedRequest();
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = accountController