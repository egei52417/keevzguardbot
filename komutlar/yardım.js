const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('823971738559315998') 
 
exports.run = async(client, message, args) => { 
  let prefix = ayarlar.prefix

    const keevz = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
       .setColor('#7ce212')
       .setTitle(` **Yardım Menüsü** `)
        .setDescription(`
        ▬▬▬▬▬▬▬▬ \`\`\Komutlar\`\`\ ▬▬▬▬▬▬▬▬
**${prefix}antiraid** = İzinsiz botları banlar.
**${prefix}ban** = Belirtilen kişiyi banlar.
**${prefix}unban** = Ban açar.
**${prefix}kanalkoruma** = Kanalları korur.
**${prefix}rolkoruma** = Rolleri korur.
**${prefix}kick** = Belirtilen kişiyi kickler.
**${prefix}kurallar** = Kurallar metni atar.
**${prefix}nuke** = Kanalı nukeler.
**${prefix}ping** = Bot pingini atar.
**${prefix}say** = Sunucuyu sayar.
**${prefix}sunucubilgi** = Sunucu bilgi atar.
**${prefix}küfürayarla** = Küfür koruması açar.
**${prefix}reklamengelle** = Reklam koruması açar.


   
`)
        
        
         .setFooter(`${message.author.username} komutu kullandı.`, message.author.displayAvatarURL({dynamic: true}))
    .setImage("")
    return  message.channel.send(keevz);
  
};
 
 


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help',"yardım"],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'yardım menusu',
  usage: 'yardım'
};

//ALTYAPI SAHİBİ = んKeevz#9915//
//Çalınması yasaktır!//
//İyi Günlerde Kullanın//