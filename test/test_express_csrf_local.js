var connect = require('connect');
var csrfLocal = require('../index');

var noop = function() {};

module.exports['express-csrf-local'] = {
  setUp: function(callback) {
    this.req = { session: {}, method: 'GET' };
    this.res = { locals: {} };

    this.csrf = connect.csrf();

    callback();
  },

  'test with custom name': function(test) {
    this.csrf(this.req, this.res, noop);
    csrfLocal('custom')(this.req, this.res, noop);

    test.expect(1);
    test.equals(this.req.session._csrf, this.res.locals.custom);
    test.done();
  },

  'test without custom name': function(test) {
    this.csrf(this.req, this.res, noop);
    csrfLocal()(this.req, this.res, noop);

    test.expect(1);
    test.equals(this.req.session._csrf, this.res.locals.token);
    test.done();
  }
};
