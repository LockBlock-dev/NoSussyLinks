const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "🏓 Pong !",
    usage: "ping",
    cooldown: 3,
    async execute(client, message) {
        const embed = new MessageEmbed()
            .setDescription(`🏓 Pong`)
            .addField("Latency", `${Math.round(client.ws.ping)} ms`)
            .setColor("#7289DA");

        await message.reply({ embeds: [embed] });
    },
};
