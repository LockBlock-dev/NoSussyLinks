const fs = require("fs");
const axios = require("axios").default;
const mongoose = require("mongoose");
const { Collection } = require("discord.js");

module.exports = async (client) => {
    const options = {
        autoIndex: false, // Don't buiLd indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };

    mongoose.connect(process.env.MONGODB_URL, options).catch((error) => console.error(error));
    mongoose.Promise = global.Promise;
    mongoose.connection.on("connected", () => console.log("[Database] MongoDB is online."));

    client.cooldown = new Collection();
    client.commands = new Collection();

    fs.readdirSync("./commands").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`);

        commands
            .filter((file) => file.endsWith(".js"))
            .forEach((file) => {
                const command = require(`../commands/${dir}/${file}`);
                client.commands.set(command.name, command);
            });
    });

    fs.readdirSync("./events").forEach((dir) => {
        const events = fs.readdirSync(`./events/${dir}/`);

        events
            .filter((file) => file.endsWith(".js"))
            .forEach((file) => {
                const event = require(`../events/${dir}/${file}`);
                event.once
                    ? client.once(event.name, (...args) => event.execute(...args, client))
                    : client.on(event.name, (...args) => event.execute(...args, client));
            });
    });

    require("./helpers.js")(client);
    require("./database.js")(client);
};
