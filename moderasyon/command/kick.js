const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const config = require("../config.json");
const modstats = require("../modstats.json");

module.exports = {
  name: "kick",
  description: "Belirtilen üyeyi sunucudan atar.",
  async execute(message, args) {

    if(!message.member.roles.cache.has(config.modRole)) 
      return message.reply({ content: "Bu komutu kullanmak için yetkin yok!", ephemeral: true });

    const member = message.mentions.members.first();
    if(!member) return message.reply("Lütfen bir kullanıcı etiketle!");
    if(!member.kickable) return message.reply("Bu kullanıcıyı atamam!");

    const reason = args.slice(1).join(" ") || "Belirtilmedi";

    try {
      await member.kick(reason);

 
      const embed = new EmbedBuilder()
        .setTitle("🔴 Kullanıcı Atıldı")
        .setDescription(`${member.user.tag} sunucudan atıldı.`)
        .addFields(
          { name: "Kullanıcı ID", value: member.id, inline: true },
          { name: "Atan Yetkili", value: message.author.tag, inline: true },
          { name: "Sebep", value: reason, inline: true }
        )
        .setColor(0xFF0000)
        .setTimestamp();

      const logChannel = message.guild.channels.cache.get(config.logChannel);
      if(logChannel) logChannel.send({ embeds: [embed] });

    
      if(!modstats[message.author.id]) modstats[message.author.id] = {};
      modstats[message.author.id].kick = (modstats[message.author.id].kick || 0) + 1;
      fs.writeFileSync("./modstats.json", JSON.stringify(modstats, null, 2));

      message.reply({ content: `${member.user.tag} başarıyla atıldı!` });

    } catch(err) {
      console.error(err);
      message.reply("Bir hata oluştu.");
    }
  }
};
