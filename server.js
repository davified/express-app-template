const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('./config/ppConfig')
const session = require('express-session')
const flash = require('connect-flash')
const router = require('./config/routes')
const app = express()
const dotenv = require('dotenv')
dotenv.load()

// Setting EJS as the view engine
app.set('view engine', 'ejs')

// Mounting middleware
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(ejsLayouts)

app.use(session({
  secret: 'secret_cat',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.alerts = req.flash()
  next()
})

// wiring up the router
app.get('/', router)

app.listen(process.env.PORT || 3000, function() {
  console.log("your server's running at PORT 3000");
})
