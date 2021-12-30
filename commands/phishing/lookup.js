const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "lookup",
    description: "🔎 Domain lookup",
    usage: "lookup [domain]",
    cooldown: 15,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The domain argument is missing!")] });

        let domain;

        try {
            domain = new URL(args[0]);
        } catch {
            domain = args[0];
        }
        domain = domain.hostname ?? domain;

        const embed = new MessageEmbed();
        const res = await client.databaseManagers.domains.getByDomain(domain);

        if (res) {
            embed
                .setDescription("🔎 Domain lookup")
                .addField("Result", "Domain found <:LockBot_check:872171596645826592>")
                .addField("Domain", res.domain)
                .addField("Added on", `<t:${Math.floor(res.createdAt.getTime() / 1000)}>`);

            await message.reply({ embeds: [embed] });
        } else {
            embed
                .setDescription("🔎 Domain lookup")
                .addField("Result", "Domain not found <:LockBot_cross:872171604988293140>")
                .addField("\u200B", `If you think this URL is malicious,\nplease let us know:\n\`p!report ${args[0]}\``);

            await message.reply({ embeds: [embed] });
        }
    },
};
