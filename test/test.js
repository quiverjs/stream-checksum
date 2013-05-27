
"use strict"

var should = require('should')
var crypto = require('crypto')
var streamConvert = require('quiver-stream-convert')
var streamChecksum = require('../lib/stream-checksum')

describe('stream checksum test', function() {
  it('simple checksum test', function(callback) {
    var testString = 'hello world'
    var testBuffers = [
      'hell',
      'o wor',
      'ld'
    ]

    var hash = crypto.createHash('sha1')
    hash.update(testString)
    var originalChecksum = hash.digest('hex')

    var readStream = streamConvert.buffersToStream(testBuffers)
    streamChecksum.streamToChecksum({hashAlgorithm: 'sha1'}, readStream, 
      function(err, result) {
        if(err) throw err

        result.checksum.should.equal(originalChecksum)
        result.totalSize.should.equal(testString.length)

        callback()
      })
  })
})