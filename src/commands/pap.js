const papStorage = require('../storage/default_pap.storage.json');
const isValidUrl = require('../utils/is_valid_url');
module.exports = {
  name: 'pap',
  description: 'Post specific or specific image of celeng mania!',
  execute: async (message, args) => {

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
      if(!args || args === 'undefined') {
        const keys = Object.keys(papStorage);
        let randomIndex = Math.floor(Math.random() * keys.length)
        while(papStorage[keys[randomIndex]].length <= 0){
          randomIndex = Math.floor(Math.random() * keys.length);
        }
        selectedKey = keys[randomIndex];
      } else {
        selectedKey = args.toLowerCase().split(' ').join('_');;
      }

      const imagesByKey = papStorage[selectedKey];
      if(!imagesByKey) {
        return message.channel.send({ embed: embedText });
      }

      const countImage = imagesByKey.length;
      if(countImage <= 0) {
        return message.channel.send({ embed: embedText });
      }


      imageUrl = imagesByKey[Math.floor(Math.random() * countImage)];
      if(!isValidUrl(imageUrl)) {
        imageUrl = `${process.env.WEB_SERVICE_URL}/pap_images/${imageUrl}`;
      }
    await message.channel.send({
        files: [imageUrl]
      })
    } catch (e) {
      throw e;
    }
  }
}