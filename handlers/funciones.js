const ecoSchema = require(`${process.cwd()}/modelos/economia.js`);
const serverSchema = require(`${process.cwd()}/modelos/servidor.js`);

module.exports = {
  asegurar,
  asegurarEco,
};

async function asegurar(schema, id, id2, objeto) {
  let data = await serverSchema.findOne({ id: id2 });
  if (!data) {
    console.log("NO HABIA BASE DE DATOS CREADA, CREANDO UNA ...");
    data = await new serverSchema(objeto);
    data.save();
  }
  return data;
}

async function asegurarEco(userid) {
  if (userid) {
    let ecodata = await ecoSchema.findOne({ userID: userid });
    if (!ecodata) {
      console.log(`Asegurado: Economia de ${userid}`.green);
      ecodata = await new ecoSchema({
        userID: userid,
      });
      await ecodata.save();
    }
  }
}
