const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "toplurol",
  description: "Belirli bir rolü herkese hızlıca verir",
  async execute(message, args, client) {
    if (!message.guild) return;

 
    const roleID = "1406950139645530132";
    const role = message.guild.roles.cache.get(roleID);

    if (!role) return message.reply("❌ Rol bulunamadı!");


    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply("❌ Rolleri yönetme yetkim yok!");
    }
    if (role.position >= message.guild.members.me.roles.highest.position) {
      return message.reply("❌ Bu rolü veremem, rolüm daha aşağıda!");
    }

    let members;
    try {
      members = await message.guild.members.fetch();
    } catch (err) {
      console.error(err);
      return message.reply("❌ Üyeleri alırken hata oluştu!");
    }

    let count = 0;


    const promises = members.map(async (member) => {
      if (!member.user.bot && !member.roles.cache.has(role.id)) {
        return member.roles.add(role).then(() => count++).catch(() => {
          console.log(`Rol verilemedi: ${member.user.tag}`);
        });
      }
    });

    await Promise.all(promises);


    const embed = new EmbedBuilder()
      .setTitle("✅ Toplu Rol Dağıtımı Tamamlandı")
      .setDescription(`Rol **${role.name}** toplam **${count}** kullanıcıya verildi.`)
      .setColor(0x6A0DAD)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
