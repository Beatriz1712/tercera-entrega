import { UserModel } from "../dao/mongo/user.model.js";

class userService extends UserModel {
    constructor() {
        super();
    }

    addUser = async (user) => {
        try {
            const newUser = await UserModel.create(user);
            return newUser;
        } catch (error) {
            console.log("Error al agregar usuario: ");
            return error;
        }
    }

    getUsers = async () => {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            console.log("Error al obtener usuarios: ");
            return error;
        }
    }

    getUserById = async (id) => {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            console.log("Error al obtener usuario por id: ");
            return error;
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        } catch (error) {
            console.log("Error al obtener usuario por email: ");
        }
    }

    updateUser = async (id, user) => {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, user);
            return updatedUser;
        } catch (error) {
            console.log("Error al actualizar usuario: ");
            return error;
        }
    }

    deleteUser = async (id) => {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            console.log("Error al eliminar usuario: ");
            return error;
        }
    }

    validateUser = async (email, password) => {
        try {
            const user = await UserModel.findOne({ email: email, password: password });
            return user;
        }
        catch (error) {
            console.log("Error al validar usuario: ");
            return error;
        }
    }

    findUser = async (email) => {
        try {
            const user = await UserModel.findOne({ email }, { email: 1, password: 1, role: 1, name: 1, surname: 1 });
            if (!user) {
                return "User not found";
            }
            return user;
        } catch (error) {
            console.error("Error finding user: ", error);
            return error;
        }
    }

    findEmail = async (param) => {
        try {
            const user = await UserModel.findOne(param);
            return user
        } catch (error) {
            console.error("Error finding email: ", error);
            return error;
        }
    }

}

export default userService;