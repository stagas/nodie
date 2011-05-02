#!/usr/bin/env node
//
// nodie.js
// by stagas
//
// MIT licenced
//

var util = require('util')
  , child_process = require('child_process')
  , proc

if (process.argv.length <= 2) {
  console.log('usage: nodie <program> [param] [...]')
  process.exit()
}
process.title = 'nodie ' + process.argv.slice(2).join(' ')

;(function respawn(app) {
  console.log('Starting', app.join(' '))

  try {
    proc = child_process.spawn.apply(this, app[0], app.slice(1))
  } catch(e) {
    console.log('Failed to run', app.join(' '), '\n', util.inspect(e))
    return setTimeout(function() {
      respawn(app)
    }, 5000)
  }

  proc.stdout.on('data', function (data) {
    process.stdout.write(data)
  })

  proc.stderr.on('data', function (data) {
    util.print(data)
  })

  proc.on('exit', function (err, sig) {
    if (err) {
      console.log('Process exited with error:', err, sig)
      console.log('Restarting in 5 seconds')
      setTimeout(function() {
        respawn(app)
      }, 5000)
    } else {
      console.log('Process exited gracefully')
      console.log('Restarting in 5 seconds')
      setTimeout(function() {
        respawn(app)
      }, 5000)
    }
  })

}(process.argv.slice(2)))