const mongoose = require("mongoose");
// const mySecret = process.env['MongoDB']
const mySecret = process.env.MongoDB;

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

  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: "idle",
        activities: [
          {
            name: "En Proceso | 1.0.2",
            type: "LISTENING",
          },
        ],
      });
      console.log("Presence Cargado ✅".green);
    }
    presence();
  }, 300000);

  console.log(`Conectado como ${client.user.tag} 🤖`.green);
};
