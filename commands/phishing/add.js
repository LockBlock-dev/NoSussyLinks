const { MessageEmbed } = require("discord.js");
const { createHash } = require("crypto");

module.exports = {
    name: "add",
    description: "🔒 Add a domain to the database",
    usage: "add [domain]",
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
        if (!res) {
            const hash = createHash("sha256").update(domain).digest("hex");

            await client.databaseManagers.domains.add({
                hash: hash,
                domain: domain,
            });

            const embed = new MessageEmbed()
                .setDescription("🔒 New domain added to the database")
                .addField("Domain", domain)
                .addField("Hash", hash)
                .setColor("#7289DA");

            await message.reply({ embeds: [embed] });
        } else {
            await message.reply({ embeds: [client.newError(`The domain \`${domain}\` already exists in the database!`)] });
        }
    },
};
