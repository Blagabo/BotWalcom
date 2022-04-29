const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  const channel = "766224003316187167";
  client.on("guildMemberAdd", async (member) => {
    const embed = new MessageEmbed()
      .setTitle("Bienvenido")
      .setColor("#0x78008f")
      .setAuthor({
        name: "Walcom Bot",
        iconURL: "https://cdn.discordapp.com/attachments/804483464355119175/964307064950239262/IMG_9787.JPG",
        url: null,
      })
      .setDescription("The user <@" + member.user.id + "> has just joined to **Walcom**, enjoy it!")
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter("Walcom | Welcomes")
      .setTimestamp();
    channel.send({ embeds: [embed] });
  });
};
