const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    description: "🔗 Invite link of the bot",
    usage: "invite",
    cooldown: 15,
    async execute(client, message) {
        const embed = new MessageEmbed()
            .setDescription(
                `Click [here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1099511639040&scope=bot) to invite the bot`
            )
            .setColor("#7289DA");

        await message.reply({ embeds: [embed] });
    },
};
