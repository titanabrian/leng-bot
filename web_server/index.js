const express = require('express')
const bodyParser = require('body-parser');
const webServer = express();
const axios = require('axios');
const isValidUrl = require('../src/utils/is_valid_url');
const cors = require('cors');
const Bot = require('../src/libs/bot');
require('dotenv').config();

const ENABLE_CACHE= process.env.ENABLE_CACHE == 'true' || process.env.ENABLE_CACHE == 'TRUE'
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Bot(BOT_TOKEN);
bot.auth();
webServer.use(express.static('./src/public'))
webServer.use(bodyParser());
webServer.use(cors());
webServer.guild = bot.getDefaultGuild();

webServer.get('/', (req, res) => {
  res.json({
        status: 'healty',
        message: 'Don\'t worry, im healthy'
      });
});

webServer.post('/share/ayat', async (req, res, next) => {
  if(req.headers['x-api-key'] !== process.env.X_API_KEY) {
    return res.status(403).json({
      error_code: 'INVALID_API_KEY',
      message: 'Please enter valid api key'
    });
  }

  const ayahNumber = Math.floor(Math.random() * 6236) + 1;
  try {
    const englishAyahResponse = await axios.get(`http://api.alquran.cloud/v1/ayah/${ayahNumber}/en.asad`);
    const arabicAyahResponse = await axios.get(`http://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.alafasy`);
    const englishAyahObject = englishAyahResponse.data.data;
    const arabicAyahObject = arabicAyahResponse.data.data;
    const textChannel = webServer.guild.client.channels.cache.get(process.env.GENERAL_CHANNEL_ID);

    if(!textChannel) {
      res.status(404).json({
        error_code: 'TEXT_CHANNEL_NOT_FOUND',
        message: 'Cannot find particular text channel'
      });
    }

    const text =[
      `SIRAMAN KALBU UNTUK <@${process.env.CELENG_ID}>`,
      '',
      arabicAyahObject.text,
      '',
      '`'+englishAyahObject.text+'`',
      '',
      `${englishAyahObject.surah.englishName}:${englishAyahObject.numberInSurah}`
    ];

    await textChannel.send(text.join('\n'));
    res.json(englishAyahObject);
  } catch (e) {
      res.status(e.response.data.code).json({
        error_code: e.response.data.status.toUpperCase(),
        message: e.response.data.data
      })
  }
})

webServer.post('/share/url',
(req, res, next) => {
  if(req.headers['x-api-key'] !== process.env.X_API_KEY) {
    return res.status(403).json({
      error_code: 'INVALID_API_KEY',
      message: 'Please enter valid api key'
    });
  }

  const url = req.body.url;

  if(!url) {
    return res.status(400).json({
      error_code: 'API_VALIDATION_ERROR',
      message: 'Url is required'
    });
  }

  if(!isValidUrl(url)) {
    return res.status(400).json({
      error_code: 'API_VALIDATION_ERROR',
      message: 'You must send a valid url'
    });
  }

  return next();
},
(req, res) => {
  const url = req.body.url;
  const textChannel = webServer.guild.client.channels.cache.get(process.env.MEME_CHANNEL_ID);
  if(!textChannel) {
    res.status(404).json({
      error_code: 'TEXT_CHANNEL_NOT_FOUND',
      message: 'Cannot find particular text channel'
    });
  }

  textChannel.send(url);
  return res.json({
    url: url
  });


});

const LAZYNITIP_CACHE=[]
webServer.get('/lazynitip/product', async (req, res, next) => {
  if(req.headers['x-api-key'] !== process.env.X_API_KEY) {
    return res.status(403).json({
      error_code: 'INVALID_API_KEY',
      message: 'Please enter valid api key'
    });
  }
  try {
    const keywords = [
      "ddr4",
      "rtx",
      "rx",
      "gtx"
    ]

    const fetchProfile = await axios.get("https://www.instagram.com/thelazytitip/channel/?__a=1", {
      headers: {
        "User-Agent":" Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
        Cookie : `sessionid=${process.env.INSTAGRAM_SESSION_ID}`
      },
      withCredentials: true
    })
    const timeline = fetchProfile.data.graphql.user.edge_owner_to_timeline_media.edges
    const lastPost = timeline[0]
    const id = lastPost.node.id
    const caption = lastPost.node.edge_media_to_caption.edges[0].node.text.toLowerCase()
    const shortcode = lastPost.node.shortcode
    const url = `https://www.instagram.com/p/${shortcode}`
    if (!LAZYNITIP_CACHE.includes(id)) {
      for(let word of keywords){
        if (caption.includes(word)){
          const textChannel = webServer.guild.client.channels.cache.get(process.env.GENERAL_CHANNEL_ID);
          textChannel.send(`Barang baru gan, silahkan check sebelum kehabisan <@&${process.env.SUBSCRIBER_ID}>  ${url}`)
          if (ENABLE_CACHE) {
            LAZYNITIP_CACHE.push(id)
          }
          break
        }
      }
    }
    return res.json({url})
  } catch (e) {
    return res.status(500).json({
      error_code: 'SOMETHING_WRONG',
      message: 'We investigate the issue'
    })
  }

})

webServer.listen(3000, () => {
  console.log(`listening on 3000`)
});
