const { MessageEmbed } = require("discord.js");
const { Webhook } = require("simple-discord-webhooks");

module.exports = {
    name: "report",
    description: "📨 Domain report",
    usage: "report [domain]",
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

        const res = await client.databaseManagers.domains.getByDomain(domain);
        const postman = new Webhook(process.env.REPORT_WEBHOOK_URL, "Domains Report");

        if (!res) {
            const embed = new MessageEmbed()
                .setDescription("📨 Domain report")
                .addField("Status", "Report sent <:LockBot_check:872171596645826592>")
                .addField("Domain", domain);

            await message.reply({ embeds: [embed] });

            const report = new MessageEmbed()
                .setDescription("📨 Domain report")
                .setThumbnail(message.author.avatarURL({ format: "png" }))
                .addField("Report author", `<@${message.author.id}>`)
                .addField("Report author id", message.author.id)
                .addField("Domain", domain)
                .addField("URL", `[message link](${message.url})`);

            await postman.send("", [report]);
        } else {
            await message.reply({ embeds: [client.newError(`The domain \`${domain}\` already exists in the database!`)] });
        }
    },
};
