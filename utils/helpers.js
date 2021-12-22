// const humanize = require("humanize-duration");
const { MessageEmbed } = require("discord.js");

// const shortHumanize = humanize.humanizer({
//     language: "short",
//     languages: {
//         short: {
//             y: () => "y",
//             mo: () => "mo",
//             w: () => "w",
//             d: () => "d",
//             h: () => "hr",
//             m: () => "min",
//             s: () => "sec",
//             ms: () => "ms",
//         },
//     },
// });

module.exports = (client) => {
    client.newError = (error) => {
        const embed = new MessageEmbed().setDescription(error).setColor("#FF0000");
        return embed;
    };

    // client.humanize = (time) => {
    //     return shortHumanize(time);
    // };
};
