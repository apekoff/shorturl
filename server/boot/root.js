'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/go/:short', (req, res) => {
    let Url = server.models.Url;
    let short = req.params.short;
    Url.findOne({where: {short}}, function(err, url) {
      if (err) {
        return res.status(404).end();
      }

      if (!url) {
        return res.status(404).send('Page not found.');
      }
      res.redirect(url.original);
    });
  });
  router.get('/', server.loopback.status());
  server.use(router);
};
