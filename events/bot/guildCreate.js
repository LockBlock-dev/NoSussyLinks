module.exports = {
    name: "guildCreate",
    once: false,
    async execute(guild, client) {
        await client.databaseManagers.guilds.create({
            id: guild.id,
            name: guild.name,
        });
    },
};
