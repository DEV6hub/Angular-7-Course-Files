const auth = require('basic-auth');

module.exports = (req, res, next) => {
  var user = auth(req);

  if (typeof user === 'undefined' || user== 'kamal') {
    // We will discuss this line later in this section.
    res.header('Authorization', '');
    return res.status(401).send({ error: 'Unauthorized' });
  }

  next();
};