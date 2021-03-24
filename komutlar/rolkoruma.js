const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}` )) || "!!";

  if (!args[0]) {
    const keevz = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(" ❌ HATA:")
      .setDescription(`Hatalı kullanım! Örnek: **${prefix}rol-koruma aç** veya **kapat**`
      );

    message.channel.send(keevz);
    return;
  }
  let rol = await db.fetch(`rolk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const keevz = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("OPSS :thinking:")
        .setDescription("Dostum Zaten Rol Koruma Sistemi Aktif!");

      message.channel.send(keevz);
      return;
    } else {
      db.set(`rolk_${message.guild.id}`, "acik");
      const keevz = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("BAŞARILI! ✅ ")
        .setDescription("Rol Koruma Aktif Edildi! Rol Silindiğinde size haber vereceğim.");

      message.channel.send(keevz);
    }
  } else if (args[0] == "kapat") {
    db.delete(`rolk_${message.guild.id}`);
    const keevz = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("BAŞARILI! ✅ ")
      .setDescription("Rol Koruma Başarıyla Kapatıldı!");

    message.channel.send(keevz);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "rolkoruma",
  description: "Rol koruma",
  usage: "rol-koruma"
}; 