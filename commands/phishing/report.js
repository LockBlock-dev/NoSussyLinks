const { MessageEmbed } = require("discord.js");
const { Webhook } = require("simple-discord-webhooks");

module.exports = {
    name: "report",
    description: "📨 Domain report",
    usage: "report [domain]",
    cooldown: 15,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The domain argument is missing!")] });

        const embeds = [];
        const news = [];
        const exist = [];

        for (let d of args) {
            try {
                d = new URL(d);
            } catch {}

            d = d.hostname ?? d;

            if (d.split(".").length >= 2) {
                let res = await client.databaseManagers.domains.getByDomain(d);

                if (res) exist.push(d);
                else news.push(d);
            }
        }

        const postman = new Webhook(process.env.REPORT_WEBHOOK_URL, "Domains Report");

        if (news.length) {
            const embed = new MessageEmbed()
                .setDescription("📨 Domain report")
                .addField("Status", "Report sent <:LockBot_check:872171596645826592>")
                .addField(`Domain${news.length > 1 ? "s" : ""}`, `\`\`\`${news.join("\n")}\n\`\`\``)
                .setColor("#7289DA");

            embeds.push(embed);

            const report = new MessageEmbed()
                .setDescription("📨 Domain report")
                .setThumbnail(message.author.avatarURL({ format: "png" }))
                .addField("Report author", `<@${message.author.id}>`)
                .addField("Report author id", message.author.id)
                .addField(`Domain${news.length > 1 ? "s" : ""}`, `\`\`\`${news.join("\n")}\n\`\`\``)
                .addField("URL", `[message link](${message.url})`);

            await postman.send("", [report]);
        }

        if (exist.length)
            embeds.push(
                client.newError(
                    `The following domain${exist.length > 1 ? "s" : ""} already exist${
                        exist.length > 1 ? "" : "s"
                    } in the database:\n\`\`\`${exist.join("\n")}\n\`\`\``
                )
            );

        await message.reply({ embeds: embeds });
    },
};
