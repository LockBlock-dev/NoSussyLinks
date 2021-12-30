const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    if (message.author.id === client.user.id || message.channel.type === "DM" || message.system || message.content.indexOf(process.env.PREFIX) === 0)
        return;

    const URLregex = /[-a-zA-Z0-9@:%_\+.~#?&//=]+\.[-a-z]+\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;

    const matches = message.cleanContent.match(URLregex);
    const flagged = [];
    const sussy = [];

    let guild, total;

    if (matches) {
        guild = await client.databaseManagers.guilds.get(message.guild.id);

        if (!guild) {
            await client.databaseManagers.guilds.create({
                id: message.guild.id,
                name: message.guild.name,
            });

            guild = await client.databaseManagers.guilds.get(message.guild.id);
        }

        total = (await client.databaseManagers.stats.get("phishing_attempts")).count;

        for (let match of matches) {
            let phish = new URL(match);

            let res = await client.databaseManagers.domains.getByDomain(phish.hostname);
            if (res) {
                flagged.push(match);
            } else {
                const res = await client.databaseManagers.terms.getAll();
                const terms = res.map((x) => x.term);

                for (let term of terms) {
                    if (message.cleanContent.toLowerCase().includes(term)) sussy.push(term);
                }
            }
        }

        if (flagged.length > 0) {
            message.delete();

            await client.databaseManagers.stats.updateCount("phishing_attempts", total + flagged.length);

            if (guild) {
                const channel = await message.guild.channels.cache.get(guild.logsChannel);

                if (channel) {
                    const embed = new MessageEmbed()
                        .setDescription("🚫 Phishing message deleted")
                        .setThumbnail(message.author.avatarURL({ format: "png" }))
                        .addField("Channel", `<#${message.channel.id}>`)
                        .addField("Author", `<@${message.author.id}>`)
                        .addField("Author id", message.author.id)
                        .addField(`URL${flagged.length > 1 ? "s" : ""}`, `\`\`\`${flagged.join("\n")}\n\`\`\``)
                        .addField("Message content", message.cleanContent)
                        .setColor("#7289DA");

                    await channel.send({ embeds: [embed] });
                }
            }
        } else if (sussy.length > 0) {
            await message.delete();

            await client.databaseManagers.stats.updateCount("phishing_attempts", total + sussy.length);

            if (guild) {
                const channel = await message.guild.channels.cache.get(guild.logsChannel);

                if (channel) {
                    const embed = new MessageEmbed()
                        .setDescription("⚠ Suspicious message deleted")
                        .setThumbnail(message.author.avatarURL({ format: "png" }))
                        .addField("Channel", `<#${message.channel.id}>`)
                        .addField("Author", `<@${message.author.id}>`)
                        .addField("Author id", message.author.id)
                        .addField(`Term${sussy.length > 1 ? "s" : ""}`, `\`\`\`${sussy.join("\n")}\n\`\`\``)
                        .addField("Message content", message.cleanContent)
                        .addField(
                            "\u200B",
                            `Was this warning accurate? Please report the phishing URL${matches.length > 1 ? "s" : ""} by doing \`p!report ${
                                matches[0]
                            }\``
                        )
                        .setColor("#7289DA");

                    await channel.send({ embeds: [embed] });
                }
            }
        }
    }
};
