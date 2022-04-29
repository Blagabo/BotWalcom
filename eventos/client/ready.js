const mongoose = require("mongoose");
const mySecret = process.env['MongoDB']

module.exports = (client) => {
  mongoose
    .connect(mySecret, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("☁️ Conectado a la base de datos ✅".blue);
    })
    .catch((err) => {
      console.log("❌ Error al conectar con la Base de datos".red);
      console.log(err);
    });

  console.log(`Conectado como ${client.user.tag} 🤖`.green);
};
