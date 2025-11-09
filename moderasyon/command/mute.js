const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "mute",
  description: "Belirtilen üyeyi belirli süreli sessize alır (timeout).",
  async execute(message, args) {

    if(!message.member.roles.cache.has(config.modRole)) 
      return message.reply("Bu komutu kullanmak için yetkin yok!");

    const member = message.mentions.members.first();
    if(!member) return message.reply("Lütfen bir kullanıcı etiketle!");
    if(!member.manageable) return message.reply("Bu kullanıcıyı muteleyemem!");

 
    const time = args[1] ? parseInt(args[1]) : 5; 
    if(isNaN(time) || time <= 0) return message.reply("Lütfen geçerli bir süre girin (dakika).");

    const reason = args.slice(2).join(" ") || "Belirtilmedi";

    try {
      await member.timeout(time * 60 * 1000, reason);

      const embed = new EmbedBuilder()
        .setTitle("⏱️ Kullanıcı Mutelendi")
        .setDescription(`${member.user.tag} ${time} dakika boyunca sessize alındı.`)
        .addFields(
          { name: "Kullanıcı ID", value: member.id, inline: true },
          { name: "Yetkili", value: message.author.tag, inline: true },
          { name: "Sebep", value: reason, inline: true }
        )
        .setColor(0xFFFF00) 
        .setTimestamp();

      const logChannel = message.guild.channels.cache.get(config.logChannel);
      if(logChannel) logChannel.send({ embeds: [embed] });

      message.reply({ content: `${member.user.tag} başarıyla mutelendi!` });

    } catch(err) {
      console.error(err);
      message.reply("Bir hata oluştu. Kullanıcıya mute uygulayamıyorum.");
    }
  }
};
