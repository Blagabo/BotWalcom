const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["latencia", "ms"],
  desc: "Sirve para saber la latencia del Bot",
  run: async (client, message, args, prefix) => {
    const exampleEmbed = new MessageEmbed()
      .setColor("#0x78008f")
      .setTitle("PING DEL BOT")
      // .setURL('https://discord.js.org/')
      .setAuthor({
        name: "Walcom Bot",
        iconURL: "https://cdn.discordapp.com/attachments/804483464355119175/964307064950239262/IMG_9787.JPG",
        url: null,
      })
      // .setDescription('Some description here')
      .setThumbnail("https://cdn.discordapp.com/attachments/804483464355119175/964307064950239262/IMG_9787.JPG")
      /* .addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	) */
      .addField("🤖 PING DEL BOT", `\`${client.ws.ping}ms\``, false)
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp();
    // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    message.reply({ embeds: [exampleEmbed] });
  },
};
