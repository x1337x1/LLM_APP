
const homeController = {
    async home(req, res) {
        try {
            res.ok()
        } catch (error) {
            res.failureResponse(error)
        }
    },



}
module.exports = homeController