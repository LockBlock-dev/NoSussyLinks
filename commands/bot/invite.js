const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    description: "🔗 Invite link of the bot",
    usage: "invite",
    cooldown: 15,
    async execute(client, message) {
        const embed = new MessageEmbed().setDescription(
            "🔗 Click [here](https://discord.com/api/oauth2/authorize?client_id=916695132424794122&permissions=11264&scope=bot) to invite the bot"
        );

        await message.reply({ embeds: [embed] });
    },
};
