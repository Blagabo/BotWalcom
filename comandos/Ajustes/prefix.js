const schema = require(`${process.cwd()}/modelos/servidor.js`);
module.exports = {
  name: "prefix",
  aliases: ["prefijo", "cambiarprefijo"],
  desc: "Sirve para cambiar el prefijo del bot en el Servidor",
  run: async (client, message, args, prefix) => {
    if (!args[0]) return message.reply("❌ Tienes que especificar el prefijo nuevo");
    await schema.findOneAndUpdate(
      { guildID: message.guild.id },
      {
        prefijo: args[0],
      }
    );
    return message.reply(`Cambiado el prefijo de \`${prefix}\` a \`${args[0]}\``);
  },
};
