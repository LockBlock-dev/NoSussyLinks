const { Permissions } = require("discord.js");

module.exports = async (client, message) => {
    const prefix = process.env.PREFIX;

    if (message.channel.type === "DM" || message.author.bot || !message.content.startsWith(prefix)) return;

    const isBlacklisted = await client.databaseManagers.blacklist.get(message.member.user.id);

    if (isBlacklisted) return;

    guild = await client.databaseManagers.guilds.get(message.guild.id);

    if (!guild) {
        await client.databaseManagers.guilds.create({
            id: message.guild.id,
            name: message.guild.name,
        });

        guild = await client.databaseManagers.guilds.get(message.guild.id);
    }

    const input = message.content.slice(prefix.length).trim().split(/ +/g);

    if (client.commands.has(input[0])) {
        const command = client.commands.get(input[0]);

        if (command.dev && message.author.id !== process.env.DEV_ID) return;

        if (command.cooldown > 0 && client.cooldown.get(message.author.id)?.includes(command.name))
            return await message.reply({
                embeds: [client.newError(`You are on cooldown, please wait up to ${command.cooldown}s`)],
            });

        if (command.userFlag && !message.member.permissionsIn(message.channel).has(Permissions.FLAGS[command.userFlag]))
            return await message.reply({
                embeds: [client.newError(`You do not have the \`${command.userFlag}\` permission to execute this command`)],
            });

        // if (command.clientFlag && !message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS[command.clientFlag])) {
        //     return await message.reply({
        //         embeds: [client.newError(`I do not have the \`${command.clientFlag}\` permission to execute this command`)],
        //     });
        // }

        const args = input.slice(1);

        if (command.cooldown > 0) {
            client.cooldown.set(message.author.id, [command.name, ...(client.cooldown.get(message.author.id) ?? [])]);

            setTimeout(() => {
                client.cooldown.set(
                    message.author.id,
                    client.cooldown.get(message.author.id).filter((e) => {
                        return e !== command.name;
                    })
                );
            }, 1000 * command.cooldown);
        }

        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            await message.reply({
                embeds: [client.newError("There was an error while executing this command")],
            });
        }
    }
};
