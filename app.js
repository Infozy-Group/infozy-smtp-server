// Inititalisation
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('./middlewares/cors');
const mongoSanitize = require('express-mongo-sanitize');
const checkOrigin = require('./middleware/checkOrigin');
const secureTunnel = require('./middleware/secureTunnel');

// Express Configs
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(checkOrigin);
app.use(secureTunnel);
app.use(cors);

// Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT);
