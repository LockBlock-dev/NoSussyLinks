const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "💡 Help of the bot",
    usage: "help (command)",
    cooldown: 3,
    async execute(client, message, args) {
        const embed = new MessageEmbed().setColor("#7289DA");
        const command = args[0];

        if (args.length) {
            const commandFile = client.commands.get(command);

            if (!commandFile) return await message.reply({ embeds: [client.newError(`I couldn't find the \`${command}\` command!`)] });

            embed
                .setDescription(`💡 Help of the \`${command}\` command`)
                .addField("Description", commandFile.description)
                .addField("Usage", `${process.env.PREFIX}${commandFile.usage}`)
                .addField("Restricted", commandFile.dev ? "Yes" : "No")
                .addField("Reminder", "[value] = required\n(value) = optional");
        } else {
            embed.setDescription(`💡 List of commands`);

            fs.readdirSync("./commands").forEach((dir) => {
                const commandsFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
                const commands = [];
                let category;

                commandsFiles.forEach((command) => {
                    commands.push(`\`${command.split(".js")[0]}\``);
                });

                switch (dir) {
                    case "phishing": {
                        category = "🔒 Anti Phishing";
                        break;
                    }
                    case "bot": {
                        category = "🤖 Bot";
                        break;
                    }
                    case "misc": {
                        category = "📦 Misc";
                        break;
                    }
                    case "moderation": {
                        category = "🔧 Moderation";
                        break;
                    }
                }
                if (dir !== "dev") embed.addField(category, commands.join(", "));
            });
        }

        embed.addField("\u200B", "If you need help join the [support server](https://discord.gg/R2KVJNr4Ta).");
        await message.reply({ embeds: [embed] });
    },
};
