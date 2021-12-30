const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    description: "🔎 Check the database stats",
    usage: "stats",
    cooldown: 15,
    async execute(client, message) {
        const embed = new MessageEmbed()
            .setDescription("🔎 Database stats")
            .addField("Total blacklisted users", `${await client.databaseManagers.blacklist.size()}`)
            .addField("Total guilds", `${await client.databaseManagers.guilds.size()}`)
            .addField("Total domains", `${await client.databaseManagers.domains.size()}`)
            .addField("Total phishing attempts prevented", `${(await client.databaseManagers.stats.get("phishing_attempts")).count}`)
            .setColor("#7289DA");

        await message.reply({ embeds: [embed] });
    },
};
