const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "logs",
    description: "🔧 Logs channel settings",
    usage: "logs [channel id/channel]",
    userFlag: "MANAGE_GUILD",
    cooldown: 15,
    async execute(client, message, args) {
        if (!args[0]) return await message.reply({ embeds: [client.newError("The channel ID argument is missing!")] });

        let channel;

        if (/<#\d{18}>/.exec(args[0])[0]) channel = args[0].replace("<#", "").replace(">", "");
        else channel = args[0];

        try {
            channel = await message.guild.channels.cache.get(channel);
            if (!channel) channel = await message.guild.channels.fetch(channel);
        } catch (err) {
            return await message.reply({ embeds: [client.newError("Wrong channel ID!")] });
        }

        if (channel) {
            const res = await client.databaseManagers.guilds.get(message.guild.id);

            if (res?.logsChannel === channel.id) return await message.reply({ embeds: [client.newError("This channel is already set!")] });

            await client.databaseManagers.guilds.update(message.guild.id, {
                logsChannel: channel.id,
            });

            const embed = new MessageEmbed().setDescription("🔧 Logs channel").addField("Channel set", `<#${channel.id}>`).setColor("#7289DA");
            return await message.reply({ embeds: [embed] });
        }
    },
};
