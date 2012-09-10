module.exports = function(name) {
  name = name || 'token';

  return function (req, res, next) {
    res.locals[name] = req.session._csrf;
    next();
  };
};
