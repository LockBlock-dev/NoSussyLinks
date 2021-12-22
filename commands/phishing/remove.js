const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "remove",
    description: "🔓 Remove a domain from the database",
    usage: "remove [domain]",
    dev: true,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The domain argument is missing!")] });

        const res = await client.databaseManagers.domains.getByDomain(args[0]);

        if (res) {
            await client.databaseManagers.domains.remove(args[0]);

            const embed = new MessageEmbed().setDescription("🔓 Domain removed from the database").addField("Domain", args[0]);

            await message.reply({ embeds: [embed] });
        } else {
            await message.reply({ embeds: [client.newError(`The domain \`${args[0]}\` does not exist in the database!`)] });
        }
    },
};
