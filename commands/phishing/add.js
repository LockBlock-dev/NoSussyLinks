const { MessageEmbed } = require("discord.js");
const { createHash } = require("crypto");

module.exports = {
    name: "add",
    description: "🔒 Add a domain to the database",
    usage: "add [domain]",
    dev: true,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The domain argument is missing!")] });

        const res = await client.databaseManagers.domains.getByDomain(args[0]);
        if (!res) {
            const hash = createHash("sha256").update(args[0]).digest("hex");

            await client.databaseManagers.domains.add({
                hash: hash,
                domain: args[0],
            });

            const embed = new MessageEmbed().setDescription("🔒 New domain added to the database").addField("Domain", args[0]).addField("Hash", hash);

            await message.reply({ embeds: [embed] });
        } else {
            await message.reply({ embeds: [client.newError(`The domain \`${args[0]}\` already exists in the database!`)] });
        }
    },
};
