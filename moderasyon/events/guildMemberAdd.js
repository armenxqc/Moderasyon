const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {

    const role = member.guild.roles.cache.get(config.autoRole);
    if (role) member.roles.add(role).catch(() => {});


    const channel = member.guild.channels.cache.get(config.welcomeLeaveChannel);
    if (channel) {
      const embed = new EmbedBuilder()
        .setTitle("🟢 Yeni Üye Katıldı")
        .setDescription(`${member.user.tag} sunucuya katıldı.`)
        .addFields(
          { name: "Kullanıcı ID", value: member.id, inline: true },
          { name: "Hesap Oluşturulma Tarihi", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
          { name: "Güncel Üye Sayısı", value: `${member.guild.memberCount}`, inline: true }
        )
        .setColor(0x00FF00)
        .setTimestamp();
      channel.send({ embeds: [embed] });
    }
  }
};
