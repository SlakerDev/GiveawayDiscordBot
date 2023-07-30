const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("Zero")
      .setTitle("Command List & Guide for the Bot")
      .setDescription("Below are Commands you can do with Bot, Right now there is only 6 commands available, more commands will be added soon.")
      .addField("🎁 Giveaway","start [channel] [Temps] [gagnants] [Prix]\nreroll [Prix]\nend [Prix]")
      .addField("Examples", "g!start #giveaway 5m 1 Testing\ng!end Testing\ng!reroll Testing")
      .addField("Utility", "ping, invite", true)
      .addField("ℹ Information ℹ", "stats", true)
      .setTimestamp()
      .setFooter(`Commande demandé par ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**cmd envoyées en messages privés ! 📪, regarde tes MP**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
