const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {

let prefix = ayarlar.prefix
  
  
  if (!args[0]) {
    const keevz = new Discord.MessageEmbed()
    .setDescription(`Bunu mu Arıyorsun? ${prefix}kanal-koruma aç/kapat`)
    .setTimestamp()
    return message.channel.send(keevz)
  }
  if (args[0] === 'aç') {
    
    db.set(`kanalk_${message.guild.id}`, "Aktif")
       const keevz = new Discord.MessageEmbed()
    .setDescription(`Kanal Koruma Başarıyla Açıldı!`)
    .setTimestamp()
    return message.channel.send(keevz)
  }
   if (args[0] === 'kapat') {
    
    db.delete(`kanalk_${message.guild.id}`)
       const keevz = new Discord.MessageEmbed()
    .setDescription(`Kanal Koruma Başarıyla Kapatıldı!`)
    .setTimestamp()
    return message.channel.send(keevz)
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'kanalkoruma'
}; 
//ALTYAPI SAHİBİ = んKeevz#9915//
//Çalınması yasaktır!//
//İyi Günlerde Kullanın//