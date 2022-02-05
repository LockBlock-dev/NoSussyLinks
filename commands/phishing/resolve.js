const { MessageEmbed } = require("discord.js");
const dns = require("dns").promises;

module.exports = {
    name: "resolve",
    description: "🔎 Resolve a domain",
    usage: "resolve [domain]",
    dev: true,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The domain argument is missing!")] });

        let domain, addresses;

        try {
            domain = new URL(args[0]);
        } catch {
            domain = args[0];
        }
        domain = domain.hostname ?? domain;

        try {
            addresses = await dns.resolve(domain, "A");
        } catch (e) {
            addresses = null;
        }

        const embed = new MessageEmbed().setColor("#7289DA");

        if (addresses) {
            const embed = new MessageEmbed()
                .setDescription("🔎 Domain lookup")
                .addField("Result", "Domain resolves <:check:938862703877955634>")
                .addField("Domain", domain)
                .addField("Addresses", `\`\`\`${addresses.join("\n")}\`\`\``);

            await message.reply({ embeds: [embed] });
        } else {
            embed
                .setDescription("🔎 Domain lookup")
                .addField("Result", "Domain does not resolve <:cross:938862701822758922>")
                .addField("Domain", domain);

            await message.reply({ embeds: [embed] });
        }
    },
};
