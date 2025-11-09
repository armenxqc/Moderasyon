const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "unban",
  description: "Belirtilen kullanıcının banını kaldırır",
  async execute(message, args, client) {
    if(!message.member.roles.cache.has(config.modRole)) return message.reply("Yetkin yok!");
    const userId = args[0];
    if(!userId) return message.reply("Kullanıcı ID gir.");

    await message.guild.members.unban(userId).catch(() => message.reply("Ban kaldırma başarısız."));

    const embed = new EmbedBuilder()
      .setTitle("✅ Kullanıcının Banı Kaldırıldı")
      .addFields(
        { name: "Kullanıcı ID", value: userId, inline: true },
        { name: "Yetkili", value: `${message.author.tag}`, inline: true }
      )
      .setColor(0x00FFFF)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
    const logChannel = message.guild.channels.cache.get(config.logChannel);
    if(logChannel) logChannel.send({ embeds: [embed] });
  }
};
