const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "ban",
  description: "Belirtilen kullanıcıyı sunucudan yasaklar",
  async execute(message, args, client) {
    if(!message.member.roles.cache.has(config.modRole)) return message.reply("Yetkin yok!");

    const member = message.mentions.members.first();
    if(!member) return message.reply("Bir kullanıcı etiketle.");
    if(!member.bannable) return message.reply("Bu kullanıcıyı banlayamıyorum.");

    const reason = args.slice(1).join(" ") || "Belirtilmedi";
    await member.ban({ reason });

    const embed = new EmbedBuilder()
      .setTitle("⛔ Kullanıcı Banlandı")
      .addFields(
        { name: "Banlanan Kullanıcı", value: `${member.user.tag}`, inline: true },
        { name: "Banlayan Yetkili", value: `${message.author.tag}`, inline: true },
        { name: "Sebep", value: reason, inline: false }
      )
      .setColor(0xFF0000)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

    const logChannel = message.guild.channels.cache.get(config.logChannel);
    if(logChannel) logChannel.send({ embeds: [embed] });
  }
};
