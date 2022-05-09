const { MessageEmbed } = require("discord.js");
const ecoSchema = require(`${process.cwd()}/modelos/economia.js`);
const { asegurarEco } = require(`${process.cwd()}/handlers/funciones.js`);
const duration = require("humanize-duration");

module.exports = {
  name: "Collect",
  aliases: ["collect", "recompensa", "daily", "diario"],
  desc: "Sirve para reclamar una recompensa diaria",
  run: async (client, message, args, prefix) => {
    const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
    if (user.bot) return message.reply("❌ **Los bots no puede tener dinero!**");
    await asegurarEco(user.id);
    const data = await ecoSchema.findOne({ userID: message.author.id });
    // Definimos cada cuanto se puede reclamar la recompensa en MS
    const tiempo_ms = 86400000;
    const recompensa = 100;
    // Comprobaciones previas
    if (tiempo_ms - (Date.now() - data.collect) > 0) {
      const tiempo_restante = duration(Date.now() - data.collect - tiempo_ms, { language: "es", units: ["h", "m", "s"], round: true });
      return message.reply(`🕐 **No puedes reclamar la recompensa todavia, debes esperar:** \`${tiempo_restante}\``);
    }
    await ecoSchema.findOneAndUpdate(
      { userID: message.author.id },
      {
        $inc: { wallet: recompensa },
        collect: Date.now(),
      }
    );

    const exampleEmbed = new MessageEmbed()
      .setColor("#0x78008f")
      .setTitle(`Completed Collect ${user.user.tag}`)
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
      .addField(`You have claimed your reward from \`${recompensa} tokens\``, false)
      .addField(`🪙 **Wallet:** \`${data.wallet} tokens\``, false)
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp();
    // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return message.reply({ embeds: [exampleEmbed] });
  },
};
