const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "stats",
  description: "Sunucu istatistiklerini gösterir",
  execute(message, args, client) {
    const totalMembers = message.guild.memberCount;
    const onlineMembers = message.guild.members.cache.filter(m => m.presence?.status === "online").size;
    const botCount = message.guild.members.cache.filter(m => m.user.bot).size;

    const embed = new EmbedBuilder()
      .setTitle("📊 Sunucu İstatistikleri")
      .addFields(
        { name: "Toplam Üye", value: `${totalMembers}`, inline: true },
        { name: "Çevrimiçi Üye", value: `${onlineMembers}`, inline: true },
        { name: "Bot Sayısı", value: `${botCount}`, inline: true }
      )
      .setColor(0x800080)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
