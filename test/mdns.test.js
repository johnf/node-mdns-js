var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var Code = require('code');   // assertion library
var expect = Code.expect;
var mdns = require('../');



describe('mDNS', function () {
  var browser;
  before(function (done) {
    mdns.excludeInterface('0.0.0.0');
    expect(mdns,  'library does not exist!?').to.exist(mdns);
    browser = mdns.createBrowser();

    browser.on('ready', function onReady() {
      done();
    });
  });

  after(function (done) {
    browser.stop();
    done();
  });


  it('should .discover()', {skip: process.env.MDNS_NO_RESPONSE},
    function (done) {
      browser.once('update', function onUpdate(data) {
        expect(data).to.include(['interfaceIndex', 'networkInterface',
          'addresses', 'query']);
        done();
      });

      setTimeout(browser.discover.bind(browser), 500);
    });

});
