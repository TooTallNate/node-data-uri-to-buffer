
/**
 * Module dependencies.
 */

var assert = require('assert');
var dataUriToBuffer = require('../');

describe('data-uri-to-buffer', function () {

  it('should decode plain-text Data URIs', function () {
    var html = '<!DOCTYPE html>'+
               '<html lang="en">'+
               '<head><title>Embedded Window</title></head>'+
               '<body><h1>42</h1></body>'+
               '</html>';

    // Escape the HTML for URL formatting
    var uri = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

    var buf = dataUriToBuffer(uri);
    assert.equal('text/html', buf.type);
    //assert.equal('utf-8', buf.charset);
    assert.equal(html, buf.toString());
  });

  it('should decode "base64" Data URIs with newlines', function () {
    var uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA\n' +
      'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO\n' +
      '9TXL0Y4OHwAAAABJRU5ErkJggg==';

    var buf = dataUriToBuffer(uri);
    assert.equal('image/png', buf.type);
    assert.equal('iVBORw0KGgoAAAANSUhEUgAAAAUA' +
      'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO' +
      '9TXL0Y4OHwAAAABJRU5ErkJggg==', buf.toString('base64'));
  });

});
