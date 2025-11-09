const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "unmute",
  description: "Kullanıcının susturulmasını (zaman aşımını) kaldırır",
  async execute(message, args, client) {
    if(!message.member.roles.cache.has(config.modRole)) 
      return message.reply("❌ Bu komutu kullanmak için yetkin yok!");

    const member = message.mentions.members.first();
    if(!member) return message.reply("❌ Bir kullanıcı etiketle!");

    try {
 
      await member.timeout(null);

      const embed = new EmbedBuilder()
        .setTitle("🔊 Kullanıcının Susturulması Kaldırıldı")
        .addFields(
          { name: "👤 Kullanıcı", value: `${member.user.tag}`, inline: true },
          { name: "🛠️ Yetkili", value: `${message.author.tag}`, inline: true }
        )
        .setColor(0x00FFFF) 
        .setTimestamp();

 
      await message.channel.send({ embeds: [embed] });
      const logChannel = message.guild.channels.cache.get(config.logChannel);
      if(logChannel) await logChannel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply("❌ Kullanıcının susturmasını kaldırırken bir hata oluştu!");
    }
  }
};
