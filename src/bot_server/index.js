'use strict'

const token = process.env.BOT_TOKEN;
const Bot = require('../libs/bot')
const CommandSet = require('discord-routes').CommandSet
const bot = new Bot(token);
const router = new CommandSet(bot.client, 'c!');
const registerRoute = require('./routers')

bot.on('message', msg => {
  if (msg.content.toLowerCase().includes('mantap')){
    msg.channel.send({
      files: ['https://media.discordapp.net/attachments/300169651755941889/313669913187188747/dickhand.png?width=540&height=540']
    })
  }
})

registerRoute(router)
router.listen();

bot.on('ready', async () => {
  console.log("Bot is online!");
  bot.client.user.setActivity('fsociety00.dat');
})

bot.auth()