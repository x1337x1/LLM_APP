const accountController = {
    async signup(req, res) {
        try {
            res.send("ok")
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = accountController