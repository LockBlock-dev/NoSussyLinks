const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "vote",
    description: "🗳 Vote for the bot",
    usage: "vote",
    cooldown: 15,
    async execute(client, message) {
        const embed = new MessageEmbed().setDescription(`🗳 Vote here: https://top.gg/bot/916695132424794122/vote`).setColor("#7289DA");

        await message.reply({ embeds: [embed] });
    },
};
