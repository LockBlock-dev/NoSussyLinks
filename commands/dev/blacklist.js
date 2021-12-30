const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "blacklist",
    description: "🤖 Blacklist an user",
    usage: "blacklist [add/remove] [user id] (reason)",
    dev: true,
    async execute(client, message, args) {
        const embed = new MessageEmbed().setColor("#7289DA");
        const reason = args[2] ? args.splice(2).join(" ") : "no reason provided";
        const member = args[1];
        const method = args[0];

        if (member === message.author.id) return await message.reply({ embeds: [client.newError("You can't blacklist yourself")] });

        let user, err;

        try {
            user = await client.users.fetch(member);
        } catch (err) {}

        switch (method) {
            case "add":
                await client.databaseManagers.blacklist.add({
                    id: user ? user.id : member,
                    username: user ? user.username : null,
                    reason: reason,
                });

                if (user)
                    await user.send(`You are blacklisted from the bot for the following reason: ${reason}`).catch(async () => {
                        err = "User is not reachable by the bot";
                    });

                embed
                    .setDescription("🤖 Blacklist manager")
                    .addField("Status", "Blacklisted")
                    .addField("User", `<@${user ? user.id : member}>`)
                    .addField("ID", user ? user.id : member);

                if (err) embed.addField("Error", err);
                break;

            case "remove":
                await client.databaseManagers.blacklist.remove(user ? user.id : member);

                if (user)
                    await user.send(`You are blacklisted from the bot for the following reason: ${reason}`).catch(async () => {
                        err = "User is not reachable by the bot";
                    });

                embed
                    .setDescription("🤖 Blacklist manager")
                    .addField("Status", "Removed from the blacklist")
                    .addField("User", `<@${user ? user.id : member}>`)
                    .addField("ID", user ? user.id : member);

                if (err) embed.addField("Error", err);
                break;

            case "lookup":
                const res = await client.databaseManagers.blacklist.get(user ? user.id : member);

                embed
                    .setDescription("🤖 Blacklist manager")
                    .addField("Status", res ? "Blacklisted" : "Not blacklisted")
                    .addField("User", `<@${user ? user.id : member}>`)
                    .addField("ID", user ? user.id : member);

                break;
        }

        if (embed.description) await message.reply({ embeds: [embed] });
    },
};
