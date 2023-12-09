import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: false, max: 100 },
    email: { type: String, required: true, max: 100 },
    age: { type: Number, required: false, max: 100 },
    password: { type: String, required: false, max: 100 },
    cart: [
        {
            type: [
                {
                    cart: {
                        type: mongoose.Schema.Types.ObjectId, ref: 'carts'
                    }
                }
            ]
        }
    ],
    role: { type: String, required: true, max: 100 }
})

export const UserModel = mongoose.model(userCollection, UserSchema);

/*
export async function registerUser(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.send({ error: "Usuario ya registrado" });
    }

    console.log("Registering user...");
    const { name, surname, email, password, role } = req.body;

    if (!name || !surname || !email || !password || !role) {
      console.log("Faltan datos");
      return res.status(400).send("Faltan datos");
    }

    // Aquí puedes realizar las acciones necesarias para el registro en la base de datos
    // Por ejemplo, crear un nuevo documento con el modelo de usuario y guardarlo

    // Después de realizar el registro, puedes redirigir al usuario a la página de login
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error al registrar usuario: " + error.message);
  }
}
*/    
export async function registerUser(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({ error: "Usuario ya registrado" });
    }

    console.log("Registering user...");
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password || !role) {
      console.log("Faltan datos");
      return res.status(400).send("Faltan datos");
    }

    // Aquí puedes realizar las acciones necesarias para el registro en la base de datos
    // Por ejemplo, crear un nuevo documento con el modelo de usuario y guardarlo

    // Después de realizar el registro, puedes redirigir al usuario a la página de login
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error al registrar usuario: " + error.message);
  }
}

