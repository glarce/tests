module.exports = async () => {
    const Glarce = require("Glarce")
    const app = new Glarce()
    process.env.production = true

    app.set("publicPath", "/")
    app.set("test", "build")

    app.get(7, (res, req) => {
        res.send('videos/spook.webssm')
    })
    app.start()
    return await app.getTestResults()
}
