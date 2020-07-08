module.exports = app => {

    // Base URLS
    app.use('/recipes', require('./recipes'))
    app.use('/', require('./base/index.js'))
    app.use('/profile', require('./profile'))
    app.use('/auth', require('./auth'))
    


}