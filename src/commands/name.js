const allowedChangedNick = require('../config/user_whitelist')();
module.exports = {
  name: 'name',
  description: 'Manipulate others name!',
  execute: async (message, args) => {
    try {
      if(!args) {
        return;
      }

      const cleanText = args.replace(/(<@!\w+>)/,'');
      if (message.mentions.users.size < 1) {
        return message.reply('Tag CELENG nya dulu');
      }
      if(!/[a-zA-Z0-9\s]+/.test(cleanText)) {
        return;
      }
      const userId = message.mentions.users.first().id;
      const guildMember = message.guild.members.cache.get(userId);

      if(!guildMember) {
        return message.reply('Oops, CELENG nya nggak ketemu');
      }

      if(!allowedChangedNick.includes(userId)) {
        return message.reply('Oops, cuma berani ganti nama si CELENG');
      }

      return await guildMember.setNickname(cleanText.substring(0,32));
    } catch (e) {
      if(e.httpStatus === 403) {
        return message.reply('Please enable permission :(');
      }
      throw e;
    }
  }
}