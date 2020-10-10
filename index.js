const fs = require('fs');
const Discord = require('discord.js');
const express = require('express')
const webServer = express();

webServer.get('/', (req, res) => {
  res.json({
        status: 'healty',
        message: 'Don\'t worry, im healthy'
      })
})
const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandHandlers = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandHandlers) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command)
}

client.on('ready', async () => {
  console.log('Bot is online!');
  client.user.setActivity('Everybody is a CELENG')
})

client.on('message', async (msg) => {
  try {
    if(msg.author.bot) return;
    if(!msg.content.startsWith('c!')) return;
    const command = msg.content.trim().split(' ')[1]
    const args = msg.content.replace('c! ask','').trim();
    const handler = client.commands.get(command);
    if(handler) {
      return await handler.execute(msg, args);
    }
    return;
  } catch (e) {
    return msg.reply('Duh pusing, jadi error dah');
  }
})

client.login(BOT_TOKEN);

const PORT = process.env.PORT || 8081
webServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
