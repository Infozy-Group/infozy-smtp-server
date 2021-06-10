// Inititalisation
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');

// Express Configs
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(xss());

// Cors
app.use((req, res, next) => {
  const allowedDomains = process.env.DOMAINS.split(',');
  const { origin } = req.headers;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept,secure_hash,requested_at',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT);
