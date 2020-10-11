const fs = require('fs');
const Discord = require('discord.js');
const express = require('express')
const webServer = express();

webServer.use(express.static('./src/public'))
webServer.get('/', (req, res) => {
  res.json({
        status: 'healty',
        message: 'Don\'t worry, im healthy'
      });
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
    if(msg.content.toLowerCase().includes('mantap')) {
      msg.channel.send({
        files: ['https://media.discordapp.net/attachments/300169651755941889/313669913187188747/dickhand.png?width=540&height=540']
      })
    }
    if(!msg.content.startsWith('c!')) return;
    const command = msg.content.trim().split(' ')[1]
    let args = msg.content.trim().replace(/(c!+\s*\w+)\s/,'');
    args = args.replace(/(c!+\s*\w+)/, '');
    const handler = client.commands.get(command);
    if(handler) {
      return await handler.execute(msg, args);
    }
    return;
  } catch (e) {
    console.log(e);
    if(e.httpStatus === 403) {
      return message.reply('Please enable permission :(');
    }
    return msg.reply('Duh pusing, jadi error dah');
  }
})

client.login(BOT_TOKEN);

const PORT = process.env.PORT || 8081
webServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
