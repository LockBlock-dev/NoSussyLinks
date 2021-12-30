const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    description: "🤖 Evaluate Javascript code",
    usage: "eval [code]",
    dev: true,
    async execute(client, message, args) {
        const code = args.join(" ");
        const embed = new MessageEmbed();

        const codeblock = (language, code) => {
            return `\`\`\`${language}\n${code}\n\`\`\``;
        };

        eval(code);

        //available languages : apache, asciidoc, autohotkey, bash, coffeescript, cpp, cs, css, diff, fix, glsl, ini, js, json, md, ml, prolog, py, tex, xl, xml

        embed.setDescription("🤖 Javascript evaluation").addField("Code", codeblock("js", code)).setColor("#7289DA");

        await message.author.send({ embeds: [embed] });
    },
};
