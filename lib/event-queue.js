'use strict'

const { setTimeout } = require('timer')
exports.enqueue = function enqueue(task) {
  setTimeout(task, 0)
}
