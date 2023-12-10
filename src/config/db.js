import mongoose from 'mongoose';
const uri =

"mongodb+srv://beatriz1712sc:soynuevabasededatos@cluster0.2gm0bzy.mongodb.net/test ";
function connectDB() {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch((error) =>
      console.error("Error al conectar a la base de datos:", error)
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