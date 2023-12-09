import { UserModel } from "../dao/mongo/user.model.js";

export async function registerUser(req, res) {
    console.log("Registering user...");
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password || !role) {
      console.log("Faltan datos");
      return res.status(400).send("Faltan datos");
    }
    try {
        const existingUser = await UserModel.findOne({ email})
        if (existingUser){
            return res.status(400).json({status:"error", error: "Usuario ya registrado"})
            
        } 
        
        res.redirect("/login");
        return;
    } catch (error)
     { res.status(500).send("Error al registrar usuario: " + error.message); }

}

export async function loginUser(req, res) {
    try {
        let user = req.user
        if (user.role === "admin") {
            req.session.email = user.email
            req.session.role = user.role;
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            req.session.age = user.age;
            req.session.user = user;
            res.redirect("/profile")
        } else {
            req.session.email = user.email
            req.session.role = user.role
            req.session.first_name = user.first_name
            req.session.last_name = user.last_name;
            req.session.age = user.age;
            req.session.user = user;
            res.redirect("/api/products")
        }
        console.log("Session established:", req.session.user);

    } catch (error) {
        res.status(500).json("Usuario o contraseña incorrectos")
    }
}

export async function logoutUser(req, res) {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function handleGitHubCallback(req, res) {
    try {
        req.session.user = req.user;
        req.session.email = req.user.email;
        req.session.role = req.user.role;

        res.redirect("/profile");
    } catch (error) {
        res.status(500).json("Error during GitHub authentication");
    }
}


