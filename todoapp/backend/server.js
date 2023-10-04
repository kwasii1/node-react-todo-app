/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;

