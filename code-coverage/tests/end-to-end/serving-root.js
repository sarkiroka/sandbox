var request = require('supertest');
var app = require('../../server/index');

describe('root url handling', function () {
	it('sould responds 200 status code when i get "/" url with "ok" content', function (done) {
		request(app)
			.get('/')
			.expect(200, function (err, res) {
				expect(res.body).toEqual({});
				done();
			});
	});
});
