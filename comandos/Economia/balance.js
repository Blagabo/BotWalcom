const { MessageEmbed } = require("discord.js");
const ecoSchema = require(`${process.cwd()}/modelos/economia.js`);
const { asegurarEco } = require(`${process.cwd()}/handlers/funciones.js`);
module.exports = {
  name: "balance",
  aliases: ["dinero", "tokens", "bal", "wallet"],
  desc: "Sirve para saber el balance de un Usuario",
  run: async (client, message, args, prefix) => {
    const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
    if (user.bot) return message.reply("❌ **Los bots no puede tener dinero!**");
    await asegurarEco(user.id);
    const data = await ecoSchema.findOne({ userID: user.id });

    const exampleEmbed = new MessageEmbed()
      .setColor("#0x78008f")
      .setTitle(`Wallet de ${user.user.tag}`)
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
      .addField(
        `🪙 **Wallet:** \`${data.wallet} tokens\``,
        `:moneybag: **Total Retirados:** \`${data.retirado} tokens\``,
        false
      )
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp();
    // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    message.reply({ embeds: [exampleEmbed] });
  },
};
