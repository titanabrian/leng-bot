const CELENG_ID = process.env.CELENG_ID;
module.exports = {
  name: 'ask',
  description: 'Ask me anything!',
  execute: async (message, args) => {
      const tag = `<@${CELENG_ID}>`;
      try {
        if(!args) {
          return;
        }

        if(args.toLowerCase() === 'who is the celeng') {
          return await message.channel.send(`The celeng is ${tag}`);
        }

        if(args.toLowerCase() === 'who is the impostor') {
         return await message.channel.send(`I don't know, what i know is ${tag} is a CELENG. Happy CELENG, happy live!`)
        }

        return await message.channel.send(`I don't really understand about that. But let me tell you a fun fact that ${tag} is the real CELENG`);

      } catch (e) {
        throw e;
      }
  }
}