const chessLinks = require('../storage/default_chess_link.storage.json');
module.exports = {
  name: 'chess',
  description: 'Challenge me on chess.com',
  execute: async (message, args) => {
      try {
        if(message.mentions.users.length === 0) return;
        const mentionedUserId = message.mentions.users.first().id;
        const authorMessageId = message.author.id;
        const link = chessLinks[authorMessageId];
        if(!link) {
          return message.channel.send(`Main Chess dulu GOBLOK <@${authorMessageId}>!!!!`);
        }
        return message.channel.send(`<@${mentionedUserId}> anda di tantang oleh <@${message.author.id}> \n ${link}`);
      } catch (e) {
        throw e;
      }
  }
}