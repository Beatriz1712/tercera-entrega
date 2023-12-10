import mongoose from 'mongoose';
import chalk from'chalk';
mongoose.set("strictQuery", false);

const uri =

"mongodb+srv://beatriz1712sc:soynuevabasededatos@cluster0.2gm0bzy.mongodb.net/test ";
function connectDB() {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("\u001b[1;36m Connection successful Database "))
    .catch((error) =>
      console.error("\u001b[1;31m Connection failed " + error, error)
    );
}







/*
const connectDB = async () => {
 
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch((error) =>
      console.error("Error al conectar a la base de datos:", error)
    );
};
*/


export default connectDB;

/*  
try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al intentar conectarse a la base de datos', error);
  }
*/