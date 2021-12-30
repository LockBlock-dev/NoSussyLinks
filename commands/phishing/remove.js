const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "remove",
    description: "🔓 Remove a domain from the database",
    usage: "remove [domain]",
    dev: true,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The domain argument is missing!")] });

        let domain;

        try {
            domain = new URL(args[0]);
        } catch {
            domain = args[0];
        }
        domain = domain.hostname ?? domain;

        const res = await client.databaseManagers.domains.getByDomain(domain);

        if (res) {
            await client.databaseManagers.domains.remove(domain);

            const embed = new MessageEmbed().setDescription("🔓 Domain removed from the database").addField("Domain", domain).setColor("#7289DA");

            await message.reply({ embeds: [embed] });
        } else {
            await message.reply({ embeds: [client.newError(`The domain \`${domain}\` does not exist in the database!`)] });
        }
    },
};
