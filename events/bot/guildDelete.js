module.exports = {
    name: "guildDelete",
    once: false,
    async execute(guild, client) {
        const res = await client.databaseManagers.guilds.get(message.guild.id);

        if (res)
            await client.databaseManagers.guilds.update(guild.id, {
                left: true,
            });
    },
};
