module.exports = app => {

    // Base URLS
    app.use('/recipes', require('./recipes'))
    app.use('/', require('./base.routes.js'))
    app.use('/profile/:userId', require('./profile'))
    app.use('/auth', require('./auth'))
    


}