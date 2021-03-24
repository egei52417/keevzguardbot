const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let boost = message.guild.members.cache.filter(r=>r.roles.cache.has('')).size
   var tagdakiler = 0;
   let tag = 'ん'
   let botCount = message.guild.members.cache.filter(m => m.user.bot).size;
  message.guild.members.cache.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler
    }
  })
  
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.cache.find(emoji => emoji.name === "flag_tr");
  const keevz = new Discord.MessageEmbed()
  .setThumbnail(client.user.avatarURL())
  .setColor("black")
  .addField(`♦ **Ses Kanallarında Bulunan Kişi Sayısı** ♦`, `${count} **Kişi Bulunmaktadır.**`)
.addField(`♦  **Sunucuda Bulunan Kişi Sayısı** ♦ `,`${message.guild.memberCount} **Kişi Bulunmaktadır.**`)
  .addField(`♦ **Bot Sayısı** ♦` , `${botCount}`)
.addField(`♦ **Boost Sayısı** ♦`,  message.guild.premiumSubscriptionCount.toString())
.addField(`♦ **Toplam Katogori** ♦`, `${message.guild.channels.cache.filter(c => c.type === 'category').size}`)
  message.channel.send(keevz)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: ' Sunucudaki ve sesdeki üyeleri gösterir',
  usage: 'say'
};

//ALTYAPI SAHİBİ = んKeevz#9915//
//Çalınması yasaktır!//
//İyi Günlerde Kullanın//