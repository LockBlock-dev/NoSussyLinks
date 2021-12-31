const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "setup",
    description: "🔧 Bot setup",
    usage: "setup",
    userFlag: "MANAGE_GUILD",
    cooldown: 15,
    async execute(client, message) {
        const embed = new MessageEmbed()
            .setDescription("🔧 Bot settings customization")
            .addField("📝 Logs channel", "The channel where bot logs are sent,\ntype `p!logs [channel id]`")
            //.addField("🤖 Behavior", "The behavior of the bot against sussy links,\ntype `p!behavior`")
            .setColor("#7289DA");

        await message.channel.send({ embeds: [embed] });
    },
};
