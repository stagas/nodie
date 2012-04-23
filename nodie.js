#!/usr/bin/env node
//
// nodie.js
// by stagas
//
// MIT licenced
//

var spawn = require('child_process').spawn

if (process.argv.length <= 2) {
  console.error('usage: nodie <program> [param, [...]]')
  process.exit()
}
var app = process.argv.slice(2)
var appString = app.join(' ')
process.title = 'nodie ' + appString

;(function run () {
  var child
  console.error('starting', appString)
  try {
    child = spawn(app[0], app.slice(1))   
  }
  catch (e) {
    console.error('error starting:', e.stack)
    console.error('restarts in 5 seconds...')
    return setTimeout(run, 5000)
  }
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  child.on('exit', function (err, sig) {
    if (err) {
      console.error('not ok')
      console.error('child process exited with error:', err)
      console.error('exit signal:', sig)
    }
    else console.error('child process exited')
    console.error('restarts in 5 seconds...')
    setTimeout(run, 5000)
  })
}());
