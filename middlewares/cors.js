module.exports = (req, res, next) => {
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
};
