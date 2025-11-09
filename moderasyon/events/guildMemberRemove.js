const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {
    const channel = member.guild.channels.cache.get(config.welcomeLeaveChannel);
    if (channel) {
      const embed = new EmbedBuilder()
        .setTitle("🔴 Üye Ayrıldı")
        .setDescription(`${member.user.tag} sunucudan ayrıldı.`)
        .addFields(
          { name: "Kullanıcı ID", value: member.id, inline: true },
          { name: "Sunucuda Kaldığı Süre", value: `${Math.floor((Date.now() - member.joinedTimestamp) / 86400000)} gün`, inline: true },
          { name: "Güncel Üye Sayısı", value: `${member.guild.memberCount}`, inline: true }
        )
        .setColor(0xFF0000)
        .setTimestamp();
      channel.send({ embeds: [embed] });
    }
  }
};
