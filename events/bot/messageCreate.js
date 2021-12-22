const commandHandling = require("../../utils/commandHandling");
const messageHandling = require("../../utils/messageHandling");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message, client) {
        const guild = await client.databaseManagers.guilds.get(message.guild.id);
        if (!guild) {
            await client.databaseManagers.guilds.create({
                id: message.guild.id,
                name: message.guild.name,
            });
        }

        await commandHandling(client, message);
        await messageHandling(client, message);
    },
};
