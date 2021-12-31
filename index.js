require("dotenv").config();
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

process.on("uncaughtException", (err) => {
    console.log(`Uncaught exception: ${err}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection: ${err}`);
});

require("./utils/loader.js")(client);

client.login(process.env.DISCORD_TOKEN);
