const { MessageEmbed } = require("discord.js");
const ecoSchema = require(`${process.cwd()}/modelos/economia.js`);
const { asegurarEco } = require(`${process.cwd()}/handlers/funciones.js`);
const duration = require("humanize-duration");
const frases = [
  "ou shine people's shoes in class and they give you",
  "Someone came and performed a play. They gave you",
  "You work as an elevator mechanic and earn",
];

module.exports = {
  name: "Work",
  aliases: ["work", "trabajo", "job"],
  desc: "Sirve para trabajar y reclamar una recompensa",
  run: async (client, message, args, prefix) => {
    const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
    if (user.bot) return message.reply("❌ **Los bots no puede tener dinero!**");
    await asegurarEco(user.id);
    let data = await ecoSchema.findOne({ userID: message.author.id });
    // Definimos cada cuanto se puede reclamar la recompensa en MS 3hs = 10800000
    const tiempo_ms = 8 * 60 * 60 * 1000;
    // Minimo 10 - Maximo 800 tokens
    const recompensa = Math.floor(Math.random() * 150) + 30;
    const frase = frases[Math.floor(Math.random() + frases.length)];
    // Comprobaciones previas
    if (tiempo_ms - (Date.now() - data.work) > 0) {
      const tiempo_restante = duration(Date.now() - data.work - tiempo_ms, { language: "en", units: ["h", "m", "s"], round: true });
      return message.reply(`🕐 **You cannot claim the reward yet, you must wait:** \`${tiempo_restante}\``);
    }
    await ecoSchema.findOneAndUpdate(
      { userID: message.author.id },
      {
        $inc: { wallet: recompensa },
        work: Date.now(),
      }
    );
    data = await ecoSchema.findOne({ userID: message.author.id });

    const exampleEmbed = new MessageEmbed()
      .setColor("#0x78008f")
      .setTitle(`Completed Work ${user.user.tag}`)
      // .setURL('https://discord.js.org/')
      .setAuthor({
        name: "Walcom Bot",
        iconURL: "https://cdn.discordapp.com/attachments/804483464355119175/964307064950239262/IMG_9787.JPG",
        url: null,
      })
      // .setDescription('Some description here')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      /* .addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	) */
      .addField(`\`${frase}\` . \`${recompensa} WCM Coins\``, `🪙 **Wallet:** \`${data.wallet} WCM Coins\``, false)
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp();
    // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    message.reply({ embeds: [exampleEmbed] });
  },
};
