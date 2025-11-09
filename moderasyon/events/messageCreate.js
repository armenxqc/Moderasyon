const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const badWords = require("../badwords.json");

const linkRegex = /(https?:\/\/[^\s]+)/g;

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;

    const content = message.content.toLowerCase();


    const modRole = message.guild.roles.cache.get(config.modRole);
    if (!modRole) return;


    if (badWords.some(word => content.includes(word)) || linkRegex.test(content)) {
      await message.delete().catch(() => {});


      if (logChannel) {
        const embed = new EmbedBuilder()
          .setTitle("🚨 Kural İhlali")
          .addFields(
            { name: "Kullanıcı", value: `${message.author.tag} (${message.author.id})`, inline: false },
            { name: "Kanal", value: `${message.channel}`, inline: false },
            { name: "Mesaj İçeriği", value: message.content || "*(boş mesaj)*", inline: false },
            { name: "Tür", value: badWords.some(word => content.includes(word)) ? "Küfür" : "Link", inline: false }
          )
          .setColor(0xFF0000)
          .setTimestamp();
        logChannel.send({ embeds: [embed] });
      }


      try {
        const modMembers = await modRole.members.fetch();
        modMembers.forEach(m => {
          m.send({
            embeds: [
              new EmbedBuilder()
                .setTitle("⚠️ Kullanıcı Uyarısı")
                .setDescription(`${message.author.tag} mesajı silindi.`)
                .addFields(
                  { name: "Kanal", value: `${message.channel}`, inline: true },
                  { name: "Mesaj", value: message.content, inline: false }
                )
                .setColor(0xFF0000)
                .setTimestamp()
            ]
          }).catch(() => {});
        });
      } catch(err) {
        console.error("Mod üyelerine DM gönderilemedi:", err);
      }
    }


    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    try { 
      await command.execute(message, args, client); 
    } catch (err) { 
      console.error(err); 
    }
  }
};
