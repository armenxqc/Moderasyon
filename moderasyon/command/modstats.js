const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const modstats = require("../modstats.json");

module.exports = {
  name: "modstats",
  description: "Yetkililerin moderasyon istatistiklerini gösterir",
  execute(message, args) {
    if(!message.member.roles.cache.has(config.modRole)) return message.reply("Yetkin yok!");

    let statsMessage = "";

    for(const modId in modstats) {
      const mod = modstats[modId];
      const user = message.guild.members.cache.get(modId);
      if(!user) continue;

      statsMessage += `**${user.user.tag}**\nKick: ${mod.kick || 0}, Ban: ${mod.ban || 0}, Mute: ${mod.mute || 0}, Unmute: ${mod.unmute || 0}, Warn: ${mod.warn || 0}\n\n`;
    }

    const embed = new EmbedBuilder()
      .setTitle("📊 Moderatör İstatistikleri")
      .setDescription(statsMessage || "Hiç istatistik yok.")
      .setColor(0x800080)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
