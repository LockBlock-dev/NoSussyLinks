module.exports = {
    name: "guildDelete",
    once: false,
    async execute(guild, client) {
        const res = await client.databaseManagers.guilds.get(guild.id);

        if (res)
            await client.databaseManagers.guilds.update(guild.id, {
                left: true,
            });

        client.user.setActivity(`over ${client.guilds.cache.size} servers | p!help`, { type: "WATCHING" });
    },
};
