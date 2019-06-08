require("dotenv").config();

var bot = require('./bot');
require('./server')(bot);