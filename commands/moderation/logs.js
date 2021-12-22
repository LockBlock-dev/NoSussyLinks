const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "logs",
    description: "🔧 Logs channel settings",
    usage: "logs [channel id]",
    userFlag: "MANAGE_GUILD",
    cooldown: 15,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The channel ID argument is missing!")] });

        let channel;

        try {
            channel = await message.guild.channels.cache.get(args[0]);
            if (!channel) channel = await message.guild.channels.fetch(args[0]);
        } catch (err) {
            return await message.reply({ embeds: [client.newError("Wrong channel ID!")] });
        }

        if (channel) {
            await client.databaseManagers.guilds.update(message.guild.id, {
                logsChannel: channel.id,
            });

            const embed = new MessageEmbed().setDescription("🔧 Logs channel").addField("Channel set", `<#${channel.id}>`);
            return await message.reply({ embeds: [embed] });
        }
    },
};
