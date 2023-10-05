const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
var csrf = require('./auth/csrf_protection')
var registerRouter = require('./routes/registerRoute');

const app = express();
const port = 3001;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({
    secret:'kwasibaidoo',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24*60*60*1000
    }
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(csrf.generateCSRFToken)
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/api',registerRouter)





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;

