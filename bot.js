const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const  db  = require('quick.db');
const { Client, Util } = require('discord.js');
const fs = require('fs');
require('./util/eventLoader.js')(client);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
//--------------------------------komutlar---------------------------------------//
//antiraid//
client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
      if (!kanal) return;  
      var bera = member.guild.owner
      if (member.user.bot === true) {
         if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
        let ber = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail(member.user.avatarURL())
          .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **e!bot-izni kaldır botun_id**.`);
        bera.send(ber);
         } else {
           let izinverilmemişbot = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail(member.user.avatarURL())
          .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **e!bot-izni ver botun_id**")
          member.guild.members.ban(member, { reason : "Bu kısıma sebep yazınız." }) 
           bera.send(izinverilmemişbot)
    }
      }
    });

    //kanalkoruma//
    client.on("channelDelete", async function(channel) {
        let rol = await db.fetch(`kanalk_${channel.guild.id}`);
      
      if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;
    
      channel.clone().then(z => {
        let kanal = z.guild.channels.find(c => c.name === z.name);
        kanal.setParent(
          kanal.guild.channels.find(channel => channel.id === channelp)
          
        );
      });
      }
    })
    //rolkoruma//
    client.on('roleDelete', async function(role) {
      const fetch = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(log => log.entries.first())
      let yapanad = fetch.executor;
      let isim = role.name;
      let renk = role.color;
      let ayrı = role.hoist;
      let sıra = role.position;
      let yetkiler = role.permissions;
      let etiketlenebilir = role.mentionable;
      role.guild.roles.create({
        name:isim,
        color:renk,
        hoist:ayrı,
        position:sıra,
        permissions:yetkiler,
        mentionable:etiketlenebilir
      })
      let teqnoembed = new Discord.MessageEmbed()
        .setTitle("Uyarı")
        .setColor("RED")
        .setFooter("Ben Geldiimmm :)")
        .setDescription(`\`${role.guild.name}\` adlı sunucunuzda ${isim} adına sahip rol, ${yapanad} adlı kişi tarafından silindi. Ben tekrardan onardım!`)
      role.guild.owner.send(teqnoembed)
    });

//küfürengel//
client.on("message", async msg => {
  
    const db  = require('quick.db');
  
   const i = await db.fetch(`kufur_${msg.guild.id}`)
      if (i == "acik") {
          const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
          if (kufur.some(word => msg.content.includes(word))) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                    msg.delete();
                            
                        return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
              }              
            } catch(err) {
              console.log(err);
            }
          }
      }
      if (!i) return;
  });
  
  client.on("messageUpdate", (oldMessage, newMessage) => {
    const db  = require('quick.db');
  
    
   const i = db.fetch(`${oldMessage.guild.id}.kufur`)
      if (i) {
          const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
          if (kufur.some(word => newMessage.content.includes(word))) {
            try {
              if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                    oldMessage.delete();
                            
                        return oldMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
              }              
            } catch(err) {
              console.log(err);
            }
          }
      }
      if (!i) return;
  });
    
 //reklamengelle//
 client.on("message", msg => {
    if(!db.has(`reklam_${msg.guild.id}`)) return;
           const reklam = [".com", "www.", "https", "http", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                       return msg.reply('**⛔ Yakalandın Dostum Bu Sunucuda Reklam Yapmamalısın! ⛔**').then(msg => msg.delete(3000));
      
    
     msg.delete(3000);                              
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });
   


        