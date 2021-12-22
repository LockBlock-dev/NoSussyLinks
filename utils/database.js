const { Guild, Blacklist, Domain, Term, Stats } = require("./models/index.js");

module.exports = (client) => {
    const methods = {
        blacklist: {
            get: async (id) => {
                const data = await Blacklist.findOne({ id: id });
                if (data) return data;
            },

            add: async (user) => {
                const newUser = await new Blacklist(user);
                await newUser.save();
                console.log(`[Database] User added to the blacklist: ${user.id} ${user.username}, reason: ${user.reason}`);
            },

            remove: async (id) => {
                const data = await client.databaseManagers.blacklist.get(id);
                await data.remove();
                console.log(`[Database] User removed from the blacklist: ${id} ${data.username}`);
            },

            size: async () => {
                return await Blacklist.estimatedDocumentCount();
            },
        },
        guilds: {
            get: async (id) => {
                const data = await Guild.findOne({ id: id });
                if (data) return data;
            },

            create: async (guild) => {
                const newGuild = await new Guild(guild);
                await newGuild.save();
                console.log(`[Database] Guild created: ${guild.id} ${guild.name}`);
            },

            update: async (id, changes) => {
                let data = await client.databaseManagers.guilds.get(id);

                if (typeof data !== "object") data = {};

                const res = await data.updateOne(changes);
                data = await client.databaseManagers.guilds.get(id);

                if (res.nModified > 0) console.log(`[Database] Guild updated: ${data.id} ${data.name}. Changes: ${JSON.stringify(changes)}`);
            },

            delete: async (id) => {
                const data = await client.guildsManager.get(id);
                await data.remove();
                console.log(`[Database] Guild deleted: ${id} ${data.name}`);
            },

            size: async () => {
                return await Guild.estimatedDocumentCount();
            },
        },
        domains: {
            getByDomain: async (domain) => {
                const data = await Domain.findOne({ domain: domain });
                if (data) return data;
            },

            getByHash: async (hash) => {
                const data = await Domain.findOne({ hash: hash });
                if (data) return data;
            },

            add: async (domainObj) => {
                const newDomain = await new Domain(domainObj);
                await newDomain.save();
                console.log(`[Database] Domain added: ${domainObj.domain}`);
            },

            remove: async (domain) => {
                const data = await client.databaseManagers.domains.getByDomain(domain);
                await data.remove();
                console.log(`[Database] Domain removed: ${domain}`);
            },

            size: async () => {
                return await Domain.estimatedDocumentCount();
            },
        },
        terms: {
            get: async (term) => {
                const data = await Term.findOne({ term: term });
                if (data) return data;
            },

            getAll: async () => {
                const data = await Term.find({});
                if (data) return data;
            },

            add: async (term) => {
                const newDomain = await new Term({ term: term });
                await newDomain.save();
                console.log(`[Database] Term added: ${term}`);
            },

            remove: async (term) => {
                const data = await client.databaseManagers.terms.get(term);
                await data.remove();
                console.log(`[Database] Term removed: ${term}`);
            },

            size: async () => {
                return await Term.estimatedDocumentCount();
            },
        },
        stats: {
            get: async (name) => {
                const data = await Stats.findOne({ name: name });
                if (data) return data;
            },
            add: async (name) => {
                const newStats = await new Stats({ name: name });
                await newStats.save();
                console.log(`[Database] Stats added: ${name}`);
            },
            updateCount: async (name, newCount) => {
                let data = await client.databaseManagers.stats.get(name);
                let oldC = data.count;
                if (typeof data !== "object") data = {};

                const res = await data.updateOne({ count: newCount });
                data = await client.databaseManagers.stats.get(name);

                if (res.nModified > 0) console.log(`[Database] Stats updated: ${data.name}. Count changed: ${oldC} => ${data.count}`);
            },
        },
    };

    client.databaseManagers = {};
    Object.assign(client.databaseManagers, methods);
};
