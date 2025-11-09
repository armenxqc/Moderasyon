const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "clear",
  description: "Belirtilen sayıda mesajı siler",
  async execute(message, args, client) {
    if(!message.member.roles.cache.has(config.modRole)) return message.reply("Yetkin yok!");
    const count = parseInt(args[0]);
    if(isNaN(count) || count < 1 || count > 100) return message.reply("1-100 arasında bir sayı gir.");

    const deleted = await message.channel.bulkDelete(count, true);

    const embed = new EmbedBuilder()
      .setTitle("🧹 Mesajlar Silindi")
      .addFields(
        { name: "Yetkili", value: message.author.tag, inline: true },
        { name: "Silinen Mesaj Sayısı", value: `${deleted.size}`, inline: true }
      )
      .setColor(0x800080)
      .setTimestamp();

    message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 5000));

    const logChannel = message.guild.channels.cache.get(config.logChannel);
    if(logChannel) logChannel.send({ embeds: [embed] });
  }
};
