module.exports = {
  name: "messageDelete",
  once: false,
  execute(message, client) { 
    if(message.author.bot) return;


    const snipeCommand = client.commands.get("snipe");
    if(!snipeCommand) return;


    snipeCommand.setSnipe(message.channel.id, message);
  }
};
