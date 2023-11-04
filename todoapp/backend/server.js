const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const Mysqlstore = require('express-mysql-session')(session);
let options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "todoapp",
    expiration: 1000 * 60 * 60 * 24,
    clearExpired: true,
    checkExpirationInterval: 1000 * 60 * 60 * 24, //per day db cleaning
};

let sessionStore = new Mysqlstore(options);
var csrf = require('./auth/csrf_protection');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');
const logoutRouter = require('./routes/logoutRouter');
const taskRouter = require('./routes/taskRoute');
const { loginCheck } = require('./auth/passport');
loginCheck(passport)

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:'kwasibaidoo',
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 24*60*60*1000,
        sameSite: 'lax',
        httpOnly: false,
        domain: "localhost",
        secure: false,
    }
}));
app.use(cors({
    origin: ['http://localhost:5173'], 
    credentials: true,
    optionsSuccessStatus: 204,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())
app.use(csrf.generateCSRFToken)



// ROUTES
app.use('/api',registerRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/tasks',taskRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;

