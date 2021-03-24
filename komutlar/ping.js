const Discord = require("discord.js");


exports.run = async (client, message, args) => {

  
const keevz = new Discord.MessageEmbed()
  .addField(`**Buyur Pingim!**` ,`${client.ws.ping}ms`)
  message.channel.send(keevz)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping(Bunuda Almayında)',
  usage: 'ping'
}; 

//ALTYAPI SAHİBİ = んKeevz#9915//
//Çalınması yasaktır!//
//İyi Günlerde Kullanın//