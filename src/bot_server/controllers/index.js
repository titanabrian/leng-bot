'use strict'

const chessLinks = require('../../src/storage/default_chess_link.storage.json');
const papStorage = require('../../src/storage/default_pap.storage.json');
const isValidUrl = require('../../utils/is_valid_url');

module.exports = {
  ReplyAsk: async (req, args) => {
    const tag = `<@${process.env.CELENG_ID}>`;
      try {
        if(!args) {
          return;
        }
        const content = args.join(' ').toLowerCase();
        if(content === 'who is the celeng') {
          return await req.channel.send(`The celeng is ${tag}`);
        }

        if(content === 'who is the impostor') {
         return await req.channel.send(`I don't know, what i know is ${tag} is a CELENG. Happy CELENG, happy live!`)
        }

        return await req.channel.send(`I don't really understand about that. But let me tell you a fun fact that ${tag} is the real CELENG`);

      } catch (e) {
        throw e;
      }
  },

  ChallengeChess: async (req, args) => {
    try {
      if(!req.mentions.users.size) return;
      const mentionedUserId = req.mentions.users.first().id;
      const authorreqId = req.author.id;
      const link = chessLinks[authorreqId];
      if(!link) {
        return req.channel.send(`Main Chess dulu GOBLOK <@${authorreqId}>!!!!`);
      }
      return req.channel.send(`<@${mentionedUserId}> anda di tantang oleh <@${req.author.id}> \n ${link}`);
    } catch (e) {
      throw e;
    }
  },

  ChangeNickName: async (req, args) => {
    try {
      if(!args) {
        return;
      }

      content = args.join(' ');
      const cleanText = content.replace(/(<@!\w+>)/,'');
      if (req.mentions.users.size < 1) {
        return req.reply('Tag CELENG nya dulu');
      }
      if(!/[a-zA-Z0-9\s]+/.test(cleanText)) {
        return;
      }
      const userId = req.mentions.users.first().id;
      const guildMember = req.guild.members.cache.get(userId);

      if(!guildMember) {
        return req.reply('Oops, CELENG nya nggak ketemu');
      }

      return await guildMember.setNickname(cleanText.substring(0,32));
    } catch (e) {
      if(e.httpStatus === 403) {
        return req.reply('Please enable permission :(');
      }
      throw e;
    }
  },

  PostAPicture:  async (req, args) => {

    try {

    const embedText = {
      color: '#FF79FF',
      title: 'Leng Bot',
      description: `Leng Bot tidak menemukan gambar ${args}`,
      fields: [
        {
          name: 'Gambar tersedia',
          value: Object.keys(papStorage).join(', '),
        }
      ],
      image: {
        url: 'https://cdn.discordapp.com/attachments/764759567053094913/764767961722388480/confused-pig-vector-id494295733.png',
      },
      timestamp: new Date(),
      footer: {
        text: 'Leng Bot | authored by titanabrian'
      },
    };

      let selectedKey;
      if(!args.size) {
        const keys = Object.keys(papStorage);
        let randomIndex = Math.floor(Math.random() * keys.length)
        while(papStorage[keys[randomIndex]].length <= 0){
          randomIndex = Math.floor(Math.random() * keys.length);
        }
        selectedKey = keys[randomIndex];
      } else {
        selectedKey = args.join(' ').toLowerCase().split(' ').join('_');
      }

      const imagesByKey = papStorage[selectedKey];
      if(!imagesByKey) {
        return req.channel.send({ embed: embedText });
      }

      const countImage = imagesByKey.length;
      if(countImage <= 0) {
        return req.channel.send({ embed: embedText });
      }

      let imageUrl = imagesByKey[Math.floor(Math.random() * countImage)];
      if(!isValidUrl(imageUrl)) {
        imageUrl = `${process.env.WEB_SERVICE_URL}/pap_images/${imageUrl}`;
      }
    await req.channel.send({
        files: [imageUrl]
      })
    } catch (e) {
      throw e;
    }
  }
}
