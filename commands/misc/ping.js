const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "🏓 Pong !",
    usage: "ping",
    cooldown: 2,
    async execute(client, message) {
        const embed = new MessageEmbed().setDescription(`🏓 Pong`).addField("Latency", `${Math.round(client.ws.ping)} ms`);

        await message.reply({ embeds: [embed] });
    },
};
