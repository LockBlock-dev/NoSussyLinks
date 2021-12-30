module.exports = {
    name: "define",
    description: "🪝 What is the phishing",
    usage: "define",
    cooldown: 15,
    async execute(client, message) {
        await message.reply({ content: "https://www.phishing.org/what-is-phishing" });
    },
};
