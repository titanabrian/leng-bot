'use strict'

const Discord = require('discord.js');
class Bot {
  constructor(token, prefix){
    this.token = token;
    this.client = new Discord.Client();
    this.prefix = prefix;
    this.commands = new Discord.Collection();
  }

  async auth(){
    this.client.login(this.token);
  }

  async on(trigger, callback){
    this.client.on(trigger, callback);
  }

  getDefaultGuild(){
    return new Discord.Guild(this.client, { id: process.env.MAHASISWA_SANTAI_SERVER_ID})
  }
}

module.exports = Bot;
