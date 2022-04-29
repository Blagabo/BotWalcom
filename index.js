const Discord = require("discord.js");
require("dotenv").config();
const mySecret = process.env.TOKEN;
require("colors");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function requerirhandlers() {
  ["command", "events"].forEach((handler) => {
    try {
      require(`./handlers/${handler}`)(client, Discord);
    } catch (e) {
      console.warn(e);
    }
  });
}
requerirhandlers();

client.login(mySecret);
