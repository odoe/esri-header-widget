/*global define, describe, it, expect, beforeEach, afterEach, sinon*/
/*jshint expr:true*/
define([
  'widgets/header/header'
], function(
  Header
) {

   describe(
    'widgets/header/header',
    function() {

      var expect = chai.expect;
      var options = {
        pageTitle: 'My Page Title'
      };

      var header;

      beforeEach(function() {
        sinon.stub(Header.prototype, 'own').returns(function() {});
        header = new Header(options);
        header.postCreate();
      });

      afterEach(function() {
        Header.prototype.own.restore();
        header.destroy();
      });

      describe(
        '#postCreate',
        function() {

          it(
            'will assign the application title to page',
            function() {
              expect(document.title).to.eql(options.pageTitle);
            }
          );

          it('will call own for an event', function() {
            expect(header.own.called).to.be.ok;
          });

        }
      );

      describe(
        '#startup',
        function() {

          it(
            'will set loaded to true when startup complete',
            function() {
              header.startup();
              expect(header.loaded).to.be.true;
            }
          );

          it(
              'will emit a load event on startup',
              function(done) {
                header.on('loaded', function() {
                  expect(header.loaded).to.be.true;
                  done();
                });
                header.startup();
              }
            );

        }
      );

    });

});


