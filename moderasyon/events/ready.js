module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`✅ Bot başarıyla başlatıldı: ${client.user.tag}`);
    client.user.setActivity("Valo Hub ❤️", { type: 0 });
  }
};
