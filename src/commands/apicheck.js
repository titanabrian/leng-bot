const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('apicheck')
    .setDescription('is TLT Instagram API okay?'),
}