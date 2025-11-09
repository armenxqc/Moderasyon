const { EmbedBuilder } = require("discord.js");
let snipes = {};

module.exports = {
  name: "snipe",
  description: "Son silinen mesajı gösterir",
  execute(message, args, client) {
    const channelId = message.channel.id;
    const snipe = snipes[channelId];
    if(!snipe) return message.reply("Silecek mesaj yok.");

    const embed = new EmbedBuilder()
      .setTitle("📌 Snipe")
      .setDescription(snipe.content)
      .addFields(
        { name: "Yazar", value: `${snipe.author}`, inline: true },
        { name: "Kanal", value: `<#${channelId}>`, inline: true }
      )
      .setColor(0x800080)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
  setSnipe(channelId, message) {
    snipes[channelId] = {
      content: message.content,
      author: message.author.tag
    };
  }
};
