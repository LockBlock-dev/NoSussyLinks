module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.user.setStatus("Online");
        client.user.setActivity(`over ${client.guilds.cache.size} servers | p!help`, { type: "WATCHING" });

        console.log(`[Bot] Online in ${client.guilds.cache.size} servers.`);
    },
};
