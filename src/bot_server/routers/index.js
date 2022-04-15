'use strict'

const { route } = require('express/lib/application')
const controller = require('../controllers')

module.exports = function(router) {
  router.set('ping', req => {
    req.reply('pong')
  })

  router.set('ask', controller.ReplyAsk)
  router.set('chess', controller.ChallengeChess)
  router.set('pap', controller.PostAPicture)
}
