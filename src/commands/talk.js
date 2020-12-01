const ytdl = require('ytdl-core');
module.exports = {
  name: 'talk',
  description: 'Let leng bot to talk',
  execute: async (message, args) => {
    const { voice } = message.member;
    if(!voice.channelID) {
      return message.channel.send(`<@!${process.env.CELENG_ID}> masuk dong kangen aku pengen ngobrol!`);
    }

    try {
      const connection = await voice.channel.join();
      connection.play(ytdl('https://www.youtube.com/watch?v=0qRWpMscGbs', { filter: 'audioonly' } ));
      setTimeout(() => {
        voice.channel.leave();
      }, 12000) //leave after 12 seconds
    } catch(e) {
      voice.channel.leave();
      return message.channel.send('Sariawan gabisa ngomong, sorry :(');
    }
  }
}