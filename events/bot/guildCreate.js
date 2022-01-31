const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildCreate",
    once: false,
    async execute(guild, client) {
        const res = await client.databaseManagers.guilds.get(guild.id);

        if (!res)
            await client.databaseManagers.guilds.create({
                id: guild.id,
                name: guild.name,
            });

        client.user.setActivity(`over ${client.guilds.cache.size} servers | p!help`, { type: "WATCHING" });

        const welcome = new MessageEmbed()
            .setDescription("📌 Thanks for using NoSussyLinks!")
            .addField("To get started please type", "`p!setup`")
            .setColor("#7289DA");

        if (guild.systemChannel && guild.systemChannel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            await guild.systemChannel.send({ embeds: [welcome] });
        } else {
            const channel = guild.channels.cache.find(
                (channel) => channel.type === "GUILD_TEXT" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
            );

            await channel.send({ embeds: [welcome] });
        }
    },
};
