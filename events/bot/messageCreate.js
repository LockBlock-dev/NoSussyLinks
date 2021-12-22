const commandHandling = require("../../utils/commandHandling");
const messageHandling = require("../../utils/messageHandling");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message, client) {
        await commandHandling(client, message);
        await messageHandling(client, message);
    },
};
